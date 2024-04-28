"use client";
import Form from "@/app/components/Form";
import { Button, Link, TextField, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const startLogin = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post("/api/users/login", user);
      router.push("/ui/home");
    } catch (e) {
      setError("Username or Password may be incorrect!");
    }
  };
  return (
    <main>
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Form title="Login" submitAction={startLogin} className="mx-16 my-4">
          <Typography color="red">{error}</Typography>
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
          <Button variant="contained" type="submit">
            Submit
          </Button>

          <Typography>
            Or <Link href="/signup">Sign Up</Link>
          </Typography>
        </Form>
      </div>
    </main>
  );
}
