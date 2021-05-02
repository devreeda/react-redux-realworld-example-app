import ArticlePreview from "./ArticlePreview";
import ListPagination from "./ListPagination";
import React, { useState, useEffect } from "react";
import FilmPreview from "./FilmPreview";
import requests from "./requests";

import axios from "./axios";

const FilmList = React.memo(props => {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(requests.fetchTopRated);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [requests.fetchTopRated]);

  if (!props.articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (props.articles.length === 0) {
    return <div className="article-preview">No film are here... yet.</div>;
  }

  return (
    <div>
      {movies.map(movie => {
        return <FilmPreview movie={movie} key={movie.id} />;
      })}
    </div>
  );
});

export default FilmList;
