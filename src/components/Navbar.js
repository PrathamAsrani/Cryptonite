import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">Cryptonite</div>
            <form onSubmit={handleSearchSubmit} className="navbar-search">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                    placeholder="Search cryptocurrency..." 
                />
                <button type="submit">Search</button>
            </form>
            <button className="theme-toggle" onClick={toggleTheme}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
        </nav>
    );
};

export default Navbar;
