import React, { useState } from "react";
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
  
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
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
      </div>
    </div>
    
  );
};

export default App;
