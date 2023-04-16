const express = require("express");

// reviewRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /review.
const reviewRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the reviews.
reviewRoutes.route("/review").get(function (req, res) {
  let db_connect = dbo.getDb("filmdiary");
  db_connect
    .collection("reviews")
    .find({})
    .sort( { "date": -1, "_id": -1 } )
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single review by id
reviewRoutes.route("/review/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("reviews")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new review.
reviewRoutes.route("/review/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    year: req.body.year,
    review: req.body.review,
    date: req.body.date,
    rating: req.body.rating,
    poster: req.body.poster,
    filmid: req.body.filmid,
  };
  db_connect.collection("reviews").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
  // db_connect
  // .collection("recs")
  // .find({})
  // .toArray(function (err, result) {
  //   if (err) throw err;
  //   res.json(result);
  // });
});

// This section will help you update a review by id.
reviewRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      year: req.body.year,
      review: req.body.review,
      date: req.body.date,
      rating: req.body.rating,
      poster: req.body.poster,
      filmid: req.body.filmid,
    },
  };
  db_connect
    .collection("reviews")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a review
reviewRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("reviews").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    // console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help you get recommendations based on reviews
reviewRoutes.route("/recommendations").get(function (req, res) {
  let db_connect = dbo.getDb("filmdiary");
  db_connect
    .collection("recs")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = reviewRoutes;
