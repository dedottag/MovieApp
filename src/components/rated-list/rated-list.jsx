import React from "react";
import Spinner from "../spinner";
import { Rate } from "antd";
import "../movie-list/movie-list.css";
import { Button } from "antd";

const RatedList = ({ movies, koncut, dateFormatting, loading, removeFilm }) => {
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
          </div>

          <div className="movie-information">
            <div className="movie-info-header">
              <span className="movie-name">{movie.title}</span>
              <div className="movie-estimation">
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
                <span>{koncut(movie.overview, 200)}</span>
              </div>
            </div>
            <div className="movie-rating-container">
              <div className="remove-rated">
                <Button
                  className="remove-rated-button"
                  block={true}
                  size="small"
                  shape="default"
                  onClick={() => {
                    removeFilm(movie);
                  }}
                >
                  delete
                </Button>
              </div>
              <Rate
                allowHalf
                defaultValue={Math.round(movie.vote_average * 10) / 10}
                count={10}
                style={{ fontSize: "17px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatedList;
