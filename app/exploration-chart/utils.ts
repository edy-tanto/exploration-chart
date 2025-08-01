type Record = (string | number)[];

type GroupedData = {
  [groupKey: string]: {
    [xValue: string]: number;
  };
};

export function groupData(
  records: Record[],
  headers: string[],
  axisX: string,
  axisY: string,
  groupColumn: string
): GroupedData {
  const axisXIndex = headers.indexOf(axisX);
  const axisYIndex = headers.indexOf(axisY);
  const groupColumnIndex = headers.indexOf(groupColumn);

  if (axisXIndex === -1 || axisYIndex === -1 || groupColumnIndex === -1) {
    return {};
  }

  const grouped: GroupedData = {};

  for (let i = 1; i < records.length; i++) {
    const record = records[i];
    if (!record || record.length === 1 && !record[0]) continue;

    const groupKey = record[groupColumnIndex] as string;
    const xValue = record[axisXIndex] as string;
    const yValue = parseFloat(record[axisYIndex] as string);

    if (!groupKey || !xValue) continue;

    if (!grouped[groupKey]) {
      grouped[groupKey] = {};
    }

    if (!grouped[groupKey][xValue]) {
      grouped[groupKey][xValue] = 0;
    }

    if (!isNaN(yValue)) {
      grouped[groupKey][xValue] += yValue;
    }
  }

  return grouped;
}

export function pivotData(data: GroupedData): GroupedData {
  const pivoted: GroupedData = {};
  const allXValues = new Set<string>();

  // First pass: collect all possible xValues to create all columns for all rows
  for (const groupKey in data) {
    for (const xValue in data[groupKey]) {
      allXValues.add(xValue);
    }
  }

  // Second pass: build the pivoted structure
  for (const groupKey in data) {
    for (const xValue in data[groupKey]) {
      const yValue = data[groupKey][xValue];

      if (!pivoted[xValue]) {
        pivoted[xValue] = {};
      }
      pivoted[xValue][groupKey] = yValue;
    }
  }

  // Third pass: ensure all rows have all columns
  for (const newGroupKey in pivoted) {
    for (const xValue of allXValues) {
      if (!(xValue in pivoted[newGroupKey])) {
        // Do nothing, let it be undefined to be handled by table as 0
      }
    }
  }

  return pivoted;
}

export function transformDataForNivo(
  groupedData: GroupedData
): { id: string; data: { x: string; y: number }[] }[] {
  return Object.entries(groupedData).map(([groupKey, groupData]) => ({
    id: groupKey,
    data: Object.entries(groupData).map(([xValue, yValue]) => ({
      x: xValue,
      y: yValue,
    })),
  }));
}