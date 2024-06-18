import React, { useState, useEffect } from 'react';
import MovieList from './Components/MovieList/MovieList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <MovieList />
      <footer className='footer'>
        <div>Copyright © Elizafoam 2024</div>
      </footer>
    </div>
  )
}

export default App;