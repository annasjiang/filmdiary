import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import poster from './poster.jpg';

import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

export default function EditList() {
// get list data from form
const [form, setForm] = useState({
  name: "",
  description: "",
  records: [],
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

  const editedList = {
    name: form.name,
    description: form.description,
  };

  // This will send a post request to update the data in the database.
  await fetch(`http://localhost:4000/updatelist/${params.id}`, {
    method: "POST",
    body: JSON.stringify(editedList),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  navigate(`/list/${params.id.toString()}`);
}

// This following section will display the form that takes input from the user to update the data.
return (
  <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
    <form onSubmit={onSubmit}>
    <div class="container">
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        defaultValue={form.name}
        multiline
        rows={1}
        variant="standard"
        InputProps={{ disableUnderline: true }}
        inputProps={{style: {fontSize: 28, fontWeight: 500}}} // font size of input text
        InputLabelProps={{style: {fontSize: 28, fontWeight: 500}}} // font size of input label
        onChange={e => updateForm({ name: e.target.value })}
        type="text"
      />
      <br></br><br></br>
      <TextField
        fullWidth
        id="outlined-multiline-flexible"
        defaultValue={form.description}
        multiline
        rows={3}
        maxRows={3}
        variant="standard"
        InputProps={{ disableUnderline: true }}
        onChange={e => updateForm({ description: e.target.value })}
        type="text"
      />    
    </div> <br></br>
    <div class="container"><TextField fullWidth id="outlined-basic" label="ADD FILMS..." variant="outlined" /></div> 
    <br></br>

    {/* cancel/submit button */}
    <div className="form-group text-right container">
      <a href={`/list/${params.id}`} class="btn btn-light mr-3" role="button">CANCEL</a>                 
      <input
        type="submit"
        value="SAVE"
        className="btn btn-success"
      />
    </div>
    </form>
  </div>  
);
}

