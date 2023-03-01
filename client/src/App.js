import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Rating from '@mui/material/Rating';

// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { format } from 'date-fns'

const App = () => {
  // const [rating, setRating] = React.useState(2);
  // const [value1, setValue1] = React.useState(null);

  // const updateRating = (newRating) => {
  //   setRating(newRating);
  //   console.log(rating);
  // }
  // const [inputs, setInputs] = React.useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs(values => ({...values, [name]: value}))
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const r = ratingRef.current.value;
  //   const d = dateRef.current.value;
  //   var dt = new Date(+d);
  //   alert(r + ' ' + format(dt, 'MM/dd/yyyy'));
  // }

  // const dateRef = React.useRef();
  // const ratingRef = React.useRef();

  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>

      {/* <div>
        <form onSubmit={handleSubmit}>
        <label>Enter your name:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
        </label>

        <label>Enter your age:
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
          />
          </label>

          <input
            name="rating"
            type="number"
            value={rating}
            ref={ratingRef}
            hidden
            readOnly
          />

          <input
            name="entry"
            type="text"
            value={value1}
            ref={dateRef}
            hidden
            readOnly
          />

          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => updateRating(newValue)
            }
          />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Basic example"
          mask="__/__/____"
          value={value1}
          onChange={(newValue) => {
            setValue1(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

      <input type="submit" />
      </form>
    </div> */}
    </div>
  );
};

export default App;
