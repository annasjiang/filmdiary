import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

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

export default function View() {
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

  // rating and date
  const [rating, setRating] = React.useState(null);
  const [value1, setValue1] = React.useState(null);
  const [posterPath, setPosterPath] = React.useState(null);

  // review info
  const [form, setForm] = useState({
    name: "",
    year: "",
    review: "",
    date: "",
    rating: "",
    poster: "",
    filmdid: "",
    reviews: [],
  });
  const params = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:4000/review/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const review = await response.json();
      if (!review) {
        window.alert(`Review with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(review);
      setValue1(review.date);
      setRating(review.rating);
      setPosterPath(review.poster);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // This method will delete a review
  async function deleteReview(deleteId) {
      await fetch(`http://localhost:4000/${deleteId}`, {
          method: "DELETE"
      });
      navigate("/diary")
  }

  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
    <div class="container">
    <div class="row">
      <div class="col nopadding">
        <a href={`/info/${form.filmid}`} style={{ textDecoration: 'none', color: 'black'}}>
          <h3 style={{display: "inline", marginRight: 10}}>{form.name}</h3></a>
        <p class="text-muted" style={{fontSize: 22, display: "inline"}}>({form.year})</p>
      </div>
      <div class="col col-sm-1">
      <div class="float-right">
        <ThemeProvider theme={theme}>
          {/* edit/delete button */}
          {user && <Button color="neutral"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >•••</Button>}
        </ThemeProvider>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <Link to={`/edit/${params.id}`} style={{ textDecoration: 'none', color: 'black'}}>
          <MenuItem>Edit</MenuItem></Link>
          <MenuItem onClick={handleClickOpenAlert}>Delete</MenuItem>
        </Menu> 
      </div>
      </div>
      </div>
    </div>
    <br></br>

    {/* poster */}
    <div class="container">
      <div class="row">
        <div class="col-4 nopadding">
            {/* placeholder poster for now!! */}
            <img src={posterPath} style={{width: 300}} class="img-fluid" alt="poster"/>
        </div>
        <div class="col">
        <p class="text-muted"> watched on {value1}
          <div class="float-right">
            <Rating
              name="simple-controlled"
              defaultValue={rating}
              value={rating}
              size="medium"
              readOnly/>
          </div>
        </p>
        <p>{form.review}</p> 
        </div>
      </div>
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
          Are you sure you want to delete your review?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <ThemeProvider theme={theme}>
        <Button color="neutral" onClick={handleCloseAlert}>Cancel</Button>
        <Button color="error" onClick={() => {
              deleteReview(params.id);
          }} autoFocus>
          Delete
        </Button>
      </ThemeProvider>
      </DialogActions>
    </Dialog>    
    </div>
  );
}
