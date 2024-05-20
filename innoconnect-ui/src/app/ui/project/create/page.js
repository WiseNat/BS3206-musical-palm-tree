/**
 * @author Nathan Wise
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Form from "@/app/components/Form";
import TextField from "@mui/material/TextField";
import Select from "@/app/components/FormSelect";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import {
  communicationLanguages,
  programmingLanguages,
  technologies,
  timezones,
} from "@/app/lib/selection";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Create() {
  const { data: session } = useSession();
  const router = useRouter();

  const [project, setProject] = useState({
    title: "",
    description: "",
    mainCommunicationLanguage: "",
    mainTimezone: "",
    mainProgrammingLanguage: "",
    mainTechnology: "",
    projectUrl: "",
    inventors: [
      {
        email: session?.user.email,
        role: "Founder",
        joinDate: Date.now(),
      },
    ],
  });

  const createProject = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("/api/projects/create", project);
      router.push(`/ui/project/home/${res.data.project._id}`);
    } catch (e) {
      console.log("Project creation failed!", e.message);
    }
  };

  return (
    <div>
      <Form
        title="Create a Project"
        submitAction={createProject}
      >
        <TextField
          label="Project Title"
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          required
        />
        <TextField
          label="Project Description"
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          minRows={3}
          multiline
          required
        />
        <Select
          label="Main Communication Language"
          items={communicationLanguages}
          onChange={(e) =>
            setProject({ ...project, mainCommunicationLanguage: e })
          }
          required
        />
        <Select
          label="Main Timezone"
          items={timezones}
          onChange={(e) => setProject({ ...project, mainTimezone: e })}
          required
        />
        <Select
          label="Main Programming Language"
          items={programmingLanguages}
          onChange={(e) =>
            setProject({ ...project, mainProgrammingLanguage: e })
          }
          required
        />
        <Select
          label="Main Technology"
          items={technologies}
          onChange={(e) => setProject({ ...project, mainTechnology: e })}
          required
        />
        <TextField
          label="Project URL"
          onChange={(e) =>
            setProject({ ...project, projectUrl: e.target.value })
          }
          required
        />
        <Button variant="contained" type="Submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
