import React, { useEffect, useState } from "react";
import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableRow, IconButton,} from "@mui/material";
import blankposter from './poster.jpg';
import './lists.css';

export default function Discover() {
  const [lists, setLists] = useState([]);

  // This method fetches the lists from the database.
  useEffect(() => {
    async function getLists() {
      const response = await fetch(`http://localhost:4000/list/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const lists = await response.json();
      setLists(lists);
    }
    getLists();
    return; 
  }, [lists.length]);

  // This method will delete a list
  async function deleteList(deleteId) {
    await fetch(`http://localhost:4000/${deleteId}`, {
      method: "DELETE"
    });

    const newLists = lists.filter((el) => el._id !== deleteId);
    setLists(newLists);
  }

  // This method will map out the lists on the table
  function listList() {
    return lists.map((list) => {
      return (
        <List
          list={list}
          deleteList={() => deleteList(list._id)}
          key={list._id}
        />
      );
    });
  }

  // get reviews
  const List = (props) => (
    <a href={`/list/${props.list._id}`} style={{ textDecoration: 'none', color: 'black'}}>
    <TableRow> 
      <TableCell class="avatars" style={{width:210}}>
        {/* handle thumbnails */}
        <span class="avatar">
        {
          props.list.thumbnail3 == "" ? 
          (<img src={blankposter} class="img-fluid"/>) : 
          (<img src={props.list.thumbnail3} class="img-fluid"/>)
        }
        </span>
        <span class="avatar">
        {
          props.list.thumbnail2 == "" ? 
          (<img src={blankposter} class="img-fluid"/>) : 
          (<img src={props.list.thumbnail2} class="img-fluid"/>)
        }
        </span>
        <span class="avatar">
        {
          props.list.thumbnail1 == "" ? 
          (<img src={blankposter} class="img-fluid"/>) : 
          (<img src={props.list.thumbnail1} class="img-fluid"/>)
        }
        </span>
      </TableCell>

      <TableCell class="listinfo" style={{width:800}}>
        <b>{props.list.name}</b> <br></br>
        <p class="text-muted">{props.list.description}</p>
      </TableCell>
    </TableRow>
    </a>
  );

  // display reviews
  return (
    <div class="table-container" style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3>Recommendations</h3>
      <div className="parent">
      {/* <Grid container> */}
      {/* <Grid item lg={12} justifyContent="center" display="flex"> */}
        {/* <Card> */}
          {/* <TableContainer>  */}
        <Table className="listtable table table-responsive table-hover" style={{ marginTop: 20, }}>
          <TableBody className="fullWidth">{listList()}</TableBody>
        </Table>
        {/* </TableContainer>  */}
        {/* </Card> */}
      {/* </Grid> */}
      {/* </Grid> */}
      </div>
    </div>
  );
}