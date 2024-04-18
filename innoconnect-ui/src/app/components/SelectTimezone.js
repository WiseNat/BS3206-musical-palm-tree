"use client";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// TODO: Make this Dynamic - pull from DB
const timezones = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:30",
  "UTC-09:00",
  "UTC-08:00",
  "UTC-07:00",
  "UTC-06:00",
  "UTC-05:00",
  "UTC-04:00",
  "UTC-03:30",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC±00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+03:30",
  "UTC+04:00",
  "UTC+04:30",
  "UTC+05:00",
  "UTC+05:30",
  "UTC+05:45",
  "UTC+06:00",
  "UTC+06:30",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+08:45",
  "UTC+09:00",
  "UTC+09:30",
  "UTC+10:00",
  "UTC+10:30",
  "UTC+11:00",
  "UTC+12:00",
  "UTC+12:45",
  "UTC+13:00",
  "UTC+14:00",
  ""
]

// TODO: Change this to the tag based approach: https://mui.com/material-ui/react-autocomplete/#multiple-values
const SelectTimezone = ({ label }) => {
  return (
    <Autocomplete
      options={timezones}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    />
  );
};

export default SelectTimezone;
