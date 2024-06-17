import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="Header">
            <div className="logo">
                <img src="src/assets/logo.png" alt="clapperboard" />
                <h1>Flixster</h1>
            </div>
            <div className="right">
                <input type="search" id="search" placeholder="🔍 Search for Movies..."/>
                <div className="dropdown">
                    <button className="drop-button">Sort by</button>
                    <div className="drop-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;