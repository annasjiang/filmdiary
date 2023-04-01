import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blankposter from './poster.jpg';

import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

import Search from "./search/search";

export default function Edit() {
  // rating and date
  const [name, setName] = React.useState();
  const [rating, setRating] = React.useState(null);
  const [value1, setValue1] = React.useState(null);
  const [posterPath, setPosterPath] = React.useState(null);

  const updateRating = (newRating) => {
    setRating(newRating);
    console.log(rating);
  }

  const nameRef = React.useRef();
  const dateRef = React.useRef();
  const ratingRef = React.useRef();

  // get review data from form
  const [form, setForm] = useState({
    name: "",
    review: "",
    date: "",
    rating: "",
    poster: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:4000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      // set up saved values
      setForm(record);
      setName(record.name);
      // trigger a click so the search bar displays the title
      document.getElementById('searchbar').click();
      document.getElementById('searchbar').dispatchEvent(new Event('click'));
      setValue1(record.date);
      setRating(record.rating);
      setPosterPath(record.poster);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const d = dateRef.current.value;
    const dt = isNaN(d) ? d : format(new Date(+d), 'MM/dd/yyyy');

    const editedPerson = {
      name: nameRef.current.value,
      review: form.review,
      date: dt,
      rating: ratingRef.current.value,
      poster: document.getElementById('poster').src,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:4000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate(`/review/${params.id.toString()}`);
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <div class="container">
      <h3>Edit Review</h3></div> <br></br>
      <div class="container">
      <form onSubmit={onSubmit}>
        <div class="row">
            <div class="col-4 nopadding">
                {/* placeholder poster for now!! */}
                <div className="form-group"><img id="poster" src={posterPath} style={{width: 300}} class="img-fluid"/></div>
            </div>
            <div class="col">
              {/* <form onSubmit={onSubmit}> */}
                <div className="form-group">
                  {/* film title */}
                  <label htmlFor="name">I WATCHED... </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name-hidden"
                    value={name}
                    ref={nameRef}
                    onChange={(e) => {
                      updateForm({ name: e.target.value, poster: document.getElementById('poster').src }); 
                      // document.getElementById('searchresults').style.visibility = "hidden";
                    }}
                    required
                    // value={form.name}
                    // onChange={(e) => updateForm({ name: e.target.value })}
                    hidden
                  />
                  <div>
                    <Search/>
                  </div>
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
                    defaultValue={rating}
                    value={rating}
                    // precision={0.5}
                    size="large"
                    onChange={(event, newValue) => updateRating(newValue)
                    }
                    />
                  </div>
                </div>

                {/* review */}
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control"
                    id="review"
                    rows="8"
                    value={form.review}
                    onChange={(e) => updateForm({ review: e.target.value })}
                  />
                </div>

                {/* cancel/submit button */}
                <div className="form-group text-right">
                  <a href={`/review/${params.id}`} class="btn btn-light mr-3" role="button">CANCEL</a>                 
                  <input
                    type="submit"
                    value="SAVE"
                    className="btn btn-success"
                  />
                </div>
              {/* </form> */}
            </div>
          </div>
          </form>
        </div>           
    </div>
  );
}