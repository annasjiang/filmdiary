import React, { useState } from "react";
import defaultposter from './defaultposter.jpeg';
import * as ReactDOM from 'react-dom';
import Search from "./search";
import Movies from "./movies";

import classes from "./movie.module.css";
import { truncStr } from "./utils";

const MovieCard = props => {
  const { title, poster_path, id, release_date} = props.item;
  const poster = poster_path != null ? `http://image.tmdb.org/t/p/w185${poster_path}` : defaultposter;
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
      // selectedTitle = title;
      document.getElementById('searchbar').value = title;

      var input = document.getElementById('searchbar');
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      nativeInputValueSetter.call(input, title);
      var inputEvent = new Event('input', { bubbles: true});
      input.dispatchEvent(inputEvent);

      // triggerInput('searchbar', title);
      // const event = new Event('input');
      // document.getElementById('searchbar').dispatchEvent(event);
      // document.getElementById('searchbar').change({target: {value: title}});
      // document.getElementById('searchbar').onChange();
      document.getElementById('name').value = title;
      document.getElementById('poster').src = poster;

      // document.getElementById('searchresults').style.visibility = "hidden";
      ReactDOM.render(<Movies />, document.querySelector('#searchresults'));
    }}>
      <td class="col-sm-1"><img src={poster} style={{height: 80}}></img></td>
      <td><b>{title}</b> <p class="text-muted">({year})</p></td>
    </tr>
  );

};

export default MovieCard;
