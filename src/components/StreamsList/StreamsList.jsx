import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader.jsx";
import StreamsListTile from "./Tile/Tile.jsx";
import StreamsListHeader from "./Header/Header.jsx";
import "./StreamsList.scss";

class StreamsList extends Component {
    buildStreamTile = (stream, index) => {
        const { setActiveStream } = this.props;
        const { _id, channel, game, viewers, preview } = stream;
        const { display_name, logo, broadcaster_language, url, status } = channel;
        const { large } = preview;

        return (
            <StreamsListTile
                key={_id}
                index={index}
                thumbnail={large}
                title={status}
                channel={display_name}
                game={game}
                logo={logo}
                language={broadcaster_language}
                viewers={viewers}
                channelUrl={url}
                setActiveStream={setActiveStream}
            />
        );
    }

    render() {
        const { streams, loading, title, isSearch, total, error, activePage } = this.props;
        const loaderType = isSearch ? "search-loader" : "loader";
        const displayingStart = activePage === 1 ? 1 : streams.length * (activePage - 1);
        const displayingEnd = streams.length * (activePage - 1) + streams.length;
        const showLoading = loading && !error;
        const showError = !loading && error;
        const showResults = !loading && !error;
        const noResults = isSearch && showResults && streams.length === 0;

        return (
            <div className="streams-list-container">
                {showLoading && <Loader size="medium" type={loaderType} />}
                {showResults && (
                    <div>
                        <StreamsListHeader
                            title={title}
                            isSearch={isSearch}
                            total={total}
                            displayingStart={displayingStart}
                            displayingEnd={displayingEnd}
                            loading={loading}
                        />
                        <div className="streams-list-row">{streams.map(this.buildStreamTile)}</div>
                    </div>
                )}
                {showError && (
                    <div className="error">Sorry, something went wrong.</div>
                )}
                {noResults && (
                    <div className="no-results">No results found</div>
                )}
            </div>
        );
    }
}

StreamsList.propTypes = {
    total: PropTypes.number,
    streams: PropTypes.array,
    loading: PropTypes.bool,
    isSearch: PropTypes.bool,
    error: PropTypes.bool,
    title: PropTypes.string,
    activePage: PropTypes.number,
    setActiveStream: PropTypes.func,
};

StreamsList.defaultProps = {
    total: 0,
    streams: [],
    loading: false,
    isSearch: false,
    error: false,
    title: "",
    activePage: 1,
    setActiveStream: null,
};

export default StreamsList;
