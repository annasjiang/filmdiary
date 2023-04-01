import React, { useState } from "react";
import defaultposter from './defaultposter.jpeg';
import * as ReactDOM from 'react-dom';
import Search from "./search";
import Movies from "./movies";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import deleteicon from "./deleteicon.png";

import classes from "./movie.module.css";
import { truncStr } from "./utils";

const MovieCard = props => {
  const { title, poster_path, id, release_date} = props.item;
  const posterthumb = poster_path != null ? `http://image.tmdb.org/t/p/w185${poster_path}` : defaultposter;
  const poster = poster_path != null ? `http://image.tmdb.org/t/p/original${poster_path}` : defaultposter;

  const year = release_date.substring(0, 4);

  var selectedTitle = React.useRef();

  function triggerInput(enteredName, enteredValue) {
    const input = document.getElementById(enteredName); 
    const lastValue = input.value;
    input.value = enteredValue;
    const event = new Event("input", { bubbles: true });
    const tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
  }

  function deleteRow(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById('buildinglist').deleteRow(i);
  }
  
  function insRow() {
    // console.log('hi');
    var x = document.getElementById('buildinglist');
    var new_row = x.rows[1];
    var len = x.rows.length;
    new_row.cells[0].innerHTML = len;
  
    var inp1 = new_row.cells[1].getElementsByTagName('input')[0];
    inp1.id += len;
    inp1.value = '';
    var inp2 = new_row.cells[2].getElementsByTagName('input')[0];
    inp2.id += len;
    inp2.value = '';
    x.appendChild(new_row);
  }

  return (
    <tr onClick={() => {
      // reset search bar to blank
      document.getElementById('searchbar').value = "";

      // trigger the onclick function so the title stays
      document.getElementById('searchbar').click();
      document.getElementById('searchbar').dispatchEvent(new Event('click'));

      // add film to the list
      
      // var table = document.getElementById("buildinglist");
      // insRow()
      // var table = document.getElementById("buildinglist");

      // // Create an empty <tr> element and add it to the 1st position of the table:
      // var row = table.insertRow(0);

      // // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      // var cell1 = row.insertCell(0);
      // var cell2 = row.insertCell(1);
      // var cell3 = row.insertCell(2);

      // // Add some text to the new cells:
      // cell1.innerHTML = '<img src="' + posterthumb + '"/>';
      // cell1.className = "col-sm-2";
      // document.getElementById("buildinglist").getElementsByTagName("img")[0].style.height="150px";

      // cell2.innerHTML = '<h5>' + title + '</h5> <p className="text-muted">(' + year + ')</p>';
      // cell2.className = "align-middle";

      // cell3.innerHTML = '<input type="image" id="delete" src="https://icons.veryicon.com/png/o/miscellaneous/management-console-icon-update-0318/material-delete.png" onClick="document.getElementById(\'buildinglist\').deleteRow(this.parentNode.parentNode.rowIndex)" />';
      // document.getElementById("delete").style.height="20px";
      // document.getElementById("delete").style.float="right";
      // document.getElementById("delete").style.margin="15px";
      // document.getElementById("delete").style.opacity="60%";
      // // cell3.dangerouslySetInnerHTML = '<IconButton aria-label="delete" onClick="document.getElementById(\'buildinglist\').deleteRow(this.parentNode.parentNode.rowIndex)"><DeleteIcon/></IconButton>';
      // cell3.className = "align-middle";

      document.getElementById('addFilmToList').value = title;
      document.getElementById('addPosterToList').src = posterthumb;
      document.getElementById('addPosterToList').style.height = "100px";
      document.getElementById('addFilmToList').click();
      document.getElementById('addFilmToList').dispatchEvent(new Event('click'));
      
      // hide after selecting search result
      document.getElementById('searchresultsList').style.visibility = "hidden";
    }}>
      <td className="col-sm-1"><img src={posterthumb} style={{height: 80}}></img></td>
      <td><b>{title}</b> <p className="text-muted">({year})</p></td>
    </tr>
  );

};

export default MovieCard;
