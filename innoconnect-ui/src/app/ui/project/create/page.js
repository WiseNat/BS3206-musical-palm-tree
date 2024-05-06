/**
 * @author Nathan Wise
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Form from "@/app/components/Form";
import TextField from '@mui/material/TextField';
import Select from "@/app/components/FormSelect";
import Button from '@mui/material/Button';
import axios from "axios";
import { useState } from "react";
import { communicationLanguages, programmingLanguages, technologies, timezones } from "@/app/lib/selection";


export default function Create() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    mainCommunicationLanguage: "",
    mainTimezone: "",
    mainProgrammingLanguage: "",
    mainTechnology: "",
    projectUrl: "",
  });

  const createProject = async () => {
    try {
      await axios.post("/api/projects/create", project);
      // TODO: Route to created project page, use rest from axios.post to get _id of project...
    } catch (e) {
      console.log("Project creation failed!", e.message);
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <Form title="Create a Project" submitAction={createProject} className="mx-16 my-4">
          <TextField label="Project Title" onChange={(e) => setProject({ ...project, title: e.target.value })} required />
          <TextField label="Project Description" onChange={(e) => setProject({ ...project, description: e.target.value })} minRows={3} multiline required/>
          <Select label="Main Communication Language" items={communicationLanguages} onChange={(e) => setProject({ ...project, mainCommunicationLanguage: e })} required />
          <Select label="Main Timezone" items={timezones} onChange={(e) => setProject({ ...project, mainTimezone: e })} required />
          <Select label="Main Programming Language" items={programmingLanguages} onChange={(e) => setProject({ ...project, mainProgrammingLanguage: e })} required />
          <Select label="Main Technology" items={technologies} onChange={(e) => setProject({ ...project, mainTechnology: e })} required />
          <TextField label="Project URL" onChange={(e) => setProject({ ...project, projectUrl: e.target.value })} required />
          <Button variant="contained" type="Submit">Submit</Button>
        </Form>
      </main>
    </div>
  );
}
