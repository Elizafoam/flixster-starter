import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import MovieList from './Components/MovieList/MovieList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MovieList />
    </div>
  )
}

export default App;