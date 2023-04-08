import React from "react";
import defaultposter from './defaultposter.jpeg';

const MovieCard = props => {
  const { title, poster_path, id, release_date} = props.item;
  const posterthumb = poster_path != null ? `http://image.tmdb.org/t/p/w185${poster_path}` : defaultposter;
  const poster = poster_path != null ? `http://image.tmdb.org/t/p/original${poster_path}` : defaultposter;
  const year = release_date.substring(0, 4);

  return (
    <tr onClick={() => {
      // set search bar to official title
      document.getElementById('searchbar').value = title;

      // update the hidden name thing and poster for the form
      document.getElementById('name-hidden').value = title;
      document.getElementById('year-hidden').value = year;
      document.getElementById('filmid-hidden').value = id;
      document.getElementById('poster').src = poster;

      // trigger the onclick function so the title stays
      document.getElementById('searchbar').click();
      document.getElementById('searchbar').dispatchEvent(new Event('click'));

      // hide after selecting search result
      document.getElementById('searchresults').style.visibility = "hidden";
    }}>
      <td class="col-sm-1"><img src={posterthumb} style={{height: 80}} alt="poster"></img></td>
      <td><b>{title}</b> <p class="text-muted">({year})</p></td>
    </tr>
  );
};

export default MovieCard;
