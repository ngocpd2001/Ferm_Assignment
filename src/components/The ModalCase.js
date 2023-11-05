import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ModalCase({ setIsOpen, film }) {
  const staff = useParams();
  const [APIData, setAPIData] = useState([]);
  const getStaffsUrl = `https://65433c2901b5e279de200b71.mockapi.io/db/${staff.id}`;

  useEffect(() => {
    fetch(getStaffsUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, [getStaffsUrl]);
  return (
    <div className="modal-show" onClick={() => setIsOpen(false)}>
      <div
        id="modal1"
        className="modal"
        style={{
          display: "block",
          top: "7%",
          backgroundColor: "rgb(255,182,193)",
        }}
      >
        <div
          className="modal-content"
          style={{ backgroundColor: "rgb(255,182,193)" }}
        >
          <div style={{ textAlign: "right" }}>
            {/* <button
              style={{
                backgroundColor: "white",
                fontSize: "20px",
                color: "black",
                width: "20px",
                height: "20px",
                marginBottom: "10px",
              }}
            >
              X
            </button> */}
            <button
              style={{
                marginBottom: "8px",
                color: "#000",
                height: "22px",
                width: "20px",
                "border-radius": "5px",
                border: "none",
              }}
            >
              X
            </button>
          </div>
          <p>
            <iframe
              width="100%"
              height="400px"
              src={APIData.clip}
              title={APIData.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
