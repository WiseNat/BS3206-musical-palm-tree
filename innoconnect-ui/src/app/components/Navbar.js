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
import SearchIcon from "@mui/icons-material/Search";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";

const Navbar = ({}) => {
  const router = useRouter();
  const { data: session } = useSession();
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

  const handleLogIn = () => {
    router.push("/login");
  };

  const handleSearch = () => {
    router.push("/ui/project/search");
  };

  // Determines 'home' path based on user being logged in
  const handleHomeButton = () => {
    if (session) {
      router.push("/ui/home");
    } else {
      router.push("/login");
    }
  };

  const ShowUserManagement = ({ session, children }) => {
    if (session) return <>{children}</>;
  };

  const ShowLogin = ({ session, children }) => {
    if (!session) return <>{children}</>;
  };

  const ShowSearch = ({ session }) => {
    if (session)
      return (
        <IconButton color="inherit" onClick={handleSearch}>
          <Tooltip title="Project Search">
            <SearchIcon />
          </Tooltip>
        </IconButton>
      );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={handleHomeButton}>
            <AccountTreeOutlinedIcon />
          </IconButton>
          <Typography
            className="select-none"
            variant="h7"
            sx={{ flexGrow: 1, ml: 1 }}
          >
            <b>InnoConnect</b>
          </Typography>
          <ShowSearch session={session} />
          <IconButton color="inherit" onClick={handleClick}>
            {" "}
            <Tooltip title="Account">
              <AccountCircleOutlinedIcon />
            </Tooltip>
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={show}
            keepMounted
            open={Boolean(show)}
            onClose={handleClose}
          >
            <ShowUserManagement session={session}>
              <MenuItem onClick={handleProfile} key="Profile" value="Profile">
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogOut} key="Log Out" value="Log Out">
                Log Out
              </MenuItem>
            </ShowUserManagement>
            <ShowLogin session={session}>
              <MenuItem onClick={handleLogIn} key="Log In" value="Log In">
                Log In
              </MenuItem>
            </ShowLogin>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
