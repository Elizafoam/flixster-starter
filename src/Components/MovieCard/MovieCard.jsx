import React, { useState, useEffect } from 'react';
import "./MovieCard.css";

const MovieCard = ({key, title, imgURL, rating, onClick}) => {
    const [heart, setHeart] = useState("♡");
    const [watch, setWatched] = useState("Watch");


    return (
        <div className="MovieCard" onClick={onClick}>
            <img src={imgURL} alt="Movie Poster Image" />
            <h1>{title}</h1>
            <p>Rating: {rating}</p>
            <div className="react-button">
                <button className="heart" onClick={() => setHeart("♥︎")}>{heart}</button>
                <button className="watched" onClick={() => setWatched("Watched")}>{watch}</button>
            </div>
        </div>
    )
}

export default MovieCard;