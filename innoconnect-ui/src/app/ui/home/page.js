/**
 * @author Tom Shortridge
 *
 * The homepage
 */
import { auth } from "@/app/auth";
import Navbar from "@/app/components/Navbar";
import ButtonLink from "@/app/components/ButtonLink";
import { Typography } from "@mui/material";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <Typography variant="h4" className="mb-4">
        Hello {session?.user.firstname}
      </Typography>
      <div className="flex flex-col space-y-4">
        <ButtonLink
          route="/ui/project/search"
          text="Search for existing Projects"
        />
        <ButtonLink route="/ui/project/create" text="Create Project" />
      </div>
    </div>
  );
}
