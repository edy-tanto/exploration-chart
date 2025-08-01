import { render, screen } from "@testing-library/react";
import ExplorationChart from "./index";

describe("ExplorationChart", () => {
  it("renders the chart with mocked data", () => {
    const mockLoaderData = {
      name: "Test Chart",
      csvData: "header1,header2\nvalue1,value2",
    };

    render(
      <ExplorationChart
        {...{
          loaderData: mockLoaderData,
          params: {},
          matches: [] as any,
        }}
      />
    );

    expect(screen.getByText("Test Chart")).toBeInTheDocument();
    expect(screen.getByText("Total Records: 2")).toBeInTheDocument();
  });
});
