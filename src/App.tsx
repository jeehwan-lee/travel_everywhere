import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hotel from "./pages/Hotel";
import HotelList from "./pages/HotelList";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
