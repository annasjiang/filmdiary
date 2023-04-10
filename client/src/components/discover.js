import React, { useEffect, useState } from "react";
import axios from 'axios';
import defaultposter from './search/defaultposter.jpeg';
import Carousel from 'react-grid-carousel';
import Tooltip from '@mui/material/Tooltip';

export default function Discover() {
  const [trending, setTrending] = useState([{
    filmid: "",
    title: "",
    poster: "",
  }]);

  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const trendFetch = await axios(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=dbc0a6d62448554c27b6167ef7dabb1b`
        )

        const trendingArr = [];
        for (let i = 0; i < trendFetch.data.results.length; i++) {
          const posterPath = trendFetch.data.results[i].poster_path != null ? `http://image.tmdb.org/t/p/w185${trendFetch.data.results[i].poster_path}` : defaultposter
          trendingArr.push({
            filmid: trendFetch.data.results[i].id, 
            title: trendFetch.data.results[i].title, 
            poster: posterPath
          })
        }
        setTrending(trendingArr);
    }
    fetchData();
    return;
  }, []);

  const generateTrending = () => {
    return (
      <Carousel 
        cols={5} 
        rows={1} 
        gap={5} 
        loop 
        showDots={true}
        dotColorActive={'#64748B'}
        hideArrow={false}
        >
          {trending.map((film) => (
            <Carousel.Item key={film.filmid}>
              <Tooltip 
                  title={film.title} 
                  arrow 
                  placement="bottom" 
                  >
                    <a href={`/info/${film.filmid}`}>
                      <img width="145px" src={film.poster} style={{paddingBottom: 10}} alt="poster"/>
                    </a>
              </Tooltip>
              </Carousel.Item>
          ))}
      </Carousel>
  );
  }

  // recent reviews
  const [reviews, setReviews] = useState([]);

  // This method fetches the reviews from the database.
  useEffect(() => {
    async function getReviews() {
      const response = await fetch(`http://localhost:4000/recentreviews/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const reviews = await response.json();
      setReviews(reviews);
    }
    getReviews();
    return; 
  }, [reviews.length]);


  // This method will map out the reviews on the table
  function reviewList() {
    return reviews.map((review) => {
      return (
        <Review
          review={review}
          key={review._id}
        />
      );
    });
  }

  // get recent reviews
  const Review = (props) => (
    <a href={`/review/${props.review._id}`} style={{ textDecoration: 'none', color: 'black'}}>
    <tr> 
      {/* use thumbnails */}
      <td class="col-md-2">
        {
          props.review.poster === "http://localhost:3000/static/media/defaultposter.71253f31.jpeg" ? 
          (<img src={defaultposter} class="img-fluid" alt="poster"/>) : 
          (<img src={`http://image.tmdb.org/t/p/w185${props.review.poster.substring(34, 250)}`} class="img-fluid" alt="poster"/>)
        }
      </td>
      <td>
        <b style={{display: "inline", marginRight: 5}}>{props.review.name}</b>
        <p className='text-muted' style={{fontSize: 14, display: "inline"}}> ({props.review.year})</p> 
        <br></br>
        <p class="text-muted">watched on {props.review.date}</p>
        {/* <Rating
            name="simple-controlled"
            defaultValue={props.review.rating}
            value={props.review.rating}
            size="small"
            readOnly/> <br></br> */}
        <p>{props.review.review}</p>
      </td>
    </tr>
    </a>
  );


  return (
    <div className="table-container" style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3 style={{paddingBottom: 10}}>Discover</h3>
      <div>
        <h5 style={{paddingLeft: 18}}>Trending</h5>
        {generateTrending()}
        <h5 style={{paddingLeft: 18, paddingTop: 20}}>Recommendations</h5>
        <p>// TODO</p>
        <table className="table table-hover" style={{ marginTop: 20 }}>
          <tbody>{reviewList()}</tbody>
        </table>
      </div>
    </div>
  );
}
