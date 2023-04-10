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


  return (
    <div className="table-container" style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3 style={{paddingBottom: 10}}>Discover</h3>
      <div>
        <h5 style={{paddingLeft: 18}}>Trending</h5>
        {generateTrending()}
        <h5 style={{paddingLeft: 18, paddingTop: 20}}>Recommendations</h5>
        <p>// TODO</p>
      </div>
    </div>
  );
}
