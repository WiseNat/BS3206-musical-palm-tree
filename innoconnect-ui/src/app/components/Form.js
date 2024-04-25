"use client";
import Typography from "@mui/material/Typography";

const Form = ({ className, children, title }) => {
  return (
    <div className={className}>
      <Typography variant="h4" className="mb-4">
        {title}
      </Typography>
      <div className="flex flex-col space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Form;
