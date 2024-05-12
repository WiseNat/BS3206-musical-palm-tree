/**
 * @author Nathan Wise
 */
"use client";
import { DialogContent, Dialog, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";
import Form from "./Form";

function AddInventorDialog({ addInventorCallback, children }) {
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const addInventor = async () => {
        addInventorCallback(email)
        handleClose();
    };
    
    return (
      <>
        {children(handleOpen)}
        {open && (
          <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle>Add Inventor</DialogTitle>
            <DialogContent className="px-4" dividers>
              <Form submitAction={addInventor}>
                <TextField
                  id="email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </>
    )
}

export { AddInventorDialog };
