import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';

export default function CreateList() {
  // form
  const [form, setForm] = useState({
    name: "",
    description: "",
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
    // set default list name
    const n = isNaN(form.name) ? form.name : "Untitled List";

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newList = { ...form };
    newList.name = n;
    

    await fetch("http://localhost:4000/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", description: "" });
    navigate("/lists");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <form onSubmit={onSubmit}>
      <div class="container">
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          placeholder="New List"
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
          placeholder="ADD DESCRIPTION..."
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
      <div className="form-group text-right container">
        <a href="/lists" class="btn btn-light mr-3" role="button">CANCEL</a>
        <input
          type="submit"
          value="LOG"
          className="btn btn-success"
        />
      </div>   
      </form>  
    </div>
  );
}
