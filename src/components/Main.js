import React from "react";
// import { Films } from '../shared under/ListOfFilms'
import FilmsPresentation from "./FilmsPresentation";

function Main({ setFilmId, loading, setLoading }) {
  //  constructor() {
  //      super();
  //      this.state = {
  //         films: Films
  //      };
  //   }
  return (
    <FilmsPresentation
      setFilmId={setFilmId}
      loading={loading}
      setLoading={setLoading}
    />
  );
}

export default Main;
