import React, { useState, useEffect } from 'react';
import MovieList from './Components/MovieList/MovieList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <MovieList />
      <div className='about'>
        <h4>About</h4>
        <p>This is a website showing the latest movies currently playing in theaters, providing real-time information about the lastest movies.</p>
        <p>Created with the Movie Database (TMDB) API</p>

        <h4>Contact</h4>
        <p>elizafoam@gmail.com</p>
      </div>
      <footer className='footer'>
        <div><b>Copyright © Elizafoam 2024</b></div>
        
      </footer>
    </div>
  )
}

export default App;