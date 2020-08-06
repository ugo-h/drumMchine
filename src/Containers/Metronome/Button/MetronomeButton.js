import React from 'react';
import './MetronomeButton.css';

const MetronomeButton = (props) => {
    return (
        <button className="MetronomeButton" onClick={() => props.buttonHandler()}>{props.children}</button>
    )
}

export default MetronomeButton;