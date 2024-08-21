import React, { useEffect, useRef, useState } from "react";
import posterFallback from "../assets/img/poster.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const Card = ({ movie }) => {
  const [date, setDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const overviewRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (
      overviewRef.current &&
      overviewRef.current.scrollHeight > overviewRef.current.clientHeight
    ) {
      setShowExpandButton(true);
    }
  }, [movie.overview]);

  useEffect(() => {
    if (movie.release_date) {
      const newDate = new Date(movie.release_date);
      setDate(newDate.toLocaleDateString("fr-FR"));
    }
  }, [movie.release_date]);

  // Initialiser l'état "isLiked" lors du chargement du composant
  useEffect(() => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setIsLiked(likedMovies.some((likedMovie) => likedMovie.id === movie.id));
  }, [movie.id]);

  // Transforme les ids des genres en texte
  const genreList =
    movie.genre_ids && Array.isArray(movie.genre_ids)
      ? movie.genre_ids.map((genre_nb, index) => {
          let genreName = "";
          switch (genre_nb) {
            case 16:
              genreName = "Animation";
              break;
            case 12:
              genreName = "Adventure";
              break;
            case 28:
              genreName = "Action";
              break;
            case 35:
              genreName = "Comedy";
              break;
            case 80:
              genreName = "Crime";
              break;
            case 99:
              genreName = "Documentary";
              break;
            case 18:
              genreName = "Drama";
              break;
            case 10751:
              genreName = "Family";
              break;
            case 14:
              genreName = "Fantasy";
              break;
            case 36:
              genreName = "History";
              break;
            case 27:
              genreName = "Horror";
              break;
            case 10402:
              genreName = "Music";
              break;
            case 9648:
              genreName = "Mystery";
              break;
            case 10749:
              genreName = "Romance";
              break;
            case 878:
              genreName = "Science Fiction";
              break;
            case 10770:
              genreName = "TV Movie";
              break;
            case 53:
              genreName = "Thriller";
              break;
            case 10752:
              genreName = "War";
              break;
            case 37:
              genreName = "Western";
              break;
            case 10759:
              genreName = "Action & Adventure";
              break;
            case 10762:
              genreName = "Kids";
              break;
            case 10763:
              genreName = "News";
              break;
            case 10764:
              genreName = "Reality";
              break;
            case 10765:
              genreName = "Sci-Fi & Fantasy";
              break;
            case 10766:
              genreName = "Soap";
              break;
            case 10767:
              genreName = "Talk";
              break;
            case 10768:
              genreName = "War & Politics";
              break;
            // Ajoutez ici les autres genres que vous souhaitez gérer
            default:
              genreName = "Unknown"; // Valeur par défaut si le genre n'est pas reconnu
              break;
          }
          return (
            <span key={index} className="genre">
              {genreName}
            </span>
          );
        })
      : "Genres non disponibles"; //Message par défaut si pas de genre reconnu

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikedClick = () => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    if (!isLiked) {
      likedMovies.push(movie);
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
    } else {
      const updatedMovies = likedMovies.filter(
        (likedMovie) => likedMovie.id !== movie.id
      );
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className={`card ${isExpanded ? "expanded" : ""}`}>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = posterFallback;
        }}
      />

      <FontAwesomeIcon
        icon={isLiked ? faHeartSolid : faHeartRegular}
        className={`heart ${isLiked ? "liked" : ""}`}
        onClick={handleLikedClick}
      />
      <h3>{movie.title}</h3>

      <em>Sorti le : {date}</em>

      <h4>
        {movie.vote_average}/10{" "}
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: "gold", fontSize: "1em" }}
        />
      </h4>

      <span className="genre-container">{genreList}</span>

      <h4>Synopsis</h4>

      <p ref={overviewRef} className={isExpanded ? "expanded" : ""}>
        {movie.overview}
      </p>
      {showExpandButton && (
        <button className="expand-button" onClick={handleExpandClick}>
          {isExpanded ? "Réduire" : "En savoir plus"}
        </button>
      )}
    </div>
  );
};

export default Card;
