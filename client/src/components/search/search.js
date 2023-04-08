import React, { Component } from 'react';
import axios from 'axios';

import Movies from './movies';
import TextField from '@mui/material/TextField';

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

  onClickHandler = async e => {
    this.setState({ value: document.getElementById('name-hidden').value });
  };

  get renderMovies() {
    if (this.state.movies) {
      return <Movies list={this.state.movies} />;
    }
  }

  render() {
    return (
      <div style={{margin: 0}}>
      	{/* <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}> */}
        {/* <input
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          placeholder="Search Here"
        /> */}
        <TextField
          fullWidth
          id="searchbar"
          variant="outlined" 
          value={this.state.value}
          onChange={e => this.onChangeHandler(e)}
          onClick={(e) => {
            this.onClickHandler(e);
            // allow search again
            if (document.getElementById('searchresults')) {
              document.getElementById('searchresults').style.visibility = "visible";
            }           
          }}
          placeholder="Search for Films..."
          required
          size="small"
          autoComplete='off'
        />
        <div>{this.renderMovies}</div>
      </div>
	  // </div>
    );
  }
}

export default Search;