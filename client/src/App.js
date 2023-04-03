import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate} from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";

import Diary from "./components/diary";
import Edit from "./components/edit";
import Create from "./components/create";
import Review from "./components/review";
import Search from "./components/search/search";

import Lists from "./components/lists";
import EditList from "./components/editList";
import CreateList from "./components/createList";
import ViewList from "./components/viewList";

import Login from "./components/login";
import Register from "./components/register";
import Reset from "./components/reset";
import Dashboard from "./components/dashboard";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<Diary />} />
        <Route path="/diary" element={<Diary />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/search" element={<Search />} />
        
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
