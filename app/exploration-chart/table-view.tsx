type GroupedData = {
  [groupKey: string]: {
    [xValue: string]: number;
  };
};

type TableViewProps = {
  data: GroupedData;
};

export default function TableView({ data }: TableViewProps) {
  if (Object.keys(data).length === 0) {
    return <p>No data to display.</p>;
  }

  const xValues = Array.from(
    new Set(Object.values(data).flatMap((group) => Object.keys(group)))
  );

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Group</th>
          {xValues.map((xValue) => (
            <th key={xValue} className="px-4 py-2">
              {xValue}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([groupKey, groupData]) => (
          <tr key={groupKey}>
            <td className="border px-4 py-2">{groupKey}</td>
            {xValues.map((xValue) => (
              <td key={xValue} className="border px-4 py-2">
                {groupData[xValue] || 0}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
