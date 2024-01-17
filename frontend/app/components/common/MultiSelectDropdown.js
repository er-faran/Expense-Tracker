"use client";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelectDropdown({
  options = [],
  onChange = () => {},
  id = "id",
  name = "name",
}) {
  const handleOnChange = (event, selectedOptions) => {
    onChange(selectedOptions);
  };
  return (
    <Autocomplete
      multiple
      id={id}
      name={name}
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} placeholder="Select" />}
      className="m-0 p-0"
      onChange={handleOnChange}
    />
  );
}
