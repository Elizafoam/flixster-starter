import React, { useState, useEffect } from 'react';
import "./MovieList.css";
import MovieCard from '../../Components/MovieCard/MovieCard';

const MovieList = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [URL, setURL] = useState(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
    const [search, setSearch] = useState("");

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;  

    
    useEffect(() => {
        async function fetchMovies() {
            setPage(page+1)
            const res = await fetch(URL + `&page=${page}`);
            const data = await res.json();
            setMovies(data.results);
            
        }
        
        fetchMovies();
    }, []);
    
    const addMovies = () => {
        //url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
        console.log(page)
        let s = url + `&page=${page}`;
        fetch(s)
            .then((res) => res.json())
            .then((data) => {
                let r = movies.concat(data.results);
                setMovies(r);
                setPage(page + 1);
            })
    }
  


    const filterMovies = (input) => {
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`)
            .then(response => response.json())
            .then(response => {
                setMovies(response.results)
            })
            .catch(err => console.error(err));
    }

    const searchItems = (input) => {
        console.log(input)
        filterMovies(input);
    }

    return (
        <div className="MovieList">
            <div className="Header">
                
                <div className="right">
                    <input type="search" id="search" placeholder="🔍 Search for Movies..." onChange={(e) =>setSearch(e.target.value)} />
                    <button className='button' onClick={() => searchItems(search)}>Search</button>
                    <div className="dropdown">
                        <button className="drop-button" >Sort By</button>
                        <div className="drop-content">
                            <a href="#">Alphabetic</a>
                            <a href="#">Release Date</a>
                            <a href="#">Rating</a>
                        </div>
                    </div>
        
                </div>
            </div>

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