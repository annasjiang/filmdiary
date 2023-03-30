import React from "react";

import Movie from "./movie";
import classes from "./movies.module.css";

const Movies = ({ list }) => {
  let cards = "";

  if (list) {
    cards = list.map((m, i) => <Movie key={i} item={m}/>);
  }

  return (
    <div id="searchresults">
      <table className="table table-hover">
      <tbody>
        <div className={classes.searchresults}>{cards}</div>
      </tbody>
      </table>
    </div>
  );
};

export default Movies;
