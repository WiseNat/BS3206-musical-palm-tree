/**
 * @author Tom Shortridge
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Typography from "@mui/material/Typography";
import Form from "@/app/components/Form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useState } from "react";
import ProjectView from "@/app/components/ProjectView";
import axios from "axios";
import Modal from "@/app/components/ModalTemplate";
import Select from "@/app/components/FormSelect";
import {
  filters,
  timezones,
  communicationLanguages,
  programmingLanguages,
  technologies,
} from "@/app/lib/selection";

export default function ProjectSearch() {
  const [searchQuery, setSearchQuery] = useState({
    query: "",
  });

  const [projects, setProjects] = useState([]);

  const [filter, setFilter] = useState({
    filterFields: "",
    filterName: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const search = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/projects/search", searchQuery);
      setProjects(res.data.projects);
    } catch (e) {
      console.log("Project Search failed! ", e);
    }
  };

  const setFilterSearch = (value) => {
    setSearchQuery({ query: value });
  };

  const ShowProjectNotFound = ({ project }) => {
    if (project.length == 0) return <Typography>No Projects Found</Typography>;
  };

  const handleFilterType = (filterType) => {
    let filterSelection;
    switch (filterType) {
      case "Communication Languages":
        filterSelection = communicationLanguages;
        break;
      case "Timezones":
        filterSelection = timezones;
      case "Programming Languages":
        filterSelection = programmingLanguages;
      case "Technologies":
        filterSelection = technologies;
    }
    setFilter({ filterFields: filterSelection, filterName: filterType });
  };

  const ShowFilter = () => {
    if (filter.filterFields != "")
      return (
        <Select
          label={filter.filterName}
          items={filter.filterFields}
          onChange={setFilterSearch}
        />
      );
  };

  return (
    <main>
      <Navbar />
      <Typography variant="h4" className="mb-4"></Typography>
      <div>
        <Form
          title="Project Search"
          submitAction={search}
          className="mx-16 my-4"
        >
          <Box display={"flex"}>
            <TextField
              id="query"
              label="Search"
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, query: e.target.value })
              }
            />
            <Button variant="contained" onClick={handleOpen}>
              Filter
            </Button>
          </Box>
          <Button variant="contained" type="Submit">
            Search
          </Button>
        </Form>
        <div className="flex justify-center items-center pt-10">
          {projects.map(function (project, i) {
            return <ProjectView project={project} key={i} />;
          })}
          <ShowProjectNotFound project={projects} />
        </div>
        <Modal open={open} onClose={handleClose}>
          <Form title="Search Filters" submitAction={search}>
            <Select
              label="Filter Type"
              items={filters}
              onChange={handleFilterType}
            ></Select>
            <ShowFilter />
            <Button variant="contained" type="submit">
              Search Filter
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal>
      </div>
    </main>
  );
}
