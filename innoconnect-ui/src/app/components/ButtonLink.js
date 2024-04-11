"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

const ButtonLink = ({ route, text }) => {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      onClick={() => {
        router.push(route);
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonLink;
