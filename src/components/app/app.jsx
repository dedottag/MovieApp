import React, { useState, useEffect } from "react";
import { format, addYears } from "date-fns";
import "./app.css";
import MovieList from "../movie-list";
import Footer from "../footer";
import SearchPannel from "../search-pannel";
import RatedList from "../rated-list";
import { Menu } from "antd";

let actualPage = 1;
const items = [
  {
    label: "Search",
    key: "search",
  },
  {
    label: "Rated",
    key: "rated",
  },
];

function koncut(text, limit) {
  const re = new RegExp("(^.{" + (limit - 1) + "}([^ ]+|\\s))(.*)");
  const result = text.replace(re, "$1");
  return `${result}...`;
}

function debounce(fn, ms) {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

function dateFormatting(data) {
  if (data === "") {
    return "date is not defined";
  }
  const dat = addYears(new Date(data), 1);
  return format(dat, "MMMM dd, yyyy");
}

function pageAdd(page) {
  actualPage = page;
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [rated, setRated] = useState([]);
  const [isRated, setIsRated] = useState(false);

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&page=${actualPage}&api_key=70a43d27a64c944d2799317923feaa57`;
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      const results = responseJson.results;
      if (results) {
        setMovies(results);
        setLoading(false);
      }
    } catch {
      alert(
        `Вероятно у вас не включен VPN.
Для работы приложения требуется исползовать VPN.`
      );
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addRatedMovies = (movie) => {
    const newRatedList = [...rated, movie];
    const result = [];
    newRatedList.forEach((datum) => {
      if (!result.find((item) => item.id === datum.id)) {
        result.push(datum);
      }
    });
    setRated(result);
    saveToLocalStorage(result);
  };

  useEffect(() => {
    const movieRated = JSON.parse(localStorage.getItem("react-movieApp"));
    setRated(movieRated);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movieApp", JSON.stringify(items));
  };

  const editRated = ({ item, key }) => {
    if (key === "rated") {
      setIsRated(true);
    } else if (key === "search") {
      setIsRated(false);
    }
  };

  const removeFilm = (movie) => {
    const newRated = rated.filter((film) => {
      return film.id !== movie.id;
    });
    setRated(newRated);
    saveToLocalStorage(newRated);
  };

  return (
    <div className="app">
      <Menu
        className="menu"
        onClick={editRated}
        mode="horizontal"
        items={items}
      />
      {!isRated && (
        <>
          <SearchPannel
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            debounce={debounce}
            setLoading={setLoading}
          />
          <MovieList
            movies={movies}
            koncut={koncut}
            dateFormatting={dateFormatting}
            loading={loading}
            setLoading={setLoading}
            handleRated={addRatedMovies}
          />
          <Footer
            getMovieRequest={getMovieRequest}
            searchValue={searchValue}
            pageAdd={pageAdd}
          />
        </>
      )}
      {isRated && (
        <div>
          <RatedList
            movies={rated}
            koncut={koncut}
            dateFormatting={dateFormatting}
            loading={loading}
            setLoading={setLoading}
            handleRated={addRatedMovies}
            removeFilm={removeFilm}
          />
        </div>
      )}
    </div>
  );
};

export default App;
