import Form from "@/app/components/Form";
import { Button, Link, TextField, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";

export default function Login() {
  return (
    <main>
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Form title="Login" className="mx-16 my-4">
          <TextField id="email" label="Email" type="email" required />
          <TextField id="password" label="Password" type="password" required />
          <Button variant="contained" type="submit">
            Submit
          </Button>

          <Typography>
            Or <Link href="/ui/signup">Sign Up</Link>
          </Typography>
        </Form>
      </div>
    </main>
  );
}
