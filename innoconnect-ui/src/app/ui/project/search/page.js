/**
 * @author Tom Shortridge
 *
 * Project searching page.
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Typography from "@mui/material/Typography";
import Form from "@/app/components/Form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
    filterType: null,
    filter: null,
  });

  const [projects, setProjects] = useState([]);

  const [filter, setFilter] = useState({
    filterFields: "",
    filterName: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Posts the search query to the API.
  const search = async (e) => {
    try {
      // Checks if modal is open & closes it
      if (open) {
        handleClose();
      }

      e.preventDefault();
      const res = await axios.post("/api/projects/search", searchQuery);
      setProjects(res.data.projects);
    } catch (e) {
      console.log("Project Search failed! ", e);
    }
  };

  const setFilterSearch = (value) => {
    setSearchQuery({ ...searchQuery, filter: value });
  };

  // Renders 'No Projects Found' message if no projects are found.
  const ShowProjectNotFound = ({ project }) => {
    if (project.length == 0) return <Typography>No Projects Found</Typography>;
  };

  // Handles the selection of the filter, mapping it to the correct filter array.
  const handleFilterType = (filterType) => {
    let filterValues = {};
    switch (filterType) {
      case "Communication Languages":
        filterValues.filterSelection = communicationLanguages;
        filterValues.filterType = "mainCommunicationLanguage";
        break;
      case "Timezones":
        filterValues.filterSelection = timezones;
        filterValues.filterType = "mainTimezone";
        break;
      case "Programming Languages":
        filterValues.filterSelection = programmingLanguages;
        filterValues.filterType = "mainProgrammingLanguage";
        break;
      case "Technologies":
        filterValues.filterSelection = technologies;
        filterValues.filterType = "mainTechnology";
        break;
    }
    setSearchQuery({
      ...searchQuery,
      filterType: filterValues.filterType,
      filter: null,
    });
    setFilter({
      filterFields: filterValues.filterSelection,
      filterName: filterType,
    });
  };

  return (
    <div>
      <Typography variant="h4" className="mb-4"></Typography>
      <div>
        <Form
          title="Project Search"
          submitAction={search}
        >
          <Box display={"flex"}>
            <TextField
              className="flex-1"
              id="query"
              label="Search"
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, query: e.target.value })
              }
            />
            <IconButton onClick={handleOpen}>
              <Tooltip title={"Open Filter"}>
                <FilterAltIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              type="submit"
              onClick={() =>
                setSearchQuery({
                  ...searchQuery,
                  filter: null,
                  filterType: null,
                })
              }
            >
              <Tooltip title={"Clear Filter"}>
                <FilterAltOffIcon />
              </Tooltip>
            </IconButton>
          </Box>
          <Button variant="contained" type="Submit">
            Search
          </Button>
        </Form>
        <div className="grid grid-cols-4 gap-4 items-center pt-10">
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
            {filter.filterFields != "" ? (
              <Select
                label={filter.filterName}
                items={filter.filterFields}
                onChange={setFilterSearch}
              />
            ) : null}
            <Button variant="contained" type="submit">
              Search Filter
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
