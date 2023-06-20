import React from "react";
import "./movie-list.css";
import Spinner from "../spinner";

const MovieList = ({ movies, koncut, dateFormatting, loading }) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="movie-list-container">
      {movies.map((movie, index) => (
        <div className="movie-container" key={movie.id}>
          <div className="movie-logo-container">
            <img
              className="movie-logo"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie"
            ></img>
          </div>

          <div className="movie-information">
            <div className="movie-info-header">
              <span className="movie-name">{movie.title}</span>
              <span className="movie-estimation">
                {Math.round(movie.vote_average * 10) / 10}
              </span>
            </div>
            <div className="movie-description-container">
              <div className="movie-release-date">
                <span>{dateFormatting(movie.release_date)}</span>
              </div>
              <div className="movie-genres">
                <span></span>
              </div>
              <div className="movie-description">
                <span>{koncut(movie.overview, 150)}</span>
              </div>
            </div>
            <div className="omvie-rating"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
