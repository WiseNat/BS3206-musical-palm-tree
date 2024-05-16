/**
 * @author Nathan Wise
 */
"use client";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  DialogContent,
} from "@mui/material";
import Select from "@/app/components/FormSelect";
import { roles } from "../lib/selection";
import { useState } from "react";
import { getRoleIcon } from "../lib/role";
import axios from "axios";
import IconText from "./IconText";

function InventorMatchingAddDialog({ addInventorCallback, project, children }) {
  const [recommendedInventors, setRecommendedInventors] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
    setRecommendedInventors([]);
  };

  const addInventor = async (inventor) => {
    addInventorCallback(inventor);
    handleClose();
  };

  const handleInventorMatchingRoleSelected = async (role) => {
    try {
      const res = await axios.post("/api/inventor-matching/find", {
        role: role,
        project: project,
      });
      setRecommendedInventors(res.data.inventors);
    } catch (e) {
      console.log("Inventor matching failed! ", e);
    }
  };

  return (
    <>
      {children(handleOpen)}
      {open && (
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle>Inventor Matching - Add Inventor</DialogTitle>
          <DialogContent className="px-4" dividers>
            <Select
              label="Role"
              onChange={handleInventorMatchingRoleSelected}
              items={roles}
            />
            <List>
              {recommendedInventors.map((inventor) => (
                <ListItem disableGutters key={inventor.email}>
                  <ListItemButton onClick={() => addInventor(inventor)}>
                    <IconText text={inventor.name}>
                      {getRoleIcon(inventor.role)}
                    </IconText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export { InventorMatchingAddDialog };
