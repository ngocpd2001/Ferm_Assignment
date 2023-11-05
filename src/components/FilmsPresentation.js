import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
}

export default function FilmPresentation({ setFilmId, loading, setLoading }) {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [state, setState] = useState(null);
  const [value, setValue] = useState(false);
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    const getAccountInfo = async () => {
      axios({
        method: "GET",
        url: "https://65433c2901b5e279de200b71.mockapi.io/db",
      })
        .then((res) => {
          setState(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAccountInfo();
    // eslint-disable-next-line
  }, [value]);

  useEffect(
    () => {
      setLoading(false);
      setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
    },
    // eslint-disable-next-line
    [loading]
  );

  return (
    <div className={`${isDarkMode ? "bg-dark text-black" : "text-white"}`}>
      <div className="container">
        <div className="row">
          {state &&
            state.map((film) => (
              <div key={film.id} className="col-md-4 col-sm-6 mb-5">
                <div className="card shadow">
                  <img
                    className="card-img-top"
                    src={film.image}
                    alt={film.name}
                    height="300"
                  />
                  <div className="card-body">
                    <h5
                      className="card-title text-center mb-3"
                      style={{ color: "black" }}
                    >
                      {film.name}
                    </h5>
                    <p
                      className="card-text text-center font-weight-bold"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Price: {""}
                      <span style={{ fontWeight: "normal" }}>{film.price}</span>
                    </p>
                    <p
                      className="card-text text-center font-weight-bold"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Rating: {""}
                      <span style={{ fontWeight: "normal" }}>
                        {film.rating}
                      </span>
                    </p>
                    <div className="d-flex justify-content-center mt-3">
                      <Link to={`detail/${film.id}`}>
                        <button className="btn btn-outline-dark w-100">
                          Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-danger "
            onClick={toggleDarkMode}
            style={{ marginBottom: "10px" }}
          >
            {isDarkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
