import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Tile.scss";

class StreamsListTile extends Component {
    constructor(props) {
        super(props);

        // Twitch supported languages
        this.languages = {
            ar: "Arabic",
            asl: "American Sign Language",
            bg: "Bulgarian",
            cs: "Czech",
            da: "Danish",
            de: "German",
            el: "Greek",
            en: "English",
            es: "Spanish",
            fi: "Finnish",
            fr: "French",
            hu: "Hungarian",
            it: "Italian",
            ja: "Japanese",
            ko: "Korean",
            nl: "Dutch",
            no: "Norwegian",
            other: "Language: Other",
            pl: "Polish",
            pt: "Portuguese",
            ro: "Romanian",
            ru: "Russian",
            sk: "Slovak",
            sv: "Swedish",
            th: "Thai",
            tr: "Turkish",
            vi: "Vietnamese",
            zh: "Chinese",
            "zh-hk": "Chinese (Traditional)",
        };
    }

    setActiveStream = () => {
        const { index, setActiveStream } = this.props;

        if (Number.isInteger(index) && setActiveStream) {
            setActiveStream(index);
        }
    }

    render() {
        const { thumbnail, title, channel, game, logo, language, channelUrl } = this.props;
        const gameUrl = "https://www.twitch.tv/directory/game/" + encodeURI(game);
        const languageName = this.languages[language] ? this.languages[language] : "";

        return (
            <div className="stream-tile-container">
                <a href="#" onClick={this.setActiveStream}><img src={thumbnail} alt="Stream thumbnail" className="stream-thumbnail" /></a>
                <div className="stream-details">
                    {logo && <a href={channelUrl} target="_blank" rel="noopener noreferrer"><img src={logo} alt="Channel logo" className="channel-logo" /></a>}
                    <div className="stream-summary">
                        {title && <span className="title">{title}</span>}
                        {channel && <a href={channelUrl} className="channel-name" target="_blank" rel="noopener noreferrer">{channel}</a>}
                        {game && <a href={gameUrl} className="game" target="_blank" rel="noopener noreferrer">{game}</a>}
                        {languageName && <span className="language">{languageName}</span>}
                    </div>
                </div>
            </div>
        );
    }
}

StreamsListTile.propTypes = {
    index: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    channel: PropTypes.string,
    game: PropTypes.string,
    logo: PropTypes.string,
    language: PropTypes.string,
    channelUrl: PropTypes.string,
    setActiveStream: PropTypes.func,
};

StreamsListTile.defaultProps = {
    index: 0,
    thumbnail: "",
    title: "",
    channel: "",
    game: "",
    logo: "",
    language: "",
    channelUrl: "",
    setActiveStream: null,
};

export default StreamsListTile;
