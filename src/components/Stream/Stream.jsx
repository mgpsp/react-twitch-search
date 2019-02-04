import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Stream.scss";

class Stream extends Component {
    constructor(props) {
        super(props);

        const { stream } = props;
        const { channel, viewers } = stream;

        this.state = {
            viewers: viewers,
        };

        this.clientId = "wep57y8wppjryh0lh2bky28fpkz3fs";
        this.requestUrl = "https://api.twitch.tv/kraken/streams/" + channel._id;
        this.interval = setInterval(this.requestViewersCount, 3000);
    }

    requestViewersCount = () => {
        const options = {
            mode: "cors",
            headers: {
                Accept: "application/vnd.twitchtv.v5+json",
                "Client-ID": this.clientId,
            },
        };

        fetch(this.requestUrl, options).then(res => res.json())
            .then(this.updateViewersCount);
    }

    updateViewersCount = res => this.setState({ viewers: res.stream.viewers });

    goBack = () => {
        const { goBack } = this.props;

        clearInterval(this.interval);
        goBack();
    }

    render() {
        const { viewers } = this.state;
        const { stream } = this.props;
        const { channel, game } = stream;
        const { name, display_name, logo, url, status } = channel;

        const src = "https://player.twitch.tv/?channel=" + name;
        const gameUrl = "https://www.twitch.tv/directory/game/" + encodeURI(game);

        return (
            <div className="stream-container">
                <div className="go-back"><a href="#" onClick={this.goBack}><img className="go-back-icon" src="/src/images/back.svg" alt="Go back" /></a></div>
                <div className="stream-player-container">
                    <iframe
                        className="stream-player"
                        title={status}
                        src={src}
                        frameBorder="0"
                        allowFullScreen={true}
                        scrolling="no"
                    />
                </div>
                <div className="stream-details">
                    {logo && <a href={url} target="_blank" rel="noopener noreferrer"><img src={logo} alt="Channel logo" className="channel-logo" /></a>}
                    <div className="stream-summary">
                        {status && <span className="title">{status}</span>}
                        {display_name && <a href={url} className="channel-name" target="_blank" rel="noopener noreferrer">{display_name}</a>}
                        {game && <a href={gameUrl} className="game" target="_blank" rel="noopener noreferrer">{game}</a>}
                    </div>
                    <div className="viewers">
                        <img src="/src/images/user.svg" alt="Watching now" className="icon" />
                        <span className="text">{viewers}</span>
                    </div>
                </div>
            </div>
        );
    }
};

Stream.propTypes = {
    stream: PropTypes.object,
    goBack: PropTypes.func,
};

Stream.defaultProps = {
    stream: {},
    goBack: null,
};

export default Stream;
