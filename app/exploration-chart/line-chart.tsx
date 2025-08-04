import { ResponsiveLine } from "@nivo/line";

type LineChartProps = {
  data: { id: string; data: { x: string; y: number }[] }[];
};

type CustomTooltipProps = {
  point: {
    serieId: string | number;
    data: {
      xFormatted: string;
      yFormatted: string;
    };
  };
};

const CustomTooltip = ({ point }: CustomTooltipProps) => {
  return (
    <div
      style={{
        background: "white",
        padding: "9px 12px",
        border: "1px solid #ccc",
      }}
    >
      <div>
        <strong>Series: {point.serieId}</strong>
      </div>
      <div>
        {point.data.xFormatted}: {point.data.yFormatted}
      </div>
    </div>
  );
};

export default function LineChart({ data }: LineChartProps) {
  return (
    <div className="h-screen w-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "X-Axis",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Y-Axis",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={CustomTooltip}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
