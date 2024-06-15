import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="Header">
            <div className="logo">
                <img src="src/assets/logo.png" alt="clapperboard" />
                <h1>Flixster</h1>
            </div>
            <div class="dropdown">
                <button class="drop-button">Dropdown</button>
                <div class="drop-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        </div>
    )
}

export default Header;