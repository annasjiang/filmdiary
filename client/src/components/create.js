import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blankposter from './poster.jpg';

import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import dayjs from 'dayjs';

import Search from "./search/search";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function Create() {
  const [user] = useAuthState(auth);
  // rating and date
  const [name] = React.useState();
  const [year] = React.useState();
  const [filmid] = React.useState();
  const [rating, setRating] = React.useState();
  const [value1, setValue1] = React.useState(dayjs(new Date()));

  const updateRating = (newRating) => {
    setRating(newRating);
  }

  const nameRef = React.useRef();
  const dateRef = React.useRef(dayjs(new Date()));
  const ratingRef = React.useRef();

  // form
  const [form, setForm] = useState({
    name: "",
    year: "",
    review: "",
    date: "",
    rating: "",
    poster: "",
    filmid: "",
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
    const d = dateRef.current.value;
    const dt = isNaN(d) ? d : format(new Date(+d), 'MM/dd/yyyy');

    // When a post request is sent to the create url, we'll add a new review to the database.
    const newReview = { ...form };
    newReview.name = nameRef.current.value;
    newReview.date= dt;
    newReview.rating = ratingRef.current.value;
    newReview.year = document.getElementById('year-hidden').value;
    newReview.poster = document.getElementById('poster').src;
    newReview.filmid = document.getElementById('filmid-hidden').value;

    await fetch("http://localhost:4000/review/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", review: "", date: "", rating: "", poster: "", filmid: "" });
    navigate("/diary");
  }

  // This following section will display the form that takes the input from the user.
  return (
    user ? (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <div class="container">
        <h3>New Review</h3>
      </div> <br></br>
      <div class="container">
        <div class="row">
          <div class="col-4 nopadding">
              {/* placeholder poster for now!! */}
              <img id="poster" src={blankposter} class="img-fluid" style={{width: 300}} alt="poster"/>
          </div>
        <div class="col">
          <form onSubmit={onSubmit}>
          <div className="form-group">
            {/* title */}
            <label htmlFor="name">I WATCHED...</label>
              <input
                type="text"
                className="form-control"
                id="name-hidden"
                value={name}
                ref={nameRef}
                onChange={(e) => {
                  updateForm({ 
                    name: e.target.value, 
                    poster: document.getElementById('poster').src, 
                    year: document.getElementById('year-hidden').value 
                  }); 
                }}
                required
                hidden
              />
              <input
                type="text"
                className="form-control"
                id="year-hidden"
                value={year}
                hidden
              />
              <input
                type="text"
                className="form-control"
                id="filmid-hidden"
                value={filmid}
                hidden
              />
              <div><Search /></div>
          </div>

          {/* date and rating */}
          <div className="form-group row" style={{marginLeft: 5, marginRight: 5}}>
            <label htmlFor="date" className="col-form-label">ON:</label>
            <div className="col-lg">
              <input
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
                  defaultValue={dayjs(new Date())}                 
                  value={value1}
                  onChange={(newValue) => {
                    setValue1(newValue);
                  }}
                  disableFuture
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            </div>

            <div>
              <input
                name="rating"
                type="number"
                value={rating}
                ref={ratingRef}
                hidden
                readOnly
              />

              <Rating
                name="simple-controlled"
                defaultValue={0}
                value={rating}
                size="large"
                onChange={(event, newValue) => {
                  updateRating(newValue);
                }}
              />
            </div>
          </div>

          {/* review */}
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              rows="8"
              placeholder="ADD A REVIEW..."
              id="review"
              value={form.review}
              onChange={(e) => updateForm({ review: e.target.value })}
            />
          </div>

         {/* cancel/save */}
          <div className="form-group text-right">
            <a href="/diary" class="btn btn-light mr-3" role="button">CANCEL</a>
            <input
              type="submit"
              value="LOG"
              className="btn btn-success"
            />
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <div style={{marginTop: 100, marginLeft: 300, marginRight: 300,}}>
        <h2 class="text-center">You need to be logged in to create reviews!</h2>
      </div>
    )
  );
}
