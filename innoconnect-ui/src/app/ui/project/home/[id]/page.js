/**
 * @author Nathan Wise
 */
"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {

  const [project, setProject] = useState({
    _id: "",
    title: "",
    description: "",
    mainCommunicationLanguage: "",
    mainTimezone: "",
    mainProgrammingLanguage: "",
    mainTechnology: "",
    projectUrl: "",
  });

  useEffect(() => {
    async function getProject() {
      const res = await axios.post("/api/projects/find", { _id: params.id});
      setProject({
        ...project,
        _id: res.data.project._id,
        title: res.data.project.title,
        description: res.data.project.description,
        mainCommunicationLanguage: res.data.project.mainCommunicationLanguage,
        mainTimezone: res.data.project.mainTimezone,
        mainProgrammingLanguage: res.data.project.mainProgrammingLanguage,
        mainTechnology: res.data.project.mainTechnology,
        projectUrl: res.data.project.projectUrl,
      });
    }
    getProject();
  }, []);

  // TODO: Remove (once page is pretty)
  const projectMeta = `Title = ${project.title}\nProject ID is '${project._id}'`
  const projectInfo = `Description = '${project.description}'\nCommunication Language = ${project.mainCommunicationLanguage}\nProgramming Language = ${project.mainProgrammingLanguage}\nTechnology = ${project.mainTechnology}\nTimezone = ${project.mainTimezone}\nProject URL = ${project.projectUrl}`

  // TODO: Make this pretty like in Wireframe
  return (
    <div>
      <Navbar />
      <main>
        <div class="whitespace-pre-line">
          <b>{projectMeta}</b>
        </div>
        <br />
        <div class="whitespace-pre-line"> 
          {projectInfo}
        </div>
      </main>
    </div>
  );
}
