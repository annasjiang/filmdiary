const express = require("express");

// listRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /list.
const listRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the lists.
listRoutes.route("/list").get(function (req, res) {
  let db_connect = dbo.getDb("filmdiary");
  db_connect
    .collection("lists")
    .find({})
    .sort( { "updated": -1 } )
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single list by id
listRoutes.route("/list/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("lists")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new list.
listRoutes.route("/list/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    list: req.body.list,
    updated: req.body.updated,
    thumbnail1: req.body.thumbnail1,
    thumbnail2: req.body.thumbnail2,
    thumbnail3: req.body.thumbnail3,
  };
  db_connect.collection("lists").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a list by id.
listRoutes.route("/updatelist/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      list: req.body.list,
      updated: req.body.updated,
      thumbnail1: req.body.thumbnail1,
      thumbnail2: req.body.thumbnail2,
      thumbnail3: req.body.thumbnail3,
    },
  };
  db_connect
    .collection("lists")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a list
listRoutes.route("/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("lists").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    // console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = listRoutes;
