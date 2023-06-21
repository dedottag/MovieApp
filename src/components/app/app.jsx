import React, { useState, useEffect } from "react";
import { format, addYears } from "date-fns";
n;
import "./app.css";
import MovieList from "../movie-list";
import Footer from "../footer";
import SearchPannel from "../search-pannel";

let actualPage = 1;

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

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=70a43d27a64c944d2799317923feaa57&page=${actualPage}`;
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
  Для работы приложения требуется исползовать VPN`
      );
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="app">
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
      />
      <Footer
        getMovieRequest={getMovieRequest}
        searchValue={searchValue}
        pageAdd={pageAdd}
      />
    </div>
  );
};

export default App;
