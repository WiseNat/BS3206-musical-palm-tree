/**
 * @author Tom Shortridge
 *
 * The sign up page for the system
 */
"use client";
import Form from "@/app/components/Form";
import Navbar from "@/app/components/Navbar";
import { Button, Link, TextField, Typography } from "@mui/material";
import Select from "@/app/components/FormSelect";
import LabelSwitch from "@/app/components/LabelSwitch";
import { roles, communicationLanguages, timezones } from "@/app/lib/selection";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    language: "",
    timezone: "",
    matching: false,
  });

  const setRole = (value) => {
    setUser({ ...user, role: value });
  };

  const setLanguage = (value) => {
    setUser({ ...user, language: value });
  };

  const setTimezone = (value) => {
    setUser({ ...user, timezone: value });
  };

  // Posts the user's data to the API
  const createSignup = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (e) {
      console.log("User registration failed!", e.message);
    }
  };
  return (
    <main>
      <Navbar />
      <div>
        <Form
          title="Sign Up"
          submitAction={createSignup}
          className="mx-16 my-4"
        >
          <TextField
            id="firstname"
            label="First Name"
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            required
          />
          <TextField
            id="lastname"
            label="Last Name"
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            required
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <Select label="Role" onChange={setRole} items={roles} required />
          <Select
            label="Language"
            onChange={setLanguage}
            items={communicationLanguages}
            required
          />
          <Select
            label="Timezone"
            onChange={setTimezone}
            items={timezones}
            required
          />
          <LabelSwitch
            label="Inventor Matching"
            action={(e) => setUser({ ...user, matching: e.target.checked })}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>

          <Typography>
            Or <Link href="/login">Login</Link>
          </Typography>
        </Form>
      </div>
    </main>
  );
}
