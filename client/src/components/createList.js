import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./searchList/search";
import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableRow, IconButton,} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function CreateList() {
  const [user] = useAuthState(auth);
  // table stuff
  const [rows, setRows] = useState([
    {
      id: 1,
      item: {title: "", year:"", poster: "", filmid: ""}
    }
  ]);

  const generateRow = () => {
    return {
      id: 1,
      item: {title: "", year:"", poster: "", filmid: ""}
    }
  }

  const handleDeleteRow = (event, id) => {
    setRows(rows => {
      rows[id - 1].item["title"] = "";
      for (let i = id - 1; i < rows.length; i++) {
        rows[i].id--;
      }
    });

    setRows((prevRows) => {
      return [
        ...rows.slice(0, id - 1),
        ...rows.slice(id),
      ];
    });
  }

  const handleChange = (e, id) => {
    let value = e.target.value;
    if (id === 1) {
      if (value !== "") {
        for (let i = 0; i < rows.length; i++) {
            rows[i].id=i+2;
        }
       setRows((prevRows) => [generateRow(), ...prevRows]);
       rows[0].item["title"]=value;
       rows[0].item["year"]=document.getElementById("addYearToList").value;
       rows[0].item["poster"]=document.getElementById("addPosterToList").src;
       rows[0].item["filmid"]=document.getElementById("addFilmIdToList").value;
      }
    } else if (id + 1 === rows.length) {
      if (value === "") {
        handleDeleteRow(e, id + 1);
      }
    }
  }

  const generateTable = () => {
    return (
      <Table>
        <TableBody>
          {rows.map((row) => 
          
          row.id === 1 ? (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            hidden
            > 
            <TableCell component="th" scope="row" id="poster" className="col-sm-1">
              <img id='addPosterToList' src={row.item["poster"]} style={{height :100}} alt="poster"></img>
            </TableCell>
            <TableCell component="th" scope="row" id="name" className="col-sm-7">
              <TextField 
                id='addFilmToList'
                placeholder={"Add Item"} 
                onClick={(e) => handleChange(e, row.id)} 
                value={row.item["title"]}
                fullWidth
                autoComplete="off"
                variant="standard"
                InputProps={{ disableUnderline: true, readOnly: true }}
              />
              <p id="addYearToList" className="text-muted">({row.item["year"]})</p>
              <p id="addFilmIdToList" hidden>({row.item["filmid"]})</p>
            </TableCell>
            <TableCell component="th" scope="row" className="col-sm-1">
              {
                row.id === 1 ? (<></>) : (     //changed here
                  <IconButton onClick={(e) => handleDeleteRow(e, row.id)} style={{float:"right"}}>
                    <DeleteIcon />
                  </IconButton>
                )
              }
            </TableCell>
          </TableRow>
          ) : 
          ( 
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            > 
              <TableCell component="th" scope="row" id="poster" className="col-sm-1">
                <img id='addPosterToList' src={row.item["poster"]} style={{height :100}} alt="poster"></img>
              </TableCell>
              <TableCell component="th" scope="row" id="name" className="col-sm-7">
                <TextField 
                  id='addFilmToList'
                  placeholder={"Add Item"} 
                  onClick={(e) => handleChange(e, row.id)} 
                  value={row.item["title"]}
                  fullWidth
                  autoComplete="off"
                  variant="standard"
                  InputProps={{ disableUnderline: true, readOnly: true, style: {fontWeight: 500}}}
                />
                <p id="addYearToList" className="text-muted">({row.item["year"]})</p>
                <p id="addFilmIdToList" hidden>({row.item["filmid"]})</p>
              </TableCell>
              <TableCell component="th" scope="row" className="col-sm-1">
                {
                  row.id === 1 ? (<></>) : (     //changed here
                    <IconButton onClick={(e) => handleDeleteRow(e, row.id)} style={{float:"right"}}>
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              </TableCell>
            </TableRow>       
          ))}
        </TableBody>
      </Table>
    );
  }

  const [tableData, setTableData] = useState(generateTable());

  useEffect(() => {
    setTableData(generateTable());
  }, [rows])

  // form
  const [form, setForm] = useState({
    name: "",
    description: "",
    list: [],
    updated: "",
    thumbnail1: "",
    thumbnail2: "",
    thumbnail3: "",
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

    let arr = [];
    // if (rows[rows.length - 1].item === "") {
    if (rows[0].item["title"] === "") {
      arr = rows.slice(1, rows.length);
    } else {
      arr = rows;
    }

    let items = [];
    for (let i = 0; i < arr.length; i++) {
      items.push(arr[i].item);
    }

    // set default list name
    const n = isNaN(form.name) ? form.name : "Untitled List";

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newList = { ...form };
    newList.name = n;
    newList.list = JSON.stringify(items);
    newList.updated = dayjs(new Date());
    if (arr.length > 0) {
      newList.thumbnail1 = arr[0].item.poster;
    }
    if (arr.length > 1) {
      newList.thumbnail2 = arr[1].item.poster;
    }
    if (arr.length > 2) {
      newList.thumbnail3 = arr[2].item.poster;
    }
    
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

    setForm({ name: "", description: "", list: "", updated: "", thumbnail1: "", thumbnail2: "", thumbnail3: "" });
    navigate("/lists");
  }

  // This following section will display the form that takes the input from the user.
  return (
    user ? (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <form onSubmit={onSubmit}>
      <div className="container">
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          placeholder="New List"
          multiline
          // rows={1}
          maxRows={10}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          inputProps={{style: {fontSize: 28, lineHeight: 1.2, fontWeight: 500}}} // font size of input text
          InputLabelProps={{style: {fontSize: 28, lineHeight: 1.2, fontWeight: 500}}} // font size of input label
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
      <div className="container"><TextField fullWidth id="outlined-basic" label="ADD FILMS..." variant="outlined" hidden/></div> 
      <div className="container"><Search/></div> <br></br>
      <div className="container">
      <Grid container>
        <Grid item lg={12} justifyContent="center" display="flex">
          <Card>
            <TableContainer>
              {tableData} {/* this variable will change to contain all data */}
            </TableContainer>
          </Card>
        </Grid>
        </Grid>
      </div>
      <br></br>
      
      <div className="form-group text-right container">
        <a href="/lists" className="btn btn-light mr-3" role="button">CANCEL</a>
        <input
          type="submit"
          value="SAVE"
          className="btn btn-success"
        />
      </div>   
      </form>  
    </div>
    ) : (
      <div style={{marginTop: 100, marginLeft: 300, marginRight: 300,}}>
        <h2 class="text-center">You need to be logged in to create lists!</h2>
      </div>
    )
  );
}
