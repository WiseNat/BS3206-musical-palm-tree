"use client";
import Form from "@/app/components/Form";
import Navbar from "@/app/components/Navbar";
import { Button, Link, TextField, Typography } from "@mui/material";
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
  });

  const createSignup = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (e) {
      console.log("User registration failed!", e.message);
    }
  };
  return (
    <main>
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
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
