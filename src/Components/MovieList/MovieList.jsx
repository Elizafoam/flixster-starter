import React, { useState, useEffect } from 'react';
import "./MovieList.css";
import MovieCard from '../../Components/MovieCard/MovieCard';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(2);

    const apiKey = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`;  

    
    useEffect(() => {
        async function fetchMovies() {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        }
        
        fetchMovies();
    }, []);

    const addMovies = (url) => {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let r = movies.concat(data.results);
                setMovies(r);
            })
        setPage(page + 1);
        console.log(page);
    }

    return (
        <div className="MovieList">
            <div className='Movies'>
                {movies.map((movie) => (
                        <MovieCard title={movie["title"]} imgURL={`https://image.tmdb.org/t/p/original${movie["poster_path"]}`} rating={movie["vote_average"]} />
                ))}
            </div>
            <button className='button' onClick={addMovies}>Load More</button>
        </div>
    );
}

export default MovieList;