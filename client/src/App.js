<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useReducer, useEffect } from "react";
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Button, Modal } from 'react-bootstrap';

// We use Route in order to define the different routes of our application
import { Route, Routes, BrowserRouter, Switch} from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";

import Diary from "./components/diary";
import Edit from "./components/edit";
import Create from "./components/create";
<<<<<<< HEAD
import Review from "./components/review";

import Lists from "./components/lists";
import EditList from "./components/editList";
import CreateList from "./components/createList";
import ViewList from "./components/viewList";

import Login from "./components/login";

const App = () => {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
=======
import Search from "./components/search/search";
import MoviePage from "./components/moviePage/moviePage";


const App = () => {   
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
<<<<<<< HEAD
      <Routes>
        <Route exact path="/" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/review/:id" element={<Review />} />

        <Route path="/lists" element={<Lists />} />
        <Route path="/editlist/:id" element={<EditList />} />
        <Route path="/createlist" element={<CreateList />} />
        <Route path="/list/:id" element={<ViewList />} />
      </Routes>
=======
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/moviePage" element={<MoviePage />} />
          {/* <Route path="/movies/:id" render={(props) => <MoviePage {...props}/>} /> */}
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
>>>>>>> 67a542c6e0fdb9406b1a924abe3ea7337861fffd
      </div>
    </div>
    
  );
};

export default App;
