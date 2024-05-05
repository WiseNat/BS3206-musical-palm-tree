/**
 * @author Nathan Wise
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Form from "@/app/components/Form";
import SelectProgrammingLanguage from "@/app/components/SelectProgrammingLanguage";
import SelectTimezone from "@/app/components/SelectTimezone";
import SelectCommunicationLanguage from "@/app/components/SelectCommunicationLanguage";
import SelectTechnology from "@/app/components/SelectTechnology";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Create() {
  const router = useRouter();
  const [project, setProject] = useState({
    title: "",
    description: "",
    mainCommunicationLanguage: "",
    mainTimezone: "",
    mainProgrammingLanguage: "",
    mainTechnology: "",
  });

  const createProject = async () => {
    try {
      const res = await axios.post("/api/projects/create", project);
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
          <TextField label="Project Description" onChange={(e) => setProject({ ...project, description: e.target.value })} minRows={3} multiline/>
          <SelectCommunicationLanguage label="Main Communication Language" onChange={(e) => setProject({ ...project, mainCommunicationLanguage: e.target.value })} required />
          <SelectTimezone label="Main Timezone" onChange={(e) => setProject({ ...project, mainTimezone: e.target.value })} />
          <SelectProgrammingLanguage label="Main Programming Language" onChange={(e) => setProject({ ...project, mainCommunicationLanguage: e.target.value })} />
          <SelectTechnology label="Main Technology" onChange={(e) => setProject({ ...project, mainTechnology: e.target.value })} />
          {/* TODO: SelectCommunicationChannel */}
          {/* TODO: TextField[Project URL] */}
          <Button variant="contained" type="Submit">Submit</Button>
        </Form>
      </main>
    </div>
  );
}
