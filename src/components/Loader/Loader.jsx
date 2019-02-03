import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

const Loader = (props) => {
    const { size } = props;

    return (
        <div className="loader-container">
            <img className={"loader" + (size ? " " + size : "")} src="src/images/loader.svg" alt="Loading" />
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.string,
};

Loader.defaultProps = {
    size: 'medium',
};

export default Loader;
