// import { useParams } from "react-router-dom";
// import { Films } from "../shared under/ListOfFilms";
// import { useState } from "react";
// import { Icon } from "react-materialize";
// import ModalCase from "./The ModalCase";

// import { Icon } from 'react-materialize'
// import ModalCase from './ModalCase';
// export default function DetailFilm() {

//   const userName = useParams();
// const film = Films.find((obj) => {
//   return obj.id == userName.id;
// });

//   return (
// <div className="container ">
//   <div className="product-card ">
//     <div className="badge"></div>
//     <div className="product-tumb col d-flex justify-content-center">
//       <img src={`../${film.img}`} alt={film.title} />
//     </div>
//     <div className="product-details">
//       <div className="col d-flex justify-content-center ">
//         <h4>{film.title}</h4>
//       </div>
//       <div className="col d-flex justify-content-center fw-bolder ">
//         Year: {film.year}
//       </div>
//       <div className="product-bottom-details col d-flex justify-content-center fs-4 text-success ">
//         Description: {film.desc}
//       </div>
//       <a
//         onClick={() => setIsOpen(true)}
//         className="btn-floating halfway-fab waves-effect waves-light red"
//       >
//         <Icon>ondemand_video</Icon>
//       </a>
//       {isOpen && <ModalCase setIsOpen={setIsOpen} film={film} />}
//     </div>
//   </div>
// </div>
//   );
// }

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Icon } from "react-materialize";
import ModalCase from "./The ModalCase";
import { Card, Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Films } from "../shared under/ListOfFilms";

export default function Detail() {
  const staff = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const userName = useParams();
  // const film = Films.find((obj) => {
  //   return obj.id == userName.id;
  // });

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
    <div className="container ">
      <div className="product-card ">
        <div className="product-details">
          <a
            onClick={() => setIsOpen(true)}
            className="btn-floating halfway-fab waves-effect waves-light red"
          >
            <Icon>ondemand_video</Icon>
          </a>
          {isOpen && <ModalCase setIsOpen={setIsOpen} film={APIData.clip} />}
        </div>
        <div className="badge"></div>

        <Grid container rowSpacing={2}>
          <Grid
            className="parent"
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card sx={{ minWidth: "80%" }}>
              <CardMedia
                sx={{ height: "150vh" }}
                image={APIData.image}
                title="green iguana"
              />
              <CardContent style={{ textAlign: "left" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Name:{" "}
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {" "}
                    {APIData.name}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Year:{" "}
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {" "}
                    {APIData.year}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Nation:{" "}
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {" "}
                    {APIData.nation}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Price:{" "}
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {" "}
                    {APIData.price}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Rating:{" "}
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {" "}
                    {APIData.rating}
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  Description:{" "}
                  <span style={{ fontWeight: "normal", fontSize: "20px" }}>
                    {" "}
                    {APIData.desc}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* <div className="container">
          <div className="product-card ">
            <div className="badge"></div>

            <div className="product-details">
              <a
                onClick={() => setIsOpen(true)}
                className="btn-floating halfway-fab waves-effect waves-light red"
              >
                <Icon>ondemand_video</Icon>
              </a>
              {isOpen && (
                <ModalCase setIsOpen={setIsOpen} film={APIData.clip} />
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
