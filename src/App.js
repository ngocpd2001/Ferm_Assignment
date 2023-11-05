import React, { useState } from "react";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Detail from "./components/Detail";
import News from "./components/News";
import AddFilm from "./components/AddFilm";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import UpdateFilm from "./components/UpdateFilm";
function App() {
  const [filmId, setFilmId] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <Navigation loading={loading} setLoading={setLoading} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              setFilmId={setFilmId}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              setFilmId={setFilmId}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/signIn"
          element={<LogIn loading={loading} setLoading={setLoading} />}
        />
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route
          path="/addFilm"
          element={<AddFilm filmId={filmId} setFilmId={setFilmId} />}
        ></Route>
        <Route
          path="/updateFilm"
          element={<UpdateFilm filmId={filmId} setFilmId={setFilmId} />}
        ></Route>
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
