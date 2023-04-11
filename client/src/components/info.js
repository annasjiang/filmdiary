import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import defaultposter from './search/defaultposter.jpeg';
import './info.css';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from "@mui/system";

import Carousel from 'react-grid-carousel';

const themeCastButtons = createTheme({      
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

const StyledTabPanel = styled("div")({
    "& .MuiBox-root": {
      paddingTop: 10,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  });

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
    <StyledTabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
    </StyledTabPanel>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function Info() {
    // for tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const params = useParams();

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [tagline, setTagline] = useState("");
    const [overview, setOverview] = useState("");
    const [poster, setPoster] = useState("");
    const [runtime, setRuntime] = useState("");
    const [director, setDirector] = useState([]);
    const [cast, setCast] = useState([{
        cast_id: "",
        actor: "",
        character: "",
    }]);
    const [crew, setCrew] = useState([{
        crew_id: "",
        name: "",
        job: "",
    }]);
    const [genres, setGenres] = useState([{
        genre_id: "",
        genre: "",
    }]);
    const [keywords, setKeywords] = useState([{
        keyword_id: "",
        keyword: "",
    }]);
    const [recs, setRecs] = useState([{
        rec_id: "",
        title: "",
        poster: "",
    }]);

    useEffect(() => {
        async function fetchData() {
            const filmid = params.id.toString();
            const info = await axios(
                `https://api.themoviedb.org/3/movie/${filmid}?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US`
            )

            setTitle(info.data.title);
            setYear(info.data.release_date.substring(0, 4));
            setTagline(info.data.tagline.toUpperCase());
            setOverview(info.data.overview);
            const posterPath = info.data.poster_path != null ? `http://image.tmdb.org/t/p/original${info.data.poster_path}` : defaultposter
            setPoster(posterPath);
            setRuntime(info.data.runtime);

            const genreArr = [];
            for (let b = 0; b < info.data.genres.length; b++) {
                genreArr.push({genre_id: info.data.genres[b].id, genre: info.data.genres[b].name})
            }
            setGenres(genreArr);

            const credits = await axios(
                `https://api.themoviedb.org/3/movie/${filmid}/credits?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US`
            );

            const castArr = [];
            for (let i = 0; i < credits.data.cast.length; i++) {
                castArr.push({cast_id: credits.data.cast[i].cast_id, actor: credits.data.cast[i].name, character: credits.data.cast[i].character})
            }
            setCast(castArr);

            const crewArr = [];
            for (let a = 0; a < credits.data.crew.length; a++) {
                crewArr.push({crew_id: credits.data.crew[a].id, name: credits.data.crew[a].name, job: credits.data.crew[a].job})
            }
            setCrew(crewArr);

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

            const keywords = await axios(
                `https://api.themoviedb.org/3/movie/${filmid}/keywords?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US`
            );
            const keywordArr = [];
            for (let k = 0; k < keywords.data.keywords.length; k++) {
                keywordArr.push({keyword_id: keywords.data.keywords[k].id, keyword: keywords.data.keywords[k].name});
            }
            setKeywords(keywordArr);

            const recFetch = await axios(
                `https://api.themoviedb.org/3/movie/${filmid}/similar?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US`
            );
            const recArr = [];
            for (let i = 0; i < recFetch.data.results.length; i++) {
              const posterPath = recFetch.data.results[i].poster_path != null ? `http://image.tmdb.org/t/p/w185${recFetch.data.results[i].poster_path}` : defaultposter
              recArr.push({
                rec_id: recFetch.data.results[i].id, 
                title: recFetch.data.results[i].title, 
                poster: posterPath
              })
            }
            setRecs(recArr);
        }
        
        
        fetchData();
        return;
    }, []);

    const generateRecs = () => {
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
              {recs.map((film) => (
                <Carousel.Item key={film.rec_id}>
                  <Tooltip 
                      title={film.title} 
                      arrow 
                      placement="bottom" 
                      >
                        <a href={`/info/${film.rec_id}`}>
                          <img width="145px" src={film.poster} style={{paddingBottom: 10}} alt="poster"/>
                        </a>
                  </Tooltip>
                  </Carousel.Item>
              ))}
          </Carousel>
      );
    }

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
                            style={{minWidth: 0, margin: 5, paddingLeft: 10, paddingRight: 10}}
                            sx={{color: '#64748B', backgroundColor: '#f2f2f2'}}
                        >{cast.actor}</Button>
                    </Tooltip>
                    </ThemeProvider>
                ))}
            </div>
        );
    }

    const generateCrew = () => {
        return (
            <div id="crewList">
                {crew.map((crew) => (
                    <ThemeProvider theme={themeCastButtons}>
                    <Tooltip 
                        title={crew.job} 
                        arrow 
                        placement="top" 
                        key={crew.crew_id}>
                        <Button 
                            size="small" 
                            style={{minWidth: 0, margin: 5, paddingLeft: 10, paddingRight: 10}}
                            sx={{color: '#64748B', backgroundColor: '#f2f2f2'}}
                        >{crew.name}</Button>
                    </Tooltip>
                    </ThemeProvider>
                ))}
            </div>
        );
    }

    const generateGenres = () => {
        return (
            <div id="keywordsList">
                {genres.map((genre) => (
                    <ThemeProvider theme={themeCastButtons}>
                        <Button 
                            size="small" 
                            style={{minWidth: 0, margin: 5, paddingLeft: 10, paddingRight: 10}}
                            sx={{color: '#64748B', backgroundColor: '#f2f2f2'}}
                            key={genre.genre_id}
                        >{genre.genre}</Button>
                    </ThemeProvider>
                ))}
            </div>
        );
    }

    const generateKeywords = () => {
        return (
            <div id="keywordsList">
                {keywords.map((keyword) => (
                    <ThemeProvider theme={themeCastButtons}>
                        <Button 
                            size="small" 
                            style={{minWidth: 0, margin: 5, paddingLeft: 10, paddingRight: 10}}
                            sx={{color: '#64748B', backgroundColor: '#f2f2f2'}}
                            key={keyword.keyword_id}
                        >{keyword.keyword}</Button>
                    </ThemeProvider>
                ))}
            </div>
        );
    }

    const ReadMore = ({ children }) => {
        const text = children;
        const needReadMore = text.length > 250;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
          setIsReadMore(!isReadMore);
        };
        return (
            needReadMore ? (
            <p className="text">
                {isReadMore ? text.slice(0, 250) : text}
                <span onClick={toggleReadMore} className="read-or-hide" style={{color: '#1976d2', cursor: 'pointer'}}>
                {isReadMore ? "...read more" : " show less"}
                </span>
            </p> ) : (
                <p>{text}</p>
            )
        );
      };

    return (
      <div style={{marginTop: 100, marginLeft: 300, marginRight: 300}}>
        <div className="container">
            <h3 style={{display: "inline", marginRight: 10}}>{title}</h3>
            <p className="text-muted" style={{fontSize: 22, display: "inline"}}>({year})</p>
            <p>Dir. {director} • {runtime} min</p>
            <div className="row">
                <div className="col-4 nopadding">
                    <img src={poster} style={{width: 300, paddingBottom: 10}} className="img-fluid" alt="poster"/>
                </div>
                <div className="col">
                    <h6>{tagline}</h6>
                    <p><ReadMore>{overview}</ReadMore></p>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="CAST" {...a11yProps(0)} style={{ minWidth: 0}}/>
                        <Tab label="CREW" {...a11yProps(1)} style={{ minWidth: 0}}/>
                        <Tab label="GENRES" {...a11yProps(2)} style={{ minWidth: 0}}/>
                        <Tab label="KEYWORDS" {...a11yProps(3)} style={{ minWidth: 0}}/>
                    </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {generateCast()}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {generateCrew()}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {generateGenres()}
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        {generateKeywords()}
                    </TabPanel>
                </div>
            </div>
        </div>
        <div style={{paddingBottom: 20}}>
            <h5 style={{ paddingLeft: 18, paddingTop: 20 }}>Similar to {title}</h5>
            {generateRecs()}
        </div>
      </div>

    );
  }