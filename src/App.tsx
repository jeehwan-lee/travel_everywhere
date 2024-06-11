/** @jsxImportSource @emotion/react */

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
import Test from "./pages/Test";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { css } from "@emotion/react";
import LeftMenubar from "./components/shared/LeftMenubar";

function App() {
  useLoadKaKao();
  return (
    <div>
      <BrowserRouter>
        <AuthGuard>
          <Navbar />
          <div css={bodyStyles}>
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel/:id" element={<Hotel />} />
              <Route path="/register/Hotel" element={<RegisterHotel />} />
              <Route path="/register/Room" element={<RegisterRoom />} />
              <Route path="/test" element={<Test />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <LeftMenubar>
                      <Profile />
                    </LeftMenubar>
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
                    <LeftMenubar>
                      <ReservationDone />
                    </LeftMenubar>
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <LeftMenubar>
                      <ReservationList />
                    </LeftMenubar>
                  </PrivateRoute>
                }
              />
              <Route
                path="/register/list"
                element={
                  <PrivateRoute>
                    <LeftMenubar>
                      <RegisterHotelList />
                    </LeftMenubar>
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </AuthGuard>
      </BrowserRouter>
    </div>
  );
}

const bodyStyles = css`
  max-width: 1060px;
  margin: 0 auto;
`;

export default App;
