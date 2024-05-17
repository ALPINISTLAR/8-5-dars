import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
