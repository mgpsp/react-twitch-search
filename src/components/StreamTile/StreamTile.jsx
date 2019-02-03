import React from 'react';
import PropTypes from 'prop-types';
import './StreamTile.scss';

const StreamTile = (props) => {
    const { thumbnail, title, channel, game, logo, language, viewers, channelUrl, channelId } = props;

    return (
        <div className="stream-tile-container">
            <img src={thumbnail} alt="Stream thumbnail" className="stream-thumbnail" />
            <div className="stream-details">
                <img src={logo} alt="Channel logo" className="channel-logo" />
                <div className="stream-summary">
                    <span className="stream-title">{title}</span>
                    <span className="channel-name">{channel}</span>
                </div>
            </div>
        </div>
    );
};

StreamTile.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    channel: PropTypes.string,
    channelId: PropTypes.string,
    game: PropTypes.string,
    logo: PropTypes.string,
    language: PropTypes.string,
    viewers: PropTypes.number,
    channelUrl: PropTypes.string,
};

StreamTile.defaultProps = {
    thumbnail: '',
    title: '',
    channel: '',
    channelId: '',
    game: '',
    logo: '',
    language: '',
    viewers: 0,
    channelUrl: '',
};

export default StreamTile;
