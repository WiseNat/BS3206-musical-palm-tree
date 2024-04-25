"use client";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Navbar = ({ }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton color="inherit" href="/" >
          <AccountTreeOutlinedIcon/>
        </IconButton>
          <Typography className="select-none" variant="h7" sx={{ flexGrow: 1, ml: 1 }}>
            <b>InnoConnect</b>
          </Typography>
        <IconButton color="inherit"> {/* TODO: Make this link to account page */}
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
  );
};

export default Navbar;
