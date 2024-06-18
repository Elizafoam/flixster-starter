import React, { useState, useEffect} from 'react';
import "./Header.css";

const Header = () => {
    
    return (
        <div className="Header">
            <div className="Head">
                <div className="left">
                    <img src="src/assets/logo.png" alt="clapperboard" />
                    <h1>Flixster</h1>
                </div>
                <div className="middle">
                    <p>Now Playing</p>
                </div>
                <div className="right">
                    <button className='button'>
                        <img src="src/assets/search.png" alt="search"/>
                    </button>
                    <button className="button">
                        <img src="src/assets/filter.png" alt="filter" />
                    </button>
                </div>
            </div>
            <div className="banner">
                <h1>Inside Out 2</h1>
                <p>Joy, Sadness, Anger, Fear and Disgust have been running a successful operation by all accounts. However, when Anxiety shows up, they aren't sure how to feel.</p>
            </div>
        </div>
    )   
}

export default Header;