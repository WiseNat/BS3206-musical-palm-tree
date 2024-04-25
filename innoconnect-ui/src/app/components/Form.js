"use client";
import Typography from "@mui/material/Typography";

const Form = ({ className, children, title, action, submitAction }) => {
  return (
    <div className={className}>
      <Typography variant="h4" className="mb-4">
        {title}
      </Typography>
      <form action={action} method="POST" onSubmit={submitAction}>
        <div className="flex flex-col space-y-4">{children}</div>
      </form>
    </div>
  );
};

export default Form;
