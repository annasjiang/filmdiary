import React, { Component } from 'react';
import axios from 'axios';

const apikey = "37e7a5cb2b4f66257a0b6632a59060a5";

export default class Search extends Component {

	constructor(props) {
		super(props);


		this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getMovieSearch = this.getMovieSearch.bind(this);
		this.addToFav = this.addToFav.bind(this);
		this.getGenres();

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
			<div key={movieItem.id} className="movieContent mx-5">
				{(movieItem.poster_path!=null)?
					(<div className="poster">
						<img src={"https://image.tmdb.org/t/p/w185"+movieItem.poster_path+""} alt={movieItem.title}/>
					</div>):
					(<div className="poster"/>)
				}
				<div className="movieData">
					<span>
						<span style={{fontSize:'2em'}}>{movieItem.title}  </span>
						<br/>
						<span style={{fontStyle: "italic", color: "grey", fontSize:"1.25em"}}>{movieItem.genre_ids.map(gId =>{
							var genre = ""
							this.genres.forEach(function(value){
								if (value.id === gId) {
									genre = value.name;
								}
							});
							return genre+" "
						})}</span>
					</span><br/>
					<p>{movieItem.overview}</p>
					<br/>
					<button onClick={this.addToFav} id={movieItem.id} type="button" className="btn, btn-primary">Add to Favorites</button>
				</div>
			</div>);
			return list
		}
	}

	async addToFav(e) {
		e.preventDefault();
		console.log(`id added to favourites: ${e.target.id}`);
		await fetch('https://api.themoviedb.org/3/movie/'+ e.target.id +'?api_key='+ apikey +'&language=en-US')
			.then(response=>response.json())
			.then(function(data) {
				if(data["status_code"]) {
					alert("error" + data["status_code"] + ": " + data["status_message"]);
				}
				else
				{
					const newMovie = {
						_id: data.id,
						title: data.title,
						overview: data.overview,
						poster_path: data.poster_path,
						genres: data.genres,
					};

					axios.post('http://localhost:4000/movies/add', newMovie)
						.then(res => console.log(res.data));
				}
		});
	}

	render() {
		return (
			<div style={{padding:10}}>
				<div className="searchbar mx-3">
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
				{this.getMovieSearch()}
				<br/><br/><br/>
			</div>

		);
	}
}
// // import React, { Component } from 'react';
// import axios from 'axios'
// import './search.css'
// import Grid from '../grid/grid'
// import LoadMore from '../loadMore/loadMore'

// import React, { useState } from "react";


// const Search = (props) => {
//   const [searchValue, setSearchValue] = useState("");
  
//   const handleSearchInputChanges = (e) => {
//     setSearchValue(e.target.value);
//   }

//   const resetInputField = () => {
//     setSearchValue("")
//   }

//   const callSearchFunction = (e) => {
//     e.preventDefault();
//     props.search(searchValue);
//     resetInputField();
//   }

//   return (
//       <form className="search">
//         <input
//           value={searchValue}
//           onChange={handleSearchInputChanges}
//           type="text"
//         />
//         <input onClick={callSearchFunction} type="submit" value="SEARCH" />
//       </form>
//     );
// }

// export default Search;
// // class Search extends Component{

// //     constructor(props){
// //         super(props)
// //         this.state={
// //             movies: [],
// //             searchTerm: "",
// //             currentPage: 1,
// //             loading: false,
// //             noResults: false,
// //             server: process.env.REACT_APP_SERVER_URL || ''
// //         }
// //     }

// //     preformSearch = (searchTerm, pageNum) =>{
// //         // https://developers.themoviedb.org/3/

// //         this.setState({noResults: false})
// //         this.setState({loading: true})
// //         const URL = this.state.server+`/api/movies/search/${searchTerm}/${pageNum}`
        
// //         axios.get(URL)
// //         .then((response) => {
// //             this.setState({
// //                 movies: response.data,
// //                 pageNum: this.state.pageNum+1,
// //                 loading: false
// //             })

// //             if (response.data.length === 0 && searchTerm !== ""){
// //                 this.setState({noResults: true})
// //             }
// //         })
// //         .catch(err =>{
// //             console.log(err)
// //         });
// //     }

// //     appendSearch = (searchTerm, pageNum) =>{
// //         // https://developers.themoviedb.org/3/

// //         this.setState({noResults: false})
// //         this.setState({loading: true})

// //         const URL = this.state.server+`/api/movies/search/${searchTerm}/${pageNum}`
        
// //         axios.get(URL)
// //         .then((response) => {
// //             response.data.forEach(element => {
// //                 this.state.movies.push(element)
// //             });
// //             this.setState({loading: false})

// //             if (response.data.length === 0 && searchTerm !== ""){
// //                 this.setState({noResults: true})
// //             }
// //         })
// //         .catch(err =>{
// //             console.log(err)
// //         });
// //     }

// //     changeHandler = (event) => {
// //         this.setState({currentPage: 1, searchTerm: event.target.value}, ()=>{
// //             if(this.state.searchTerm !== ""){
// //                 this.preformSearch(this.state.searchTerm, 1)
// //             }   
// //         })
// //     }

// //     clickHandler = () =>{
// //         this.setState({currentPage: this.state.currentPage+1}, () =>{
// //             this.appendSearch(this.state.searchTerm, this.state.currentPage)
// //         })
// //     }

// //     render() {
// //         if (this.state.noResults){
// //             return(
// //                 <div className='container'>
// //                     <input type="text" className="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
// //                     <br/>
// //                     <Grid movies={this.state.movies}/>
// //                     <div className="alert alert-primary" role="alert">
// //                         No results found
// //                     </div>
// //                 </div>  
// //             )
// //         }
// //         else{
// //             if (this.state.loading || this.state.searchTerm===""){
// //                 return(
// //                     <div className='container-lg'>
// //                         <input type="text" className="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
// //                         <br/>
// //                         <Grid movies={this.state.movies}/>
// //                     </div>  
// //                 );
// //             }
// //             else{
// //                 return(
// //                     <div className='container-lg'>
// //                         <input type="text" className="search" placeholder="Search for a movie" onChange={this.changeHandler}/>
// //                         <br/>
// //                         <Grid movies={this.state.movies}/>
// //                         <LoadMore text='Load More' onClick={this.clickHandler}/>
// //                     </div>  
// //                 );
// //             }
// //         }  
// //     }
// // }

// // export default Search