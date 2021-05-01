import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";

import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const oneMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];
      setMovie(oneMovie);
      console.log(oneMovie);
      return request;
    }
    fetchData();
  }, []);
  return (
    <header
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "top center",
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner_buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>

        <h2 className='banner__description'>{movie?.overview}</h2>
        {/* div.buttons */}
        {/* description */}
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
