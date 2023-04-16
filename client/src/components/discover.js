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

  const [recommendations, setRecommendations] = useState([]);

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
  }, [trending.length]);

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

  // get recs from database
  useEffect(() => {
    async function getRecommendations() {
      // TODO: CHANGE REVIEW TO RECOMMENDATIONS (routes)
      const response = await fetch(`http://localhost:4000/recommendations/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const recommendations = await response.json();
      setRecommendations(recommendations);
    }
    getRecommendations();
    return; 
  }, [recommendations.length]);

  function recommendationList() {
    return recommendations.map((recs) => {
      return (
        <Carousel.Item>
        <Recommendation
          recs={recs}
          key={recs._id}
        />
        </Carousel.Item>
      );
    });
  }

  // TODO: NEED TO CHANGE FIELDS TO MATCH RECC COLLECTION NAMES
  const Recommendation = (props) => (
      <Tooltip 
        title={props.recs.name} 
        arrow 
        placement="bottom">
        <a href={`/info/${props.recs.filmid}`}>
          <img width="145px" src={"http://image.tmdb.org/t/p/w185"+props.recs.poster} style={{paddingBottom: 10}} alt="poster"/>
        </a>
      </Tooltip>
  );

  return (
    <div className="table-container" style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
      <h3 style={{paddingBottom: 10}}>Discover</h3>
      <div>
        <h5 style={{paddingLeft: 18}}>Trending</h5>
        {generateTrending()}
        <h5 style={{paddingLeft: 18, paddingTop: 20}}>Recommendations</h5>
        <Carousel 
        cols={5} 
        rows={1} 
        gap={5} 
        loop 
        showDots={true}
        dotColorActive={'#64748B'}
        hideArrow={false}
        >
          {recommendationList()}
        </Carousel>
      </div>
    </div>
  );
}
