var express = require('express')
var router = express.Router()
const axios = require('axios')
require('dotenv').config()

/* API Documentation https://developers.themoviedb.org/3/ */
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = "37e7a5cb2b4f66257a0b6632a59060a5";
//process.env.API_KEY;


router.route('/').get(function(req,res){
    res.send("Welcome to /movies/")
})

/**
 * Get popular movies
 */
router.route('/getpopular/:pageNum').get(function(req,res){
    const URL = `${API_URL}/movie/popular?&api_key=${API_KEY}&page=${req.params.pageNum}`
    
    axios.get(URL)
    .then((response) => {
        res.json(response.data.results)
    })
    .catch(err =>{
        console.log(err)
    });
})

/**
 * Search movies
 */
router.route('/search/:query/:pageNum').get(function(req,res){
    //const URL = `${API_URL}/search/movie?&api_key=${API_KEY}&query=${req.params.query}&page=${req.params.pageNum}`
    const URL = fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apikey + "&language=en-US&query=" + req.params.query + " &page="+ 1 + "&include_adult=false")
    
    axios.get(URL)
    .then((response) => {
        res.json(response.data.results)
    })
    .catch(err =>{
        console.log(err)
    });
})

/**
 * Get a movie given its ID
 */
router.route('/movie/:id').get(function(req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
    .collection("movies")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });

    const URL = `${API_URL}/movie/${req.params.id}?api_key=${API_KEY}`

    axios.get(URL)
    .then((response) => {
        res.json(response.data)
    })
    .catch(err =>{
        console.log(err)
    });

})

module.exports = router