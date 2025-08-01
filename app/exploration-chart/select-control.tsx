import React from "react";

type SelectControlProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export default function SelectControl({
  label,
  value,
  options,
  onChange,
}: SelectControlProps) {
  return (
    <div>
      <label>
        {label}
        <select value={value} onChange={(e) => onChange(e.currentTarget.value)}>
          {options.map((header, index) => (
            <option value={header} key={`${index}-${header}`}>
              {header}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
