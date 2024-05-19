/**
 * @author Tom Shortridge
 *
 * The login page for the system
 */
"use client";
import Form from "@/app/components/Form";
import { Button, Link, TextField, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Starts the login process using the authentication solution
  const startLogin = async (event) => {
    try {
      event.preventDefault();
      await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });
      router.push("/ui/home");
    } catch (e) {
      console.log(e);
      setError("Username or Password may be incorrect!");
    }
  };
  return (
    <main>
      <Navbar />
      <div>
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
