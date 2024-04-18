"use client";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// TODO: Make this Dynamic - pull from DB
// TODO: Add more programming language options
const programmingLanguages = [
  "Python",
  "Java",
  "JavaScript",
  "C",
  "C++",
  "C#",
  "Ruby",
  "Rust",
  "PHP",
  "Bash",
  "Kotlin",
  "Groovy",
  "Go",
  "Haskell",
  "Basic"
]

// TODO: Add logo for each language?
// TODO: Change this to the tag based approach: https://mui.com/material-ui/react-autocomplete/#multiple-values
const SelectProgrammingLanguage = ({ label, required }) => {
  return (
    <Autocomplete
      options={programmingLanguages}
      renderInput={(params) => (
        <TextField {...params} label={label} required={required} />
      )}
    />
  );
};

export default SelectProgrammingLanguage;
