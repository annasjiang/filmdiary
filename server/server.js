const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/review"));
app.use(require("./routes/list"));

const {spawn} = require('child_process');

const PythonShell = require('python-shell');

app.get('/', (res) => {
  
  // PythonShell.run('pymongo_get_database.py').then(res => {
  //   console.log(`calling script`);
  // });

  var dataToSend;
  // spawn new child process to call the python script
  const child = spawn('python3', ['pymongo_get_database.py']);
  console.log(`calling script`);
  // collect data from script
  child.stdout.on('data', function (data) {
   console.log('sending...');
   dataToSend = data.toString();
  });
  child.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.send(dataToSend)
});
})

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});