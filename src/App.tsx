import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "./components/auth/AuthGuard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/shared/Navbar";
import useLoadKaKao from "./hooks/useLoadKaKao";
import Hotel from "./pages/Hotel";
import HotelList from "./pages/HotelList";
import Profile from "./pages/Profile";
import RegisterHotel from "./pages/RegisterHotel";
import Register from "./pages/RegisterHotel";
import RegisterHotelList from "./pages/RegisterHotelList";
import RegisterList from "./pages/RegisterHotelList";
import RegisterRoom from "./pages/RegisterRoom";
import Reservation from "./pages/Reservation";
import ReservationDone from "./pages/ReservationDone";
import ReservationList from "./pages/ReservationList";
import Schedule from "./pages/Schedule";
import LikePage from "./pages/settings/Like";
import SettingPage from "./pages/settings/Setting";
import Signin from "./pages/Signin";
import Test from "./pages/Test";
import Login from "./pages/Login";

function App() {
  useLoadKaKao();
  return (
    <div
      style={{
        width: "786px",
        margin: "0 auto",
        backgroundColor: "var(--white)",
        boxShadow: "0 14px 28px var(--gray500)",
      }}
    >
      <BrowserRouter>
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/register/Hotel" element={<RegisterHotel />} />
            <Route path="/register/Room" element={<RegisterRoom />} />
            <Route path="/test" element={<Test />} />
            <Route path="/signin" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings/like"
              element={
                <PrivateRoute>
                  <LikePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <PrivateRoute>
                  <Schedule />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation"
              element={
                <PrivateRoute>
                  <Reservation />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/done"
              element={
                <PrivateRoute>
                  <ReservationDone />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/list"
              element={
                <PrivateRoute>
                  <ReservationList />
                </PrivateRoute>
              }
            />
            <Route
              path="/register/list"
              element={
                <PrivateRoute>
                  <RegisterHotelList />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </div>
  );
}

export default App;
