/**
 * @author Nathan Wise
 */
"use client";
import Navbar from "@/app/components/Navbar";
import { Card, CardContent, Divider, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import LanguageIcon from '@mui/icons-material/Language';
import IconText from "@/app/components/IconText";
import { AccessTime } from "@mui/icons-material";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

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

  const CentredCardContent = styled(CardContent)(`
  padding: 16px;
  &:last-child {
    padding-bottom: 16px;
  }`);

  return (
    <div>
      <Navbar />
      <main>
        <Typography variant="h4" className="mb-4 px-9 py-12">{project.title}</Typography>
        <div className="flex">
          <div className="flex-none w-128 px-9">
            <div>
              {project.description}
            </div>
            <div className="py-6">
              <Divider orientation="horizontal"></Divider>
            </div>
            <IconText text={project.projectUrl} isTextUrl>
              <LinkIcon />
            </IconText>
            <IconText text={project.mainProgrammingLanguage}>
              <CodeIcon />
            </IconText>
            <IconText text={project.mainTechnology}>
              <PrecisionManufacturingIcon />
            </IconText>
            <IconText text={project.mainCommunicationLanguage}>
              <LanguageIcon />
            </IconText>
            <IconText text={project.mainTimezone}>
              <AccessTime />
            </IconText>
          </div>
          <div className="flex-1 px-9">
            {project.inventors.map((inventor) => (
              <Card key={inventor.name} variant="outlined">
                <CentredCardContent className="px-6">
                  <div className="flex py-3">
                    <IconText text={inventor.name} className="flex-none">
                      <LanguageIcon />
                    </IconText>
                    <div className="flex-1" />
                    <Typography className="flex-none">
                      Joined {(new Date(inventor.joinDate)).toLocaleDateString()}
                    </Typography>
                  </div>
                </CentredCardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
