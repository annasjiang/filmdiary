import React from "react";
import defaultposter from './defaultposter.jpeg';

const MovieCard = props => {
  const { title, poster_path, id, release_date} = props.item;
  const posterthumb = poster_path != null ? `http://image.tmdb.org/t/p/w185${poster_path}` : defaultposter;
  const year = release_date.substring(0, 4);

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
      <td className="col-sm-1"><img src={posterthumb} style={{height: 80}} alt="poster"></img></td>
      <td><b>{title}</b> <p className="text-muted">({year})</p></td>
    </tr>
  );

};

export default MovieCard;
