import React, { Component, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import defaultposter from './search/defaultposter.jpeg';
import './info.css';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeCastButtons = createTheme({      
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default function Info() {
    const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [tagline, setTagline] = useState("");
    const [overview, setOverview] = useState("");
    const [poster, setPoster] = useState("");

    const [director, setDirector] = useState([]);
    const [cast, setCast] = useState([{
        cast_id: "",
        actor: "",
        character: "",
    }]);

    useEffect(() => {
        async function fetchData() {
        const filmid = params.id.toString();
        console.log(filmid);
        const info = await axios(
            `https://api.themoviedb.org/3/movie/${filmid}?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US`
        );
        // console.log(info.data);
        setTitle(info.data.title);
        setYear(info.data.release_date.substring(0, 4));
        setTagline(info.data.tagline.toUpperCase());
        setOverview(info.data.overview);
        const posterPath = info.data.poster_path != null ? `http://image.tmdb.org/t/p/original${info.data.poster_path}` : defaultposter
        setPoster(posterPath);

        const credits = await axios(
            `https://api.themoviedb.org/3/movie/${filmid}/credits?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US`
        );

        const castArr = [];
        for (let i = 0; i < credits.data.cast.length; i++) {
            castArr.push({cast_id: credits.data.cast[i].cast_id, actor: credits.data.cast[i].name, character: credits.data.cast[i].character})
        }
        setCast(castArr);

        const dirArrFilter = credits.data.crew.filter(person => person.job === "Director");
        let dirString = "";
        for (let j = 0; j < dirArrFilter.length; j++) {
            if (j === 0) {
                dirString = dirArrFilter[j].original_name;
            } else {
                dirString = dirString + ", " + dirArrFilter[j].original_name;
            }
        }
        setDirector(dirString);
        }
        
        
        fetchData();
        // fetchCredits();
        return;
    }, []);

    const generateCast = () => {
        return (
            <div id="castList">
                {cast.map((cast) => (
                    <ThemeProvider theme={themeCastButtons}>
                    <Tooltip 
                        title={cast.character} 
                        arrow 
                        placement="top" 
                        key={cast.cast_id}>
                        <Button 
                            size="small" 
                            sx={{color: '#64748B'}}
                        >{cast.actor}</Button>
                    </Tooltip>
                    </ThemeProvider>
                ))}
            </div>
        );
    }

    return (
      <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
        <div className="container">
            <h3 style={{display: "inline", marginRight: 10}}>{title}</h3>
            <p className="text-muted" style={{fontSize: 22, display: "inline"}}>({year})</p>
            <p>Dir. {director}</p>
            <div className="row">
                <div className="col-4 nopadding">
                    <img src={poster} style={{width: 300}} className="img-fluid"/>
                </div>
                <div className="col">
                    <h6>{tagline}</h6>
                    <p>{overview}</p>
                    <br></br>
                    <h6>CAST</h6>
                    <hr style={{
                        background: "#dee2e6",
                        height: "1px",
                        border: "none",
                        marginTop: "0px",
                        marginBottom: "5px",
                    }} />
                    <div id="castList">{generateCast()}</div>
                </div>
            </div>
        </div>
      </div>
    );
  }