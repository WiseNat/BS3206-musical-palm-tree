"use client";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// TODO: Make this Dynamic - pull from DB
// TODO: Add more technology options (use this: https://survey.stackoverflow.co/2023/#technology-most-popular-technologies)
const technologies = [
  "SvelteKit",
  "NodeJS",
  "Tkinter",
  "Springboot",
  "Express",
  "React",
  "Vue",
  "NextJS",
  "Maven",
  "Django",
  "Anaconda",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Azure",
  "Google Cloud",
  ".NET",
  "Pandas",
  "Tensorflow",
  "Electron",
  "Flutter",
  "Docker",
  "npm",
  "Kubernetes",
  "Bun"
]

// TODO: Add logo for each technology?
// TODO: Change this to the tag based approach: https://mui.com/material-ui/react-autocomplete/#multiple-values
const SelectTechnology = ({ label }) => {
  return (
    <Autocomplete
      options={technologies}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    />
  );
};

export default SelectTechnology;
