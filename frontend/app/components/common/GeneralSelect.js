"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function GeneralSelect({
  options = [],
  onChange = () => {},
  id = "id",
  name = "name",
  value = null,
  disabled = false,
  placeholder = "Select",
}) {
  const handleOnChange = (event, selectedOption) => {
    onChange(selectedOption);
  };
  React.useEffect(() => {
    // Set initial value when the component mounts
    onChange(value);
  }, [value]);

  return (
    <Autocomplete
      disabled={disabled}
      value={value}
      id={id}
      name={name}
      options={options}
      getOptionLabel={(option) => option.title}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
      className="m-0 p-0"
      onChange={handleOnChange}
    />
  );
}
