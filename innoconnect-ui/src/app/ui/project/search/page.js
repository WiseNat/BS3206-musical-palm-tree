/**
 * @author Tom Shortridge
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Typography from "@mui/material/Typography";
import Form from "@/app/components/Form";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";
import ProjectView from "@/app/components/ProjectView";
import axios from "axios";

export default function ProjectSearch() {
  const [searchQuery, setSearchQuery] = useState({
    query: "",
  });

  const [projects, setProjects] = useState([]);
  const search = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/projects/search", searchQuery);
      setProjects(res.data.projects);
    } catch (e) {
      console.log("Project Search failed! ", e);
    }
  };

  const ShowProjectNotFound = ({ project }) => {
    if (project.length == 0) return <Typography>No Projects Found</Typography>;
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
          <TextField
            id="query"
            label="Search"
            onChange={(e) =>
              setSearchQuery({ ...searchQuery, query: e.target.value })
            }
          />
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
      </div>
    </main>
  );
}
