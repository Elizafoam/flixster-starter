import React, { useState, useEffect } from 'react';
import "./MovieList.css";
import MovieCard from '../../Components/MovieCard/MovieCard';
import Modal from '../../Components/Modal/Modal';

const MovieList = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [URL, setURL] = useState(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    const [search, setSearch] = useState("");

    const [nowPlaying, setNowPlaying] = useState(false);
    const [onSearch, setOnSearch] = useState(false);
    const [onFilter, setOnFilter] = useState(false);

    const [selectedMovie, setSelectedMovie] = useState(null)
    const [genres, setGenres] = useState([]);
    const [details, setDetails] = useState([]);
    
    useEffect(() => {
        async function fetchMovies() {
            console.log(URL);
            const res = await fetch(URL);
            const data = await res.json();
            setMovies(data.results);
            console.log(movies);
        }
        async function fetchGenres() {
            const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
            const data = await res.json();
            setGenres(data.genres);
            console.log(genres);
        }
        fetchMovies();
        fetchGenres();
    }, [URL]);
    
    function fetchDetails(movie) {
        fetch(`https://api.themoviedb.org/3/movie/${movie["id"]}?api_key=${apiKey}`)
          .then(response => response.json())
          .then(response => {
              setDetails(response)
          })
          .catch(err => console.error(err));
        setSelectedMovie(movie);
        console.log(details)
    }

    function checkClick(e, movie){
        if (e.target.className != "heart" && e.target.className != "watched"){
            fetchDetails(movie);
        }
    }

    const addMovies = () => {
        //url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
        console.log(page)
        let s = URL + `&page=${page+1}`;
        fetch(s)
            .then((res) => res.json())
            .then((data) => {
                let r = movies.concat(data.results);
                setMovies(r);

            })
        setPage(page + 1);
    }

    // nav button
    const toggleSearch = () => {
        setURL(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`)
        setOnFilter(false);
        setNowPlaying(false);
        setOnSearch(true);
        setMovies([]);
        setPage(1);
    }

    const togglePlaying = () => {
        setURL(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
        setOnFilter(false);
        setNowPlaying(true);
        setOnSearch(false);
    }

    const toggleFilter = () => {
        setOnFilter(true);
        setNowPlaying(false);
        setOnSearch(false);
    }

    const getGenreName = (id) => {
        return genres.find((obj) => obj.id == id).name;
    }

    return (
        <div className="MovieList">
            <div className="Header">
                <div className="Head">
                    <div className="left">
                        <img src="src/assets/logo.png" alt="clapperboard" />
                        <h1>Flixster</h1>
                    </div>
                    <div className="middle">
                        <button className='playing-button' onClick={togglePlaying}>Now Playing</button>
                    </div>
                    <div className="right">
                        <button className='button'>
                            <img src="src/assets/search.png" alt="search" onClick={toggleSearch}/>
                        </button>
                        <button className="button">
                            <img src="src/assets/filter.png" alt="filter" onClick={toggleFilter} />
                        </button>
                    </div>
                </div>
                <div className="banner">
                    <h1>Inside Out 2</h1>
                    <p>Joy, Sadness, Anger, Fear and Disgust have been running a successful operation by all accounts. However, when Anxiety shows up, they aren't sure how to feel.</p>
                </div>
            </div>


            {onSearch && (
                <div className='search-container'>
                    <input type="search" id="search" placeholder="🔍 Search for Movies..." onChange={(e) =>setSearch(e.target.value)} />
                    <button className='button' onClick={() => setURL(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`)}>Search</button>
                </div>
            )}
            {onFilter && (
                <div className='filter'>
                    <div className="dropdown">
                        <button className="drop-button" >Languages</button>
                        <div className="drop-content">
                            <button className='drop' onClick={() => setURL(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`)}>English</button>
                            <button className='drop' onClick={() => setURL(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es&sort_by=popularity.desc`)} >Spanish</button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="drop-button" >Genre</button>
                        <div className="drop-content">
                            <button className='drop' onClick={() => setURL(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=18`)}>Drama</button>
                            <button className='drop' onClick={() => setURL(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=10749`)}>Romance</button>
                            <button className='drop' onClick={() => setURL(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=53`)}>Thriller</button>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="drop-button" onClick={() => setURL(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`)}> Top Rating</button>
                    </div>
                </div>
            )}

            <div className='Movies'>
                {movies.map((movie) => (
                        <MovieCard key={movie["id"]} title={movie["title"]} imgURL={`https://image.tmdb.org/t/p/original${movie["poster_path"]}`} rating={movie["vote_average"]} onClick={(e) => checkClick(e, movie)}/>
                ))}
            </div>
            <button className='button' onClick={addMovies}>Load More</button>
            {selectedMovie && (
                <Modal className="modalList" show={selectedMovie != null} onClose={() => setSelectedMovie(null)}>
                    <div className='modal-top'>
                        <div className='genre'>
                        <img src={`https://image.tmdb.org/t/p/original${selectedMovie["backdrop_path"]}`} alt="Movie Image" width={500} className="backdrop"/>
                        <div className='genres'>
                            <p><b>Genres:</b></p>
                            {selectedMovie["genre_ids"].map((id) => (
                                <p>{getGenreName(id)}</p>
                            ))}
                        </div>
                        </div>
                        
                        <div className='movie-info'>
                            
                            <h1>{selectedMovie["title"]}</h1>
                            <div className='times'>
                            <p>{selectedMovie["release_date"]}</p>
                            <p> • {details["runtime"]} mins</p>
                            </div>
                            <p><b>Overview: </b></p>
                            <p>{selectedMovie["overview"]}</p>
                        </div>
                    </div>
    
                    
                </Modal>
            )}
        </div>
    );
}

export default MovieList;