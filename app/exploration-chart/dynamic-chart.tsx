import Papa from "papaparse";
import { useReducer } from "react";

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

  const [chartControlState, chartControlDispatch] = useReducer(
    chartControlReducer,
    {
      axisX: "",
      axisY: "",
      groupColumn: "",
    }
  );

  return (
    <>
      <h1>Total Records: {records.length}</h1>

      <div>
        <h2>Dynamic chart control:</h2>
        <section>
          <h3>Input Selection</h3>
          <div>
            <label>
              Pick Axis X
              <select
                onChange={(e) =>
                  chartControlDispatch({
                    type: CHART_CONTROL_ACTION_TYPE.SET_AXIS_X,
                    payload: {
                      axisX: e.currentTarget.value,
                    },
                  })
                }
              >
                {headers.map((header, index) => (
                  <option value={header} key={`${index}-${header}`}>
                    {header}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Pick Axis Y
              <select
                onChange={(e) =>
                  chartControlDispatch({
                    type: CHART_CONTROL_ACTION_TYPE.SET_AXIS_Y,
                    payload: {
                      axisY: e.currentTarget.value,
                    },
                  })
                }
              >
                {headers.map((header, index) => (
                  <option value={header} key={`${index}-${header}`}>
                    {header}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Grup Kolom
              <select
                onChange={(e) =>
                  chartControlDispatch({
                    type: CHART_CONTROL_ACTION_TYPE.SET_GROUP_COLUMN,
                    payload: {
                      groupColumn: e.currentTarget.value,
                    },
                  })
                }
              >
                {headers.map((header, index) => (
                  <option value={header} key={`${index}-${header}`}>
                    {header}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <div>Axis X - {chartControlState.axisX}</div>
        <div>Axis Y - {chartControlState.axisY}</div>
        <div>Group Column - {chartControlState.groupColumn}</div>
      </div>
    </>
  );
}
