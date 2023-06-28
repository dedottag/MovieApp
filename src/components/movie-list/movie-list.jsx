import React from "react";
import "./movie-list.css";
import Spinner from "../spinner";
import { Rate } from "antd";

let clas = "";
function cls(number) {
  if (number < 3) {
    clas = "cE90000";
  } else if (number >= 3 && number < 5) {
    clas = "cE97E00";
  } else if (number >= 5 && number < 7) {
    clas = "cE9D100";
  } else {
    clas = "cE66E900";
  }
  console.log(clas);
  return clas;
}

const MovieList = ({
  movies,
  koncut,
  dateFormatting,
  loading,
  handleRated,
}) => {
  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="movie-list-container">
      {movies.map((movie, index) => (
        <div className="movie-container" key={movie.id}>
          <div className="movie-logo-container">
            <input
              className="movie-logo"
              type="image"
              img="true"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="image not found"
            />
            {/* <img
              className="movie-logo"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={"image not found"}
            ></img> */}
          </div>

          <div className="movie-information">
            <div className="movie-info-header">
              <span className="movie-name">{movie.title}</span>
              <div className={`movie-estimation ${cls(movie.vote_average)}`}>
                {Math.round(movie.vote_average * 10) / 10}
              </div>
            </div>
            <div className="movie-description-container">
              <div className="movie-release-date">
                <span>{dateFormatting(movie.release_date)}</span>
              </div>
              <div className="movie-genres">
                <span></span>
              </div>
              <div className="movie-description">
                <span>{koncut(movie.overview, 240)}</span>
              </div>
            </div>
            <div className="movie-rating-container">
              <Rate
                allowHalf
                defaultValue={Math.round(movie.vote_average * 10) / 10}
                count={10}
                onChange={() => {
                  handleRated(movie);
                }}
                style={{ fontSize: "17px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
