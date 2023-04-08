import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
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
  const [rows, setRows] = useState([
    {
      id: 1,
      item: {title: "", year:"", poster: "", filmid: ""}
    }
  ]);

  const generateTable = () => {
    return (
      <Table className="table-hover">
        <TableBody>
          {rows.map((row) => (
            <a href={`/info/${row.item["filmid"]}`} style={{ textDecoration: 'none', color: 'black'}}>
            <TableRow
              key={row.id}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 } ,
                '&:first-child td, &:first-child th': { borderTop: 1, color: "#dee2e6" }
              }}
            >
              <TableCell component="th" scope="row" id="poster" className="col-sm-1">
                <img id='addPosterToList' src={row.item["poster"]} style={{height :100}} alt="poster"></img>
              </TableCell>
              <TableCell component="th" scope="row" id="name" className="col-sm-10">
                <TextField 
                  id='addFilmToList' 
                  value={row.item["title"]}
                  fullWidth
                  variant="standard"
                  InputProps={{ disableUnderline: true, readOnly: true, style: {fontWeight: 500}}}
                />
                <p id="addYearToList" className="text-muted">({row.item["year"]})</p>
              </TableCell>
            </TableRow> 
            </a>    
          ))}
        </TableBody>
      </Table>
    );
  }
  const [tableData, setTableData] = useState(generateTable());

  useEffect(() => {
    setTableData(generateTable());
  }, [rows])

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
  const [user] = useAuthState(auth);

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
    <div className="container">
    <div className="row">
      <div className="col nopadding">
        <h3>{form.name}</h3>
      </div>
      <div className="col col-1">
        <div className
        ="float-right">
          <ThemeProvider theme={theme}>
            {/* edit/delete button */}
            {user && <Button color="neutral"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >•••</Button>}
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
      </div>
    </div>    
    </div>
    <br></br>
    {
      form.description === "" ? (<></>) : ( 
        <div className="container">
          <p>{form.description}</p> <br></br>
        </div>
      )
    }
    <div>
    <div className="container">
    {/* <Grid container> */}
    {/* <Grid item lg={12} justifyContent="center" display="flex"> */}
      {/* <Card> */}
        {/* <TableContainer> */}
          {tableData} {/* this variable will change to contain all data */}
        {/* </TableContainer> */}
      {/* </Card> */}
    {/* </Grid> */}
    {/* </Grid> */}
    </div>
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
