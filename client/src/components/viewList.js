import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import poster from './poster.jpg';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


export default function ViewList() {
  // dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  // confirm delete alert
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpenAlert = () => {
    setAnchorEl(null);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // list info
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:4000/list/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const list = await response.json();
      if (!list) {
        window.alert(`List with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(list);
    //   setValue1(record.date);
    //   setRating(record.rating);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // This method will delete a record
  async function deleteList(deleteId) {
      await fetch(`http://localhost:4000/delete/${deleteId}`, {
          method: "DELETE"
      });
      navigate("/lists")
  }

  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
    <div class="container">
    <h3>{form.name}
      <div class="float-right">
        <ThemeProvider theme={theme}>
          {/* edit/delete button */}
          <Button color="neutral"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >•••</Button>
        </ThemeProvider>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <Link to={`/editlist/${params.id}`} style={{ textDecoration: 'none', color: 'black'}}>
          <MenuItem>Edit</MenuItem></Link>
          <MenuItem onClick={handleClickOpenAlert}>Delete</MenuItem>
        </Menu> 
      </div>
    </h3>
    </div>
    <br></br>
    <div class="container">
        <p>{form.description}</p> 
    </div> 

    {/* delete confirmation alert */}
    <Dialog
      open={openAlert}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete your list?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <ThemeProvider theme={theme}>
        <Button color="neutral" onClick={handleCloseAlert}>Cancel</Button>
        <Button color="error" onClick={() => {
              deleteList(params.id);
          }} autoFocus>
          Delete
        </Button>
      </ThemeProvider>
      </DialogActions>
    </Dialog>    
    </div>
  );
}