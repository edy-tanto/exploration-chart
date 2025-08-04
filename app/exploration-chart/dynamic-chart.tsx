import { useReducer } from "react";
import SelectControl from "./select-control";
import { groupData, pivotData, transformDataForNivo } from "./utils";
import TableView from "./table-view";
import LineChart from "./line-chart";
import BarChart from "./bar-chart";

const HEADERS_INDEX = 0;

type ChartControlState = {
  axisX: string;
  axisY: string;
  groupColumn: string;
};

enum CHART_CONTROL_ACTION_TYPE {
  SET_AXIS_X,
  SET_AXIS_Y,
  SET_GROUP_COLUMN,
}

interface SetAxisX {
  type: CHART_CONTROL_ACTION_TYPE.SET_AXIS_X;
  payload: {
    axisX: string;
  };
}

interface SetAxisY {
  type: CHART_CONTROL_ACTION_TYPE.SET_AXIS_Y;
  payload: {
    axisY: string;
  };
}

interface SetGroupColumn {
  type: CHART_CONTROL_ACTION_TYPE.SET_GROUP_COLUMN;
  payload: {
    groupColumn: string;
  };
}

type Action = SetAxisX | SetAxisY | SetGroupColumn;

function chartControlReducer(state: ChartControlState, action: Action) {
  switch (action.type) {
    case CHART_CONTROL_ACTION_TYPE.SET_AXIS_X: {
      return {
        ...state,
        axisX: action.payload.axisX,
      };
    }

    case CHART_CONTROL_ACTION_TYPE.SET_AXIS_Y: {
      return {
        ...state,
        axisY: action.payload.axisY,
      };
    }

    case CHART_CONTROL_ACTION_TYPE.SET_GROUP_COLUMN: {
      return {
        ...state,
        groupColumn: action.payload.groupColumn,
      };
    }
  }
}

function transformDataForBarChart(nivoData: any) {
  const allKeys = new Set();
  nivoData.forEach((item: any) => {
    item.data.forEach((d: any) => {
      allKeys.add(item.id);
    });
  });

  const data = nivoData.reduce((acc: any, item: any) => {
    item.data.forEach((d: any) => {
      const existing = acc.find((a: any) => a.x === d.x);
      if (existing) {
        existing[item.id] = d.y;
      } else {
        acc.push({ x: d.x, [item.id]: d.y });
      }
    });
    return acc;
  }, []);

  return {
    data,
    keys: Array.from(allKeys),
  };
}

export default function DynamicChart({ records }: { records: any[] }) {
  const headers: string[] = records[HEADERS_INDEX];

  const [chartControlState, chartControlDispatch] = useReducer(
    chartControlReducer,
    {
      axisX: "tahun",
      axisY: "jumlah_lab",
      groupColumn: "kondisi_lab",
    }
  );

  let groupedData = groupData(
    records,
    headers,
    chartControlState.axisX,
    chartControlState.axisY,
    chartControlState.groupColumn
  );

  if (chartControlState.axisX === "kondisi_lab") {
    groupedData = pivotData(groupedData);
  }

  const nivoData = transformDataForNivo(groupedData);
  const barChartData = transformDataForBarChart(nivoData);

  return (
    <>
      <h1>Total Records: {records.length}</h1>

      <div>
        <h2>Dynamic chart control:</h2>
        <section>
          <h3>Input Selection</h3>
          <SelectControl
            label="Pick Axis X"
            options={headers}
            value={chartControlState.axisX}
            onChange={(axisX) =>
              chartControlDispatch({
                type: CHART_CONTROL_ACTION_TYPE.SET_AXIS_X,
                payload: { axisX },
              })
            }
          />
          <SelectControl
            label="Pick Axis Y"
            options={headers}
            value={chartControlState.axisY}
            onChange={(axisY) =>
              chartControlDispatch({
                type: CHART_CONTROL_ACTION_TYPE.SET_AXIS_Y,
                payload: { axisY },
              })
            }
          />
          <SelectControl
            label="Grup Kolom"
            options={headers}
            value={chartControlState.groupColumn}
            onChange={(groupColumn) =>
              chartControlDispatch({
                type: CHART_CONTROL_ACTION_TYPE.SET_GROUP_COLUMN,
                payload: { groupColumn },
              })
            }
          />
        </section>

        <div>Axis X - {chartControlState.axisX}</div>
        <div>Axis Y - {chartControlState.axisY}</div>
        <div>Group Column - {chartControlState.groupColumn}</div>

        <LineChart data={nivoData} />
        <BarChart
          data={barChartData.data}
          keys={barChartData.keys}
          indexBy="x"
          axisBottomLegend={chartControlState.axisX}
          axisLeftLegend={chartControlState.axisY}
        />
        <TableView data={groupedData} />
      </div>
    </>
  );
}
