import React from "react";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import './navbar.css';

import logo from "./logo.png";
import Button from '@mui/material/Button';
import {IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

// Here, we display our Navbar
export default function Navbar() {
  // dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const [anchorElAcc, setAnchorElAcc] = React.useState(null);
  const openAcc = Boolean(anchorElAcc);
  const handleClickAcc = (event) => {
      setAnchorElAcc(event.currentTarget);
  };
  const handleCloseAcc = () => {
      setAnchorElAcc(null);
  };

  const [user] = useAuthState(auth);

  return (
    user ? (
    // logged in user
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top nav-fill">
        <NavLink className="navbar-brand" to="/">
        <a><img src={logo} width="25" height="25" alt="Film Diary"/></a> FILM DIARY
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse centerLinksPls" id="navbarNav">
            <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/diary">diary</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/lists">lists</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/discover">discover</a>
          </li>
        </ul>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <Stack direction="row" alignItems="center" gap={0}>
              <ThemeProvider theme={theme}>
                {/* edit/delete button */}
                <Button color="success"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  // small
                >+ NEW</Button>
              </ThemeProvider>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}>
                <Link to={`/create`} style={{ textDecoration: 'none', color: 'black'}}>
                <MenuItem onClick={handleClose}>Review</MenuItem></Link>
                <Link to={`/createlist`} style={{ textDecoration: 'none', color: 'black'}}>
                <MenuItem onClick={handleClose}>Film List</MenuItem></Link>
              </Menu>
              <ThemeProvider theme={theme}>
                <IconButton 
                  color="primary"
                  id="acc-button"
                  aria-controls={openAcc ? 'acc-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAcc ? 'true' : undefined}
                  onClick={handleClickAcc}
                ><AccountCircleIcon 
                sx={{ fontSize: 30 }}
                /></IconButton>
              </ThemeProvider>
              <Menu
                id="acc-menu"
                anchorEl={anchorElAcc}
                open={openAcc}
                onClose={handleCloseAcc}
                MenuListProps={{
                  'aria-labelledby': 'acc-button',
                }}>
                <Link to="/logout" style={{ textDecoration: 'none', color: 'black'}}>
                <MenuItem onClick={handleCloseAcc}>Log Out</MenuItem></Link>
              </Menu>
              </Stack>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    ) : (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top nav-fill">
        <NavLink className="navbar-brand" to="/">
        <a><img src={logo} width="25" height="25" alt="Film Diary"/></a> FILM DIARY
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse centerLinksPls" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/diary">diary</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/lists">lists</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/discover">discover</a>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <ThemeProvider theme={theme}>
                <IconButton 
                  color="neutral"
                  id="acc-button"
                  aria-controls={openAcc ? 'acc-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAcc ? 'true' : undefined}
                  onClick={handleClickAcc}
                ><AccountCircleIcon 
                  sx={{ fontSize: 30 }}
                /></IconButton>
              </ThemeProvider>
              <Menu
                id="acc-menu"
                anchorEl={anchorElAcc}
                open={openAcc}
                onClose={handleCloseAcc}
                MenuListProps={{
                  'aria-labelledby': 'acc-button',
                }}>
                <Link to="/login" style={{ textDecoration: 'none', color: 'black'}}>
                <MenuItem onClick={handleCloseAcc}>Log In</MenuItem></Link>
              </Menu>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    )
  );
}
