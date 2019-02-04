import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";

const StreamsListHeader = (props) => {
    const { title, isSearch, total, displayingStart, displayingEnd, loading } = props;

    return (
        <div className="streams-list-header-container">
            <span className="header-title">{title}</span>
            {isSearch && !loading && (
                <div className="results">
                    <span className="results-info">{"Displaying " + displayingStart + "-" + displayingEnd + " of " + total}</span>
                </div>
            )}
        </div>
    );
};

StreamsListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    isSearch: PropTypes.bool,
    loading: PropTypes.bool,
    total: PropTypes.number,
    displayingStart: PropTypes.number,
    displayingEnd: PropTypes.number,
};

StreamsListHeader.defaultProps = {
    isSearch: false,
    loading: false,
    total: 0,
    displayingStart: 12,
    displayingEnd: 12,
};

export default StreamsListHeader;
