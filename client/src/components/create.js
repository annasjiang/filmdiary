import React, { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router";
import poster from './poster.jpg';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
=======
import { useNavigate } from "react-router-dom";

import Rating from '@mui/material/Rating';
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
<<<<<<< HEAD
// import Stack from '@mui/material/Stack';

// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     neutral: {
//       main: '#64748B',
//       contrastText: '#fff',
//     },
//   },
// });

export default function Create() {
  // rating and date
=======

export default function Create() {
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
  const [rating, setRating] = React.useState();
  const [value1, setValue1] = React.useState(null);

  const updateRating = (newRating) => {
    setRating(newRating);
    console.log(rating);
  }

<<<<<<< HEAD
  const dateRef = React.useRef();
  const ratingRef = React.useRef();

  // form
=======
  const [inputs, setInputs] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const r = ratingRef.current.value;
    const d = dateRef.current.value;
    var dt = new Date(+d);
    alert(r + ' ' + format(dt, 'MM/dd/yyyy'));
  }
  
  const dateRef = React.useRef();
  const ratingRef = React.useRef();

>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
  const [form, setForm] = useState({
    name: "",
    review: "",
    date: "",
    rating: "",
  });
  
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    // if no date entered, default is today's date
    const d = isNaN(dateRef.current.value) ? dateRef.current.value : new Date();
=======
    const d = dateRef.current.value;
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
    var dt = new Date(+d);

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    newPerson.date = format(dt, 'MM/dd/yyyy');
    newPerson.rating = ratingRef.current.value;

    await fetch("http://localhost:4000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

<<<<<<< HEAD
    setForm({ name: "", review: "", date: "", rating: "" });
=======
    setForm({ name: "", position: "", date: "", rating: "" });
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
<<<<<<< HEAD
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <div class="container">
        <h3>New Review</h3>
      </div> <br></br>
      <div class="container">
        <div class="row">
          <div class="col-4 nopadding">
              {/* placeholder poster for now!! */}
              <img src={poster} class="img-fluid"/>
          </div>
        <div class="col">
          <form onSubmit={onSubmit}>
          <div className="form-group">
            {/* title */}
            <label htmlFor="name">I WATCHED...</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
          </div>

          {/* date and rating */}
          <div className="form-group row" style={{marginLeft: 5, marginRight: 5}}>
            <label htmlFor="date" className="col-form-label">ON:</label>
            <div className="col-lg">
              <input
=======
    <div style={{marginTop: 50, marginLeft: 300, marginRight: 300}}>
      <h3>NEW REVIEW</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">I WATCHED...</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group row" style={{marginLeft: 5, marginRight: 5}}>
          <label htmlFor="date" className="col-form-label">ON:</label>
          <div className="col-lg">
            <input
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
                name="entry"
                type="text"
                value={value1}
                ref={dateRef}
                hidden
                readOnly
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  mask="__/__/____"
                  value={value1}
                  onChange={(newValue) => {
                    setValue1(newValue);
                  }}
<<<<<<< HEAD
                  disableFuture
=======
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            </div>

            <div>
<<<<<<< HEAD
              <input
=======
            <input
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
                name="rating"
                type="number"
                value={rating}
                ref={ratingRef}
                hidden
                readOnly
              />

              <Rating
<<<<<<< HEAD
                name="simple-controlled"
                defaultValue={0}
                value={rating}
                // precision={0.5}
                size="large"
                onChange={(event, newValue) => {
                  updateRating(newValue)
                }}
=======
              name="simple-controlled"
              defaultValue={0}
              value={rating}
              // precision={0.5}
              size="large"
              onChange={(event, newValue) => {
                updateRating(newValue)
              }}
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
              />
            </div>
          </div>

<<<<<<< HEAD
          {/* review */}
=======
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
<<<<<<< HEAD
              rows="8"
              placeholder="ADD A REVIEW..."
              id="review"
              value={form.review}
              onChange={(e) => updateForm({ review: e.target.value })}
            />
          </div>

         {/* cancel/save */}
          <div className="form-group text-right">
            <a href="/" class="btn btn-light mr-3" role="button">CANCEL</a>
            <input
              type="submit"
              value="LOG"
              className="btn btn-success"
            />
            {/* <Stack direction="row" spacing={2}>
            <ThemeProvider theme={theme}>
              <Button color="neutral"
                id="basic-button"
                size="large"
                variant="outlined"
                onClick={() => {
                  navigate("/");
                }}
              >Cancel</Button>
              <Button color="success"
                id="basic-button"
                type="submit"
                size="large"
                variant="outlined"
              >Log</Button>
            </ThemeProvider>
            </Stack> */}
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
              rows="5"
              placeholder="ADD A REVIEW..."
              id="position"
              value={form.position}
              onChange={(e) => updateForm({ position: e.target.value })}
            />
          </div>

          <div className="form-group text-right">
            <a href="/" class="btn btn-secondary mr-3" role="button">CANCEL</a>
            <input
              type="submit"
              value="LOG"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
      
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
