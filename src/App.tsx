import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "./components/auth/AuthGuard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/shared/Navbar";
import useLoadKaKao from "./hooks/useLoadKaKao";
import Hotel from "./pages/Hotel";
import HotelList from "./pages/HotelList";
import Profile from "./pages/Profile";
import LikePage from "./pages/settings/Like";
import SettingPage from "./pages/settings/Setting";
import Signin from "./pages/Signin";
import Test from "./pages/Test";

function App() {
  useLoadKaKao();
  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signin" element={<Signin />} />
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
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

export default App;
