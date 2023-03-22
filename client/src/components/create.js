import React, { useState } from "react";
import { useNavigate } from "react-router";
import poster from './poster.jpg';

import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

export default function Create() {
  // rating and date
  const [rating, setRating] = React.useState();
  const [value1, setValue1] = React.useState(null);

  const updateRating = (newRating) => {
    setRating(newRating);
    console.log(rating);
  }

  const dateRef = React.useRef();
  const ratingRef = React.useRef();

  // form
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
    // if no date entered, default is today's date
    const d = isNaN(dateRef.current.value) ? dateRef.current.value : new Date();
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

    setForm({ name: "", review: "", date: "", rating: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
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
                // precision={0.5}
                size="large"
                onChange={(event, newValue) => {
                  updateRating(newValue)
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
            <a href="/" class="btn btn-light mr-3" role="button">CANCEL</a>
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
  );
}
