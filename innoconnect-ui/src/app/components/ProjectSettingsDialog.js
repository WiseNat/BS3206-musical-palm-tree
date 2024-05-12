/**
 * @author Nathan Wise
 */
"use client";
import { DialogContent, Dialog, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";
import Form from "./Form";
import Select from "./FormSelect"
import { communicationLanguages, programmingLanguages, technologies, timezones } from "../lib/selection";

function ProjectSettingsDialog({ submitCallback, children, project }) {
    const [newProject, setProject] = useState({
      _id: project._id,
      title: project.title,
      description: project.description,
      mainCommunicationLanguage: project.mainCommunicationLanguage,
      mainTimezone: project.mainTimezone,
      mainProgrammingLanguage: project.mainProgrammingLanguage,
      mainTechnology: project.mainTechnology,
      projectUrl: project.projectUrl,
    });

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const updateProject = async () => {
        submitCallback(newProject)
        handleClose();
    };
    
    return (
      <>
        {children(handleOpen)}
        {open && (
          <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle>Update Project</DialogTitle>
            <DialogContent className="px-4" dividers>
              <Form submitAction={updateProject}>
                <TextField value={newProject.title} label="Project Title" onChange={(e) => setProject({ ...newProject, title: e.target.value })} required />
                <TextField value={newProject.description} label="Project Description" onChange={(e) => setProject({ ...newProject, description: e.target.value })} minRows={3} multiline required/>
                <Select defaultValue={newProject.mainCommunicationLanguage} label="Main Communication Language" items={communicationLanguages} onChange={(e) => setProject({ ...newProject, mainCommunicationLanguage: e })} required />
                <Select defaultValue={newProject.mainTimezone} label="Main Timezone" items={timezones} onChange={(e) => setProject({ ...newProject, mainTimezone: e })} required />
                <Select defaultValue={newProject.mainProgrammingLanguage} label="Main Programming Language" items={programmingLanguages} onChange={(e) => setProject({ ...newProject, mainProgrammingLanguage: e })} required />
                <Select defaultValue={newProject.mainTechnology} label="Main Technology" items={technologies} onChange={(e) => setProject({ ...newProject, mainTechnology: e })} required />
                <TextField value={newProject.projectUrl} label="Project URL" onChange={(e) => setProject({ ...newProject, projectUrl: e.target.value })} required />
                <Button variant="contained" type="submit">Save</Button>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </>
    )
}

export { ProjectSettingsDialog };
