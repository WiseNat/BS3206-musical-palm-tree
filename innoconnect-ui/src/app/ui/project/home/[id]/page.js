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
    inventors: [],
  });

  useEffect(() => {
    async function getProject() {
      const projectRes = await axios.post("/api/projects/find", { _id: params.id});
            
      const newProject = {
        ...project,
        _id: projectRes.data.project._id,
        title: projectRes.data.project.title,
        description: projectRes.data.project.description,
        mainCommunicationLanguage: projectRes.data.project.mainCommunicationLanguage,
        mainTimezone: projectRes.data.project.mainTimezone,
        mainProgrammingLanguage: projectRes.data.project.mainProgrammingLanguage,
        mainTechnology: projectRes.data.project.mainTechnology,
        projectUrl: projectRes.data.project.projectUrl,
        inventors: projectRes.data.project.inventors
      };

      for (let i = 0; i < newProject.inventors.length; i++) {
        const inventorRes = await axios.post("/api/users/find", { email: newProject.inventors[i].email});
        newProject.inventors[i] = {
          ...newProject.inventors[i],
          name: inventorRes.data.user.firstname + " " + inventorRes.data.user.lastname,
        }
      }

      setProject(newProject)
    }

    getProject();
  }, []);

  // TODO: Remove (once page is pretty)
  const projectMeta = `Title = ${project.title}\nProject ID is '${project._id}'`
  const projectInfo = `Description = '${project.description}'\nCommunication Language = ${project.mainCommunicationLanguage}\nProgramming Language = ${project.mainProgrammingLanguage}\nTechnology = ${project.mainTechnology}\nTimezone = ${project.mainTimezone}\nProject URL = ${project.projectUrl}`

  // TODO: Make this pretty like in Wireframe
  console.log(project)

  return (
    <div>
      <Navbar />
      <main>
        <div className="whitespace-pre-line">
          <b>{projectMeta}</b>
        </div>
        <br />
        <div className="whitespace-pre-line"> 
          {projectInfo}
        </div>
        <br />
        <div className="whitespace-pre-line">
          {project.inventors.map((inventor) => (
            <div key={inventor.name}>Name: {inventor.name}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
