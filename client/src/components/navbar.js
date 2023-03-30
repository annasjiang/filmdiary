import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import logo from "./logo.png";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  return (
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

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">diary</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/lists">lists</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search">search</a>
          </li>
        </ul>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {/* <NavLink className="nav-link" to="/create">
                + LOG
              </NavLink> */}
              <ThemeProvider theme={theme}>
                {/* edit/delete button */}
                <Button color="success"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
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
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

