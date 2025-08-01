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
    const groupKey = record[groupColumnIndex] as string;
    const xValue = record[axisXIndex] as string;
    const yValue = parseFloat(record[axisYIndex] as string);

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
