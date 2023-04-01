import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import poster from './poster.jpg';

import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

import Search from "./searchList/search";
import {
  Button,
  Card,
  Grid,
  Input,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Snackbar,
  Slide,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
// import TextField from '@mui/material/TextField';

export default function EditList() {
  // table stuff
  const [rows, setRows] = useState([
    {
      id: 1,
      item: {title: "", poster: ""}
    }
  ]);

  const generateRow = () => {
    return {
        //id: rows.length + 1,
      id: 1,
      item: {title: "", poster: ""}
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
    console.log("len=" + rows.length + " id="+id);
    // if (id === rows.length) {
    if (id === 1) {
      if (value !== "") {
//        setRows((prevRows) => [...prevRows, generateRow()]);
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i].id);
            rows[i].id=i+2;
        }
       setRows((prevRows) => [generateRow(), ...prevRows]);
       rows[0].item["title"]=value;
       rows[0].item["poster"]=document.getElementById("addPosterToList").src;
      }
    } else if (id + 1 === rows.length) {
      if (value === "") {
        handleDeleteRow(e, id + 1);
      }
    }
    console.log("new len=" + rows.length );
    //comment out
    // setRows((prevRows) => {
    //     return prevRows.map( (row, index) => index ===  id ? row : { item: value, ...row}, );
    //   });
  }

 

  // const handleSave = () => {
  //   let arr = [];
  //   if (rows[rows.length - 1].item === "") {
  //     arr = rows.slice(0, -1);
  //   } else {
  //     arr = rows;
  //   }
  //   let items = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     items.push(arr[i].item);
  //   }
  //   window.sessionStorage.setItem("list", JSON.stringify(items));
  // }

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
              <img id='addPosterToList' src={row.item["poster"]} style={{height :100}}></img>
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
                <img id='addPosterToList' src={row.item["poster"]} style={{height :100}}></img>
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

// get list data from form
const [form, setForm] = useState({
  name: "",
  description: "",
  lists: [],
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

    let sizes_arr = JSON.parse(list.list); 
   
    let rows_arr = [];
    rows_arr.push({
      id: 1,
      item: {title: "", poster: ""}
    })
    for (let i = 0; i < sizes_arr.length; i++) {
      rows_arr.push({
        id: i+2,
        item: sizes_arr[i]
      })
    }
    console.log(rows_arr);
      
    setRows(rows_arr);
    setTableData(generateTable());
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

  const editedList = {
    name: form.name,
    description: form.description,
    list: [],
  };
  editedList.list = JSON.stringify(items);

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
    {/* <div class="container"><TextField fullWidth id="outlined-basic" label="ADD FILMS..." variant="outlined" /></div>  */}
    <div class="container"><Search/></div>
    <div class="container">
      <Grid container>

        <Grid item lg={12} justifyContent="center" display="flex">
          <Card>
            <TableContainer>
              {tableData} {/* this variable will change to contain all data */}
              <Stack direction={"row"}>
              </Stack>
            </TableContainer>
          </Card>
        </Grid>
        </Grid>
      </div>
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

