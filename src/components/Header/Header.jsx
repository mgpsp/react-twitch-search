import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './Header.scss';

const Header = (props) => {
    const { searchStreams } = props;

    return (
        <div className="header-container">
            <img className="logo" src="src/images/logo.svg" alt="Twitch searcher logo" />
            <SearchBar searchStreams={searchStreams} />
        </div>
    );
};

Header.propTypes = {
    searchStreams: PropTypes.func.isRequired,
};

export default Header;
