"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = ({}) => {
  const router = useRouter();
  const [show, setShow] = useState(null);

  const handleClick = (e) => {
    setShow(e.currentTarget);
  };

  const handleClose = () => {
    setShow(null);
  };

  const handleLogOut = async () => {
    await signOut("credentials");
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/ui/profile");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" href="/">
            <AccountTreeOutlinedIcon />
          </IconButton>
          <Typography
            className="select-none"
            variant="h7"
            sx={{ flexGrow: 1, ml: 1 }}
          >
            <b>InnoConnect</b>
          </Typography>
          <IconButton color="inherit" onClick={handleClick}>
            {" "}
            {/* TODO: Make this link to account page */}
            <AccountCircleOutlinedIcon />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={show}
            keepMounted
            open={Boolean(show)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile} key="Profile" value="Profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogOut} key="Log Out" value="Log Out">
              Log Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
