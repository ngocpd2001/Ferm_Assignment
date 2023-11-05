import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
}

export default function Dashboard({ setFilmId, loading, setLoading }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
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
  const deleteFilm = (id) => {
    fetch(`https://65433c2901b5e279de200b71.mockapi.io/db/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setValue(!value);
        toast("Wow so easy!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(
    () => {
      setLoading(false);
      setIsLogin(JSON.parse(localStorage.getItem("userLogin")));
    },
    // eslint-disable-next-line
    [loading]
  );

  const onUpdate = (id) => {
    setFilmId(id);
    navigate("/addFilm");
  };

  function handleCloseModal() {
    setSelectedFilm(null);
    setIsModalOpen(false);
  }

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
                    alt={film.title}
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
                      style={{ color: "black" }}
                    >
                      price: {film.price}
                    </p>
                    <div className="d-flex justify-content-center mt-3">
                      {isLogin && (
                        <>
                          <Link
                            to="/updateFilm"
                            onClick={() => onUpdate(film.id)}
                          >
                            <button className="btn btn-outline-dark w-100 confirmButton">
                              Update
                            </button>
                          </Link>
                          <Link
                            to="#"
                            onClick={() => {
                              if (window.confirm("Delete the item?")) {
                                deleteFilm(film.id);
                              }
                            }}
                            style={{ padding: "0 10px" }}
                          >
                            <button className="btn btn-outline-dark w-100 closeButton">
                              Delete
                            </button>
                          </Link>
                        </>
                      )}
                      <div>
                        <Link to={`http://localhost:3000/detail/${film.id}`}>
                          <button className="btn btn-outline-dark w-100">
                            Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={{ content: { width: 500, height: 500 } }}
        >
          {selectedFilm && (
            <div>
              <h2>{selectedFilm.title}</h2>
              <p>{selectedFilm.img}</p>
              <p>{selectedFilm.nation}</p>
              <p>{selectedFilm.year}</p>
              <p>{selectedFilm.desc}</p>
              <p>{selectedFilm.clip}</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          )}
        </Modal>
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
          <button className="btn btn-danger " onClick={toggleDarkMode}>
            {isDarkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
