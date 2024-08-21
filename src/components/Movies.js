import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("checkTop");

  useEffect(() => {
    if (movieSearch) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${movieSearch}&language=fr-FR`
        )
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.error(err));
    }
  }, [movieSearch]);

  return (
    <div className="movies">
      <div className="search-container">
        <form action="">
          <input
            type="text"
            id="movieInput"
            placeholder="Entrez le nom d'un film"
            onChange={(e) => setMovieSearch(e.target.value)}
          />
        </form>
        {/* TRI */}
        <div className="tri">
          <input
            type="radio"
            name="checkTop"
            id="checkTop"
            checked={selectedSort === "checkTop"}
            onChange={(e) => {
              setSelectedSort(e.target.id);
            }}
          />
          <label htmlFor="checkTop">Top</label>
          <input
            type="radio"
            name="checkFlop"
            id="checkFlop"
            checked={selectedSort === "checkFlop"}
            onChange={(e) => {
              setSelectedSort(e.target.id);
            }}
          />
          <label htmlFor="checkFlop">Flop</label>
          <input
            type="radio"
            name="checkRandom"
            id="checkRandom"
            checked={selectedSort === "checkRandom"}
            onChange={(e) => {
              setSelectedSort(e.target.id);
            }}
          />
          <label htmlFor="checkRandom">Random</label>
        </div>
      </div>
      <div className="movieList">
        <ul>
          {movies &&
            movies
              .sort((a, b) => {
                switch (selectedSort) {
                  case "checkFlop":
                    return a.vote_average - b.vote_average;
                  case "checkTop":
                    return b.vote_average - a.vote_average;
                  case "checkRandom":
                    return Math.random() - 0.5;
                  default:
                    return 0;
                }
              })
              .map((movie) => <Card key={movie.id} movie={movie} />)}
        </ul>
      </div>
    </div>
  );
};

export default Movies;
