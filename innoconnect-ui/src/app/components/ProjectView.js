/**
 * @author Tom Shortridge
 */
"use client";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const ProjectView = ({ project }) => {
  const router = useRouter();
  const openProject = () => {
    router.push(`/ui/project/home/${project._id}`);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography>
          Project: {project.title}
          <br />
          Description: {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={openProject}>
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectView;
