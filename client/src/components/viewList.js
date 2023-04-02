import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import poster from './poster.jpg';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  // Button,
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

import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


export default function ViewList() {
  // table stuff
    // table stuff
    const [rows, setRows] = useState([
      {
        id: 1,
        item: {title: "", year:"", poster: ""}
      }
    ]);
  
    const generateRow = () => {
      return {
          //id: rows.length + 1,
        id: 1,
        item: {title: "", year:"", poster: ""}
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
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" id="poster" className="col-sm-1">
                  <img id='addPosterToList' src={row.item["poster"]} style={{height :100}}></img>
                </TableCell>
                <TableCell component="th" scope="row" id="name" className="col-sm-7">
                  <TextField 
                    sx={{ fontWeight: 500 }}
                    id='addFilmToList'
                    // placeholder={"Add Item"} 
                    // onClick={(e) => handleChange(e, row.id)} 
                    value={row.item["title"]}
                    fullWidth
                    // autoComplete="off"
                    variant="standard"
                    InputProps={{ disableUnderline: true, readOnly: true, style: {fontWeight: 500}}}
                  />
                  <p id="addYearToList" className="text-muted">({row.item["year"]})</p>
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

    // read info from local session and put into table
    // useEffect(() => {
    //   if (window.sessionStorage.getItem("list")) {
    //     let sizes_arr = JSON.parse(form.list);
    //     sizes_arr.push("")
    //     let rows_arr = [];
    //     for (let i = 0; i < sizes_arr.length; i++) {
    //       rows_arr.push({
    //         id: i+1,
    //         item: sizes_arr[i]
    //       })
    //     }
        
    //     setRows(rows_arr);
    //     setTableData(generateTable())
    //   }
    // }, [])

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

  // list info
  const [form, setForm] = useState({
    name: "",
    description: "",
    list: [],
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
      console.log(list.list);

      let sizes_arr = JSON.parse(list.list);
        // sizes_arr.push("")
        let rows_arr = [];
        for (let i = 0; i < sizes_arr.length; i++) {
          rows_arr.push({
            id: i+1,
            item: sizes_arr[i]
          })
        }
        
        setRows(rows_arr);
        setTableData(generateTable());
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // This method will delete a record
  async function deleteList(deleteId) {
      await fetch(`http://localhost:4000/delete/${deleteId}`, {
          method: "DELETE"
      });
      navigate("/lists")
  }

  return (
    <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
    <div class="container">
    <h3>{form.name}
      <div class="float-right">
        <ThemeProvider theme={theme}>
          {/* edit/delete button */}
          <Button color="neutral"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >•••</Button>
        </ThemeProvider>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <Link to={`/editlist/${params.id}`} style={{ textDecoration: 'none', color: 'black'}}>
          <MenuItem>Edit</MenuItem></Link>
          <MenuItem onClick={handleClickOpenAlert}>Delete</MenuItem>
        </Menu> 
      </div>
    </h3>
    </div>
    <br></br>
    <div class="container">
        <p>{form.description}</p> 
    </div> <br></br>
    <div>
    <Grid container>
    <Grid item lg={12} justifyContent="center" display="flex">
      <Card>
        <TableContainer>
          {tableData} {/* this variable will change to contain all data */}
          <Stack direction={"row"}>
            {/* <Button onClick={handleSave}>
              Save
            </Button> */}
          </Stack>
        </TableContainer>
      </Card>
    </Grid>
    </Grid>
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
          Are you sure you want to delete your list?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <ThemeProvider theme={theme}>
        <Button color="neutral" onClick={handleCloseAlert}>Cancel</Button>
        <Button color="error" onClick={() => {
              deleteList(params.id);
          }} autoFocus>
          Delete
        </Button>
      </ThemeProvider>
      </DialogActions>
    </Dialog>    
    </div>
  );
}
