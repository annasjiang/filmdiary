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

      document.getElementById('addFilmToList').value = title;
      document.getElementById('addYearToList').value = year;
      document.getElementById('addFilmIdToList').value = id;
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
