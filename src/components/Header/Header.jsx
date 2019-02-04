import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar/SearchBar.jsx";
import "./Header.scss";

const Header = (props) => {
    const { searchStreams, goHome } = props;

    return (
        <div className="header-container">
            <a href="#" onClick={goHome}><img className="logo" src="src/images/logo.svg" alt="Twitch searcher logo" /></a>
            <SearchBar searchStreams={searchStreams} />
        </div>
    );
};

Header.propTypes = {
    searchStreams: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
};

export default Header;
