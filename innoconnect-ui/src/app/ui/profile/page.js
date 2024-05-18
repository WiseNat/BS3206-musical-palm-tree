/**
 * @author Tom Shortridge
 */
"use client";
import Navbar from "@/app/components/Navbar";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Form from "@/app/components/Form";
import Button from "@mui/material/Button";
import Modal from "@/app/components/ModalTemplate";
import Select from "@/app/components/FormSelect";
import { roles, timezones } from "@/app/lib/selection";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import LabelSwitch from "@/app/components/LabelSwitch";

export default function Profile() {
  const { data: session } = useSession();
  const [user, setUser] = useState({
    email: "",
    role: "",
    timezone: "",
    matching: false,
  });

  const [updatedUser, setUpdatedUser] = useState({
    email: session?.user.email,
    role: "",
    timezone: "",
    matching: false,
    password: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setRole = (value) => {
    setUpdatedUser({ ...user, role: value });
  };

  const setTimezone = (value) => {
    setUpdatedUser({ ...user, timezone: value });
  };

  useEffect(() => {
    async function getUser() {
      if (session) {
        const res = await axios.get("/api/users/protected/findBySession");
        setUser({
          ...user,
          email: res.data.user.email,
          role: res.data.user.role,
          timezone: res.data.user.timezone,
          matching: res.data.user.matching,
        });
      }
    }
    getUser();
  }, []);

  const updateUser = async () => {
    try {
      const res = await axios.post("/api/users/protected/update", updatedUser);
      handleClose();
    } catch (e) {
      console.log("User update failed!", e.message);
    }
  };

  return (
    <main>
      <Navbar />
      <Typography variant="h4" className="mb-4">
        Hi {session?.user.firstname}, lets manage your account!
      </Typography>
      <div>
        <Form title="Current Details" className="mx-16 my-4">
          <TextField id="email" label="Email" value={user.email} disabled />
          <TextField
            id="role"
            label="Current Role"
            value={user.role}
            disabled
          />
          <TextField
            id="timezone"
            label="Current Timezone"
            value={user.timezone}
            disabled
          />
          <LabelSwitch
            label="Inventor Matching"
            disabled
            checked={user.matching}
          />
          <Button variant="contained" onClick={handleOpen}>
            Edit Details
          </Button>
        </Form>
        <Modal open={open} onClose={handleClose}>
          <Form title="Edit Profile" submitAction={updateUser}>
            <Select label="Role" onChange={setRole} items={roles} />
            <Select label="Timezone" onChange={setTimezone} items={timezones} />
            <LabelSwitch
              label="Inventor Matching"
              action={(e) =>
                setUpdatedUser({ ...user, matching: e.target.checked })
              }
            />
            <TextField
              id="password"
              label="Update Password"
              onChange={(e) =>
                setUpdatedUser({ ...user, password: e.target.value })
              }
              type="password"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal>
      </div>
    </main>
  );
}
