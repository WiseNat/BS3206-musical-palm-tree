/**
 * @author Tom Shortridge
 */
"use client";
import { Typography, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import DataObjectIcon from "@mui/icons-material/DataObject";
import IconText from "@/app/components/IconText";

const ProjectView = ({ project }) => {
  const router = useRouter();
  const openProject = () => {
    router.push(`/ui/project/home/${project._id}`);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography className="truncate pb-1" variant="h6">
          {project.title}
        </Typography>
        <Typography className="truncate pb-1">
          <i>{project.description}</i>
        </Typography>
        <IconText text={project.mainProgrammingLanguage}>
          <Tooltip title="Programming Language">
            <DataObjectIcon />
          </Tooltip>
        </IconText>
        <IconText text={project.mainTechnology}>
          <Tooltip title="Technology">
            <PrecisionManufacturingIcon />
          </Tooltip>
        </IconText>
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
