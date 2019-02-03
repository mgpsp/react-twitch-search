import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader.jsx';
import StreamTile from '../StreamTile/StreamTile.jsx';
import './StreamsList.scss';

class StreamsList extends Component {
    buildStreamTile = (stream) => {
        const { _id, channel, game, viewers, preview } = stream;
        const { name, display_name, logo, language, url, status } = channel;
        const { large } = preview;

        return (
            <StreamTile
                key={_id}
                thumbnail={large}
                title={status}
                channel={display_name}
                channelId={name}
                game={game}
                logo={logo}
                language={language}
                viewers={viewers}
                channelUrl={url}
            />
        );
    }

    render() {
        const { streams, loading } = this.props;
        return (
            <div className="streams-list-container">
                {loading
                    ? <Loader size="medium" />
                    : streams.map(this.buildStreamTile)}
            </div>
        );
    }
}

StreamsList.propTypes = {
    streams: PropTypes.array,
    loading: PropTypes.bool,
};

StreamsList.defaultProps = {
    streams: [],
    loading: false,
};

export default StreamsList;
