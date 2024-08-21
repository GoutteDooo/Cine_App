import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Crushes from "./pages/Crushes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crushes" element={<Crushes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
