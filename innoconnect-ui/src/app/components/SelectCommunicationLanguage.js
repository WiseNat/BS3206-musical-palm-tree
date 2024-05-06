"use client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// TODO: Make this Dynamic - pull from DB
// TODO: Add more communication language options
const communicationLanguages = [
  "English",
  "Spanish",
  "German",
  "French",
  "Russian",
];

// TODO: Add logo for each language?
// TODO: Change this to the tag based approach: https://mui.com/material-ui/react-autocomplete/#multiple-values
const SelectCommunicationLanguage = ({ label, required }) => {
  return (
    <Autocomplete
      options={communicationLanguages}
      renderInput={(params) => (
        <TextField {...params} label={label} required={required} />
      )}
    />
  );
};

export default SelectCommunicationLanguage;
