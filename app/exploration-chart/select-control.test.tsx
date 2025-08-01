import { render, screen, fireEvent } from "@testing-library/react";
import SelectControl from "./select-control";
import { vi } from "vitest";

describe("SelectControl", () => {
  it("renders the label and options", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    render(
      <SelectControl
        label="Test Label"
        value=""
        options={options}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onChange with the correct value when an option is selected", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const handleChange = vi.fn();
    render(
      <SelectControl
        label="Test Label"
        value=""
        options={options}
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText("Test Label"), {
      target: { value: "Option 2" },
    });

    expect(handleChange).toHaveBeenCalledWith("Option 2");
  });
});
