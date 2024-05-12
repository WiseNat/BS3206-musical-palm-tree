"use client";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { FormControl } from "@mui/material";

const FormSelect = ({ label, required, onChange, items, defaultValue }) => {
  const [item, setItem] = useState(defaultValue ? defaultValue : "");
  const handleChange = (event) => {
    setItem(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel required={required}>{label}</InputLabel>
        <Select
          value={item}
          label={label}
          onChange={handleChange}
          required={required}
        >
          {items.map(function (item, i) {
            return (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormSelect;
