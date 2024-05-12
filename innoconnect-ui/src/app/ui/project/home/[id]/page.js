/**
 * @author Nathan Wise
 */
"use client";
import Navbar from "@/app/components/Navbar";
import CentredCardContent from "@/app/components/CentredCardContent";
import IconText from "@/app/components/IconText";
import { getRoleIcon } from "@/app/lib/role";
import { Card, Divider, Tooltip, Typography, capitalize } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LinkIcon from '@mui/icons-material/Link';
import LanguageIcon from '@mui/icons-material/Language';
import { AccessTime } from "@mui/icons-material";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { InventorMatchingAddDialog } from "@/app/components/InventorMatchingAddDialog";
import { AddInventorDialog } from "@/app/components/AddInventorDialog";

export default function Page({ params }) {

  const { data: session } = useSession();

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
    isOwner: false,
  });

  const addInventorDialogCallback = async(email) => {
    addInventorToProject(email);
  }

  const inventorMatchingAddDialogCallback = async(inventor) => {
    addInventorToProject(inventor.email);
  }

  const addInventorToProject = async (email) => {
    const findUserRes = await axios.post("/api/users/find", { email: email })
    const addInventorRes = await axios.post("/api/projects/addInventor", { _id: project._id, email: findUserRes.data.user.email, role: findUserRes.data.user.role })

    setProject({
      ...project,
      inventors: [
        ...project.inventors,
        {
          name: findUserRes.data.user.firstname + " " + findUserRes.data.user.lastname,
          role: addInventorRes.data.inventor.role,
          email: email,
          joinDate: addInventorRes.data.inventor.joinDate, 
        }
      ]
    });
  };

  const removeInventor = async (event) => {
    const email = event.currentTarget.id;
    await axios.post("/api/projects/removeInventor", { _id: project._id, email: email })
    project.inventors.splice(project.inventors.findIndex(item => item.email == email), 1)

    setProject({
      ...project,
      inventors: project.inventors,
    })
  }

  useEffect(() => {
    async function getProject() {
      const projectRes = await axios.post("/api/projects/find", { _id: params.id});

      var newProject = {
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

        if (newProject.inventors[i].role.toLowerCase() == "founder" && newProject.inventors[i].email == session.user.email) {          
          newProject = {
            ...newProject,
            isOwner: true,
          }
        }
      }

      setProject(newProject)
    }

    getProject();
  }, []);

  function isOwner() {
    return project.isOwner;
  }

  return (
    <div>
      <Navbar />
      <main>
        <Typography variant="h4" className="mb-4 px-9 py-12">{project.title}</Typography>
        <div className="flex pb-9">
          <div className="flex-none w-[28%] px-9 text-wrap break-pretty">
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
              <DataObjectIcon />
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
            {isOwner() ? (
              <IconText text="You own this project">
                <StarIcon />
              </IconText>
            ) : null}
          </div>
          <div className="flex-1 px-9">
            <div className="flex flex-col space-y-4">
              <div className="flex">
                <Typography variant="h5" className="flex-none">Inventors</Typography>
                <div className="flex-1" />
                {isOwner() ? (
                  <>
                    <InventorMatchingAddDialog addInventorCallback={inventorMatchingAddDialogCallback} project={project}>
                      {(handleOpen) => (
                        <IconButton color="inherit" onClick={handleOpen}>
                          <AutoFixHighIcon />
                        </IconButton>
                      )}                      
                    </InventorMatchingAddDialog>            
                    <AddInventorDialog addInventorCallback={addInventorDialogCallback}>
                      {(handleOpen) => (
                        <IconButton color="inherit" onClick={handleOpen}>
                          <AddIcon />
                        </IconButton>
                      )}                      
                    </AddInventorDialog>  
                  </>
                ) : null}
              </div>
              {project.inventors.map((inventor) => (
                <Card key={inventor.email} variant="outlined">
                  <CentredCardContent className="px-6">
                    <div className="flex items-center py-3">
                      <IconText text={inventor.name} className="flex-none">
                        <Tooltip title={capitalize(inventor.role)}>
                          {getRoleIcon(inventor.role)}
                        </Tooltip>
                      </IconText>
                      <div className="flex-1" />
                      <Typography>
                        Joined {(new Date(inventor.joinDate)).toLocaleDateString()}
                      </Typography>
                      {isOwner() && inventor.role.toLowerCase() != "founder" ? (
                          <div className="pl-6">
                            <IconButton id={inventor.email} onClick={removeInventor} className="flex-none">
                              <DeleteIcon color="error" />
                            </IconButton>
                          </div>
                      ) : null}
                    </div>
                  </CentredCardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
