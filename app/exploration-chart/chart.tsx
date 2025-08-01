import { ResponsiveLineCanvas } from "@nivo/line";
import datas from "./data2.json";

export default function Chart() {
  return (
    <div className="h-screen w-full">
      <ResponsiveLineCanvas
        data={datas}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{ type: "linear" }}
        yScale={{ type: "linear", stacked: false, min: 0, max: 500 }}
        curve="monotoneX"
        axisRight={{
          tickValues: [0, 500],
          format: ".2s",
        }}
        axisBottom={{
          tickValues: [0, 20, 40, 60, 80, 100, 120],
          format: ".2f",
          legend: "price",
          legendOffset: 36,
        }}
        axisLeft={{
          tickValues: [0, 500],
          format: ".2s",
          legend: "volume",
          legendOffset: -40,
        }}
        enableGridX={false}
        colors={{ scheme: "spectral" }}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "seriesColor" }}
        gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 140,
            itemsSpacing: 2,
            itemWidth: 80,
            itemHeight: 12,
            symbolSize: 12,
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
}
