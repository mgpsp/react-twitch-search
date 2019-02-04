import React, { Component } from "react";
import Pagination from "react-js-pagination";
import Header from "./Header/Header.jsx";
import StreamsList from "./StreamsList/StreamsList.jsx";
import Stream from "./Stream/Stream.jsx";
import "./common/normalize.css";
import "./App.scss";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            activeStream: null,
            resultsPerPage: 12,
            activePage: 1,
            searchResults: [],
            totalResults: 0,
            error: false,
            loading: false,
            featuredStreams: [],
        };

        this.clientId = "wep57y8wppjryh0lh2bky28fpkz3fs";
        this.searchStreamsBaseUrl = "https://api.twitch.tv/kraken/search/streams?query=";
        this.featuredStreamsBaseUrl = "https://api.twitch.tv/kraken/streams/featured?limit=12";

        this.featuredStreamsNumber = 12;
    }

    componentDidMount() {
        this.resetAndGetFeaturedStreams();
    }

    resetAndGetFeaturedStreams = () => {
        this.setState({
            loading: true,
            searchQuery: "",
            error: false,
            activePage: 1,
            activeStream: "",
            totalResults: 0,
        }, () => {
            const options = {
                mode: "cors",
                headers: {
                    Accept: "application/vnd.twitchtv.v5+json",
                    "Client-ID": this.clientId,
                },
            };

            fetch(this.featuredStreamsBaseUrl, options).then(res => res.json())
                .then(this.handleFeaturedStreams)
                .catch(this.requestFailed);
        });
    }

    handleFeaturedStreams = (results) => {
        if (!results || !results.featured) {
            this.requestFailed();
        } else {
            this.setState({
                featuredStreams: this.extractFeaturedStreams(results.featured),
                loading: false,
                error: false,
            });
        }
    }

    extractFeaturedStreams = streams => streams.map(el => el.stream);

    searchStreams = (query, newSearch = true) => {
        const { resultsPerPage } = this.state;
        let { activePage } = this.state;
        if (newSearch) {
            activePage = 1;
        }

        this.setState({
            loading: true,
            searchQuery: query,
            error: false,
            activePage,
            activeStream: "",
            totalResults: 0,
        }, () => {
            const offset = (activePage - 1) * resultsPerPage;
            const url = this.searchStreamsBaseUrl + encodeURI(query) + "&limit=" + resultsPerPage + "&offset=" + offset;
            const options = {
                mode: "cors",
                headers: {
                    Accept: "application/vnd.twitchtv.v5+json",
                    "Client-ID": this.clientId,
                },
            };

            fetch(url, options).then(res => res.json())
                .then(this.handleSearchResults)
                .catch(this.requestFailed);
        });
    }

    handleSearchResults = (results) => {
        if (!results || !results.streams) {
            this.requestFailed();
        } else {
            this.setState({
                totalResults: results._total,
                searchResults: results.streams,
                loading: false,
                error: false,
            });
        }
    }

    handlePageChange = (page) => {
        const { searchQuery } = this.state;
        this.setState({ activePage: page }, () => this.searchStreams(searchQuery, false));
    }

    setActiveStream = (index) => {
        const { searchQuery, searchResults, featuredStreams } = this.state;
        const activeStream = searchQuery !== "" ? searchResults[index] : featuredStreams[index];

        this.setState({ activeStream });
    }

    requestFailed = (err = null) => {
        this.setState({ totalResults: 0, error: true, loading: false, searchResults: [], featuredStreams: [] });
    }

    getListTitle = () => {
        const { searchQuery } = this.state;
        return searchQuery !== "" ? "Search results for \"" + searchQuery + "\"" : "Featured streams";
    }

    goBack = () => this.setState({ activeStream: null });

    render() {
        const {
            totalResults,
            searchResults,
            loading,
            searchQuery,
            error,
            activePage,
            resultsPerPage,
            activeStream,
            featuredStreams,
        } = this.state;

        const isSearching = searchQuery !== "";
        const showPagination = isSearching && totalResults > resultsPerPage && !activeStream && searchResults.length > 0;
        const streams = isSearching ? searchResults : featuredStreams;
        const title = this.getListTitle();

        return (
            <div className="app-container">
                <Header searchStreams={this.searchStreams} goHome={this.resetAndGetFeaturedStreams} />
                {activeStream
                    ? (
                        <Stream
                            stream={activeStream}
                            goBack={this.goBack}
                        />
                    )
                    : (
                        <StreamsList
                            total={totalResults}
                            streams={streams}
                            loading={loading}
                            title={title}
                            isSearch={isSearching}
                            error={error}
                            activePage={activePage}
                            setActiveStream={this.setActiveStream}
                        />
                    )}
                {showPagination && (
                    <div className="pagination-container">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={resultsPerPage}
                            totalItemsCount={totalResults}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemClass="pagination-item"
                            itemClassFirst="first-item"
                            itemClassLast="last-item"
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
