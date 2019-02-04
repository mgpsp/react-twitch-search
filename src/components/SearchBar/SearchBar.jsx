import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SearchBar.scss";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
        };
    }

    handleChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { searchStreams } = this.props;
        const { searchValue } = this.state;

        if (searchStreams && searchValue !== "") {
            searchStreams(searchValue);
        }
    }

    render() {
        const { searchValue } = this.state;

        return (
            <form className="search-bar-form" onSubmit={this.handleSubmit}>
                <div className="input-container">
                    <input
                        className="search-input"
                        type="text"
                        value={searchValue}
                        onChange={this.handleChange}
                        placeholder="Search streams..."
                    />
                    <button type="button" className="search-button" onClick={this.handleSubmit}>
                        <img className="search-icon" src="src/images/search-icon.svg" alt="Search icon" />
                    </button>
                </div>
            </form>
        );
    }
}

SearchBar.propTypes = {
    searchStreams: PropTypes.func.isRequired,
};

export default SearchBar;
