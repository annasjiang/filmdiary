import React, { useState } from "react";
import defaultposter from './defaultposter.jpeg';
import * as ReactDOM from 'react-dom';
import Search from "./search";
import Movies from "./movies";

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

  return (
    <tr onClick={() => {
      // set search bar to official title
      document.getElementById('searchbar').value = title;

      // update the hidden name thing and poster for the form
      document.getElementById('name-hidden').value = title;
      document.getElementById('year-hidden').value = year;
      document.getElementById('poster').src = poster;

      // trigger the onclick function so the title stays
      document.getElementById('searchbar').click();
      document.getElementById('searchbar').dispatchEvent(new Event('click'));

      // hide after selecting search result
      document.getElementById('searchresults').style.visibility = "hidden";
    }}>
      <td class="col-sm-1"><img src={posterthumb} style={{height: 80}}></img></td>
      <td><b>{title}</b> <p class="text-muted">({year})</p></td>
    </tr>
  );

};

export default MovieCard;
