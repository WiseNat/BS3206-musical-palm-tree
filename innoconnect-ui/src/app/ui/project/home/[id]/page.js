/**
 * @author Nathan Wise
 */
"use client";
import { AddInventorDialog } from "@/app/components/AddInventorDialog";
import CentredCardContent from "@/app/components/CentredCardContent";
import IconText from "@/app/components/IconText";
import { InventorMatchingAddDialog } from "@/app/components/InventorMatchingAddDialog";
import Navbar from "@/app/components/Navbar";
import { ProjectSettingsDialog } from "@/app/components/ProjectSettingsDialog";
import { getRoleIcon } from "@/app/lib/role";
import { AccessTime } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DeleteIcon from "@mui/icons-material/Delete";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { Card, Divider, Tooltip, Typography, capitalize } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  const projectSettingsDialogCallback = async (newProject) => {
    const res = await axios.post("/api/projects/update", newProject);

    setProject({
      ...project,
      title: res.data.project.title,
      description: res.data.project.description,
      mainCommunicationLanguage: res.data.project.mainCommunicationLanguage,
      mainTimezone: res.data.project.mainTimezone,
      mainProgrammingLanguage: res.data.project.mainProgrammingLanguage,
      mainTechnology: res.data.project.mainTechnology,
      projectUrl: res.data.project.projectUrl,
    });
  };

  const addInventorDialogCallback = async (email) => {
    addInventorToProject(email);
  };

  const inventorMatchingAddDialogCallback = async (inventor) => {
    addInventorToProject(inventor.email);
  };

  const addInventorToProject = async (email) => {
    const findUserRes = await axios.post("/api/users/protected/find", {
      email: email,
    });
    const addInventorRes = await axios.post("/api/projects/addInventor", {
      _id: project._id,
      email: findUserRes.data.user.email,
      role: findUserRes.data.user.role,
    });

    setProject({
      ...project,
      inventors: [
        ...project.inventors,
        {
          name:
            findUserRes.data.user.firstname +
            " " +
            findUserRes.data.user.lastname,
          role: addInventorRes.data.inventor.role,
          email: email,
          joinDate: addInventorRes.data.inventor.joinDate,
        },
      ],
    });
  };

  const removeInventor = async (event) => {
    const email = event.currentTarget.id;
    await axios.post("/api/projects/removeInventor", {
      _id: project._id,
      email: email,
    });
    project.inventors.splice(
      project.inventors.findIndex((item) => item.email == email),
      1,
    );

    setProject({
      ...project,
      inventors: project.inventors,
    });
  };

  useEffect(() => {
    async function getProject() {
      const projectRes = await axios.post("/api/projects/find", {
        _id: params.id,
      });

      var newProject = {
        ...project,
        _id: projectRes.data.project._id,
        title: projectRes.data.project.title,
        description: projectRes.data.project.description,
        mainCommunicationLanguage:
          projectRes.data.project.mainCommunicationLanguage,
        mainTimezone: projectRes.data.project.mainTimezone,
        mainProgrammingLanguage:
          projectRes.data.project.mainProgrammingLanguage,
        mainTechnology: projectRes.data.project.mainTechnology,
        projectUrl: projectRes.data.project.projectUrl,
        inventors: projectRes.data.project.inventors,
      };

      for (let i = 0; i < newProject.inventors.length; i++) {
        const inventorRes = await axios.post("/api/users/protected/find", {
          email: newProject.inventors[i].email,
        });
        newProject.inventors[i] = {
          ...newProject.inventors[i],
          name:
            inventorRes.data.user.firstname +
            " " +
            inventorRes.data.user.lastname,
        };

        if (
          newProject.inventors[i].role.toLowerCase() == "founder" &&
          newProject.inventors[i].email == session.user.email
        ) {
          newProject = {
            ...newProject,
            isOwner: true,
          };
        }
      }

      setProject(newProject);
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
        <div className="flex mb-4 px-9 py-12">
          <Typography variant="h4">{project.title}</Typography>
          <div className="flex-1" />
          {isOwner() ? (
            <ProjectSettingsDialog
              submitCallback={projectSettingsDialogCallback}
              project={project}
            >
              {(handleOpen) => (
                <IconButton color="inherit" onClick={handleOpen}>
                  <Tooltip title="Project Settings">
                    <SettingsIcon />
                  </Tooltip>
                </IconButton>
              )}
            </ProjectSettingsDialog>
          ) : null}
        </div>
        <div className="flex pb-9">
          <div className="flex-none w-[28%] px-9 text-wrap break-pretty">
            <div>{project.description}</div>
            <div className="py-6">
              <Divider orientation="horizontal"></Divider>
            </div>
            <IconText text={project.projectUrl} isTextUrl>
              <Tooltip title="Project URL">
                <LinkIcon />
              </Tooltip>
            </IconText>
            <IconText text={project.mainProgrammingLanguage}>
              <Tooltip title="Programming Language">
                <DataObjectIcon />
              </Tooltip>
            </IconText>
            <IconText text={project.mainTechnology}>
              <Tooltip title="Technology">
                <PrecisionManufacturingIcon />
              </Tooltip>
            </IconText>
            <IconText text={project.mainCommunicationLanguage}>
              <Tooltip title="Communication Language">
                <LanguageIcon />
              </Tooltip>
            </IconText>
            <IconText text={project.mainTimezone}>
              <Tooltip title="Timezone">
                <AccessTime />
              </Tooltip>
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
                <Typography variant="h5" className="flex-none">
                  Inventors
                </Typography>
                <div className="flex-1" />
                {isOwner() ? (
                  <>
                    <InventorMatchingAddDialog
                      addInventorCallback={inventorMatchingAddDialogCallback}
                      project={project}
                    >
                      {(handleOpen) => (
                        <IconButton color="inherit" onClick={handleOpen}>
                          <Tooltip title="Inventor Matching">
                            <AutoFixHighIcon />
                          </Tooltip>
                        </IconButton>
                      )}
                    </InventorMatchingAddDialog>
                    <AddInventorDialog
                      addInventorCallback={addInventorDialogCallback}
                    >
                      {(handleOpen) => (
                        <IconButton color="inherit" onClick={handleOpen}>
                          <Tooltip title="Add Inventor">
                            <AddIcon />
                          </Tooltip>
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
                        Joined{" "}
                        {new Date(inventor.joinDate).toLocaleDateString()}
                      </Typography>
                      {isOwner() && inventor.role.toLowerCase() != "founder" ? (
                        <div className="pl-6">
                          <IconButton
                            id={inventor.email}
                            onClick={removeInventor}
                            className="flex-none"
                          >
                            <Tooltip title="Remove Inventor">
                              <DeleteIcon color="error" />
                            </Tooltip>
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
