import { ResponsiveBarCanvas } from "@nivo/bar";

type BarChartProps = {
  data: { [key: string]: any }[];
  keys: string[];
  indexBy: string;
  axisBottomLegend: string;
  axisLeftLegend: string;
};

export default function BarChart({
  data,
  keys,
  indexBy,
  axisBottomLegend,
  axisLeftLegend,
}: BarChartProps) {
  return (
    <div className="h-screen w-full">
      <ResponsiveBarCanvas
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        pixelRatio={2}
        padding={0.15}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        groupMode="grouped"
        layout="vertical"
        reverse={false}
        colors={{ scheme: "spectral" }}
        colorBy="id"
        borderWidth={0}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisBottomLegend,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: axisLeftLegend,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableGridX={false}
        enableGridY={true}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        isInteractive={true}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
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
