import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid } from "@material-ui/core";

const apikey = "37e7a5cb2b4f66257a0b6632a59060a5";

export default class Search extends Component {

	constructor(props) {
		super(props);

		this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getMovieSearch = this.getMovieSearch.bind(this);
		this.moreInfo = this.moreInfo.bind(this);
		this.getGenres = this.getGenres.bind(this);

		this.state = {
			search_value: '',
			search_results: [],
		}
	}

	genres;

	async getGenres() {
		var genreList = [];
		await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key="+ apikey +"&language=en-US")
			.then(response => response.json())
			.then(function(data){
				genreList = data["genres"];
			});
		this.genres = genreList;
	}

	onChangeSearchValue(e) {
		this.setState ({
			search_value: e.target.value
		});
	}

	async onSubmit(e) {
		e.preventDefault();

		var searchList = [];
		var searchValue = this.state.search_value

		console.log(`Search Made for: ${searchValue}`);

		await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apikey + "&language=en-US&query=" + searchValue + " &page="+ 1 + "&include_adult=false")
			.then(response=>response.json())
			.then(function(data) {
				if(data["status_code"]) {
					alert("error");
				}
				else
				{
					searchList = data.results;
				}
		});

		this.setState({
			search_value: '',
			search_results: searchList,
		});
	}

	getMovieSearch() {
		if (this.state.search_results.length === 0)
		{
			return <div className="noResult mx-5"><br/><p>No results Found</p></div>;
		}
		else
		{
			var list = this.state.search_results.map(movieItem =>
			<div key={movieItem.id} className="movieContent mx-5" display="flex" justifyContent="center" alignItems="center">
				{(movieItem.poster_path!=null)?
					(<div className='container-fluid movie-app'>
						<div className='row d-flex align-items-center mt-4 mb-4'>
								<Link to={'/moviePage'}>
									<img src={"https://image.tmdb.org/t/p/w185"+movieItem.poster_path+""} alt={movieItem.title}/>
									<h3>{movieItem.title}</h3>
								</Link>
						</div>
					</div>):
					(<div className="poster"/>)
				}
			</div>);
			return list
		}	
	}

	render() {
		return (
			<div style={{padding:10}}>
				<div className="searchbar mx-10">
					<form className="form-inline" onSubmit={this.onSubmit}>
						<h3 className="mt-2">Search Movies:</h3>
						<div className="form-group">
							<input	type="text"
									className="form-control mx-2"
									value={this.state.search_value}
									onChange={this.onChangeSearchValue}
									/>
						</div>
						<div className="form-group">
							<label><button type="submit" className="btn btn-primary" >Search</button></label>
						</div>
						</form>
				</div>
				<hr className="myHR"/>
				<br/>
				<Grid container rowSpacing={1} columnSpacing={1} justifyContent="space-evenly" alignItems="flex-start">
					{this.getMovieSearch()}
				</Grid>
				<br/><br/><br/>
			</div>

		);
	}
}