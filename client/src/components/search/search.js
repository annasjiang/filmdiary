import React, { Component } from 'react';
import axios from 'axios';

import Movies from './movies';
import { search } from './utils';

class Search extends Component {
  state = {
    movies: null,
    loading: false,
    value: ''
  };

  search = async val => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    const movies = await res.data.results;

    this.setState({ movies, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderMovies() {
    let movies = <h3>no matches</h3>;
    if (this.state.movies) {
      movies = <Movies list={this.state.movies} />;
    }

    return movies;
  }

  render() {
    return (
      <div>
      	<div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
        <input
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Search Here"
        />
        {this.renderMovies}
      </div>
	  </div>
    );
  }
}

export default Search;