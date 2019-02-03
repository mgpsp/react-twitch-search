import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import StreamsList from './StreamsList/StreamsList.jsx';
import './normalize.css';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
            searchResults: [{"_id":32523987152,"game":"League of Legends","viewers":186179,"video_height":1080,"average_fps":60,"delay":0,"created_at":"2019-02-02T21:27:39Z","is_playlist":false,"stream_type":"live","preview":{"small":"https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-80x45.jpg","medium":"https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-320x180.jpg","large":"https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-640x360.jpg","template":"https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-{width}x{height}.jpg"},"channel":{"mature":false,"partner":false,"status":"LCS Spring: 100 Thieves vs. Team Liquid","broadcaster_language":"en","broadcaster_software":"unknown_rtmp","display_name":"Riot Games","game":"League of Legends","language":"en","_id":36029255,"name":"riotgames","created_at":"2012-09-08T06:53:10Z","updated_at":"2019-02-03T00:36:00Z","delay":null,"logo":"https://static-cdn.jtvnw.net/jtv_user_pictures/7033f472-a834-43ff-bf5c-c589e8e35593-profile_image-300x300.png","banner":null,"video_banner":"https://static-cdn.jtvnw.net/jtv_user_pictures/edc00c68-ae73-4968-860c-83fd4e61a5e6-channel_offline_image-1920x1080.png","background":null,"profile_banner":"https://static-cdn.jtvnw.net/jtv_user_pictures/f0e445a4-b032-4898-9cda-0db16e9f2fb4-profile_banner-480.png","profile_banner_background_color":"","url":"https://www.twitch.tv/riotgames","views":1086943913,"followers":3377342,"_links":{"self":"https://api.twitch.tv/kraken/channels/riotgames","follows":"https://api.twitch.tv/kraken/channels/riotgames/follows","commercial":"https://api.twitch.tv/kraken/channels/riotgames/commercial","stream_key":"https://api.twitch.tv/kraken/channels/riotgames/stream_key","chat":"https://api.twitch.tv/kraken/chat/riotgames","features":"https://api.twitch.tv/kraken/channels/riotgames/features","subscriptions":"https://api.twitch.tv/kraken/channels/riotgames/subscriptions","editors":"https://api.twitch.tv/kraken/channels/riotgames/editors","teams":"https://api.twitch.tv/kraken/channels/riotgames/teams","videos":"https://api.twitch.tv/kraken/channels/riotgames/videos"}},"_links":{"self":"https://api.twitch.tv/kraken/streams/riotgames"}}],
            totalResults: 0,
            searchError: false,
            loading: false,
        };

        this.clientId = "wep57y8wppjryh0lh2bky28fpkz3fs";
        this.searchStreamsBaseUrl = "https://api.twitch.tv/kraken/search/streams?query=";
    }

    searchStreams = (query) => {
        this.setState({ loading: true });

        const url = this.searchStreamsBaseUrl + encodeURI(query);
        const options = {
            mode: "cors",
            headers: {
                "Client-ID": this.clientId,
            },
        };

        fetch(url, options).then(res => res.json())
            .then(this.handleSearchResults)
            .catch(this.searchFailed);
    }

    handleSearchResults = (results) => {
        this.setState({ totalResults: results._total, searchResults: results.streams, loading: false });
    }

    searchFailed = (err) => {
        console.error("failedSearch", err);
        this.setState({ searchError: true });
    }

    render() {
        const { totalResults, searchResults, loading } = this.state;
        return (
            <div className="app-container">
                <Header searchStreams={this.searchStreams} />
                <StreamsList
                    total={totalResults}
                    streams={searchResults}
                    loading={loading}
                />
            </div>
        );
    }
}

export default App;
