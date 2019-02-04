import React from "react";
import PropTypes from "prop-types";
import "./Loader.scss";

const Loader = (props) => {
    const { size, type } = props;

    return (
        <div className={"loader-container" + (size ? " " + size : "")}>
            <img src={"src/images/" + type + ".svg"} alt="Loading" />
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.string,
    type: PropTypes.string,
};

Loader.defaultProps = {
    size: "medium",
    type: "loader",
};

export default Loader;
