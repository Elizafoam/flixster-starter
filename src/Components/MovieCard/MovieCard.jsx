import React from "react";
import "./MovieCard.css";

const MovieCard = ({title, imgURL, rating}) => {
    return (
        <div className="MovieCard">
            <img src={imgURL} alt="Movie Poster Image" />
            <h1>{title}</h1>
            <p>Rating: {rating}</p>
        </div>
    )
}

export default MovieCard;