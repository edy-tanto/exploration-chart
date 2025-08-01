import { useReducer, useState } from "react";
import SelectControl from "./select-control";
import { groupData } from "./utils";
import TableView from "./table-view";

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

export default function DynamicChart({ records }: { records: any[] }) {
  const headers: string[] = records[HEADERS_INDEX];
  const [showTable, setShowTable] = useState(false);

  const [chartControlState, chartControlDispatch] = useReducer(
    chartControlReducer,
    {
      axisX: headers[0],
      axisY: headers[0],
      groupColumn: headers[0],
    }
  );

  const groupedData = groupData(
    records,
    headers,
    chartControlState.axisX,
    chartControlState.axisY,
    chartControlState.groupColumn
  );

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

        <button
          onClick={() => setShowTable(!showTable)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        >
          {showTable ? "Hide" : "Show"} Table
        </button>

        {showTable && <TableView data={groupedData} />}
      </div>
    </>
  );
}
