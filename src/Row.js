import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    //if [] run once, when row loads.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //second value; if this value changes load again.

  const youtubeOptions = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplayer: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      return setTrailerUrl("");
    }
    movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url) => {
        console.log(url);
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search).get("v");
          setTrailerUrl(urlParams);
        }
      })
      .catch((error) =>
        console.log(
          movie?.title || movie?.name || movie?.original_name || "",
          error
        )
      );
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={youtubeOptions} />}
    </div>
  );
}

export default Row;
