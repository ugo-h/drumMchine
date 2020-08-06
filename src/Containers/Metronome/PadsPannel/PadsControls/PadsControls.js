import React from 'react';
import './PadsControls.css';

const padsControls = (props) => {
    return (
        <div className="PadsControls">
            <button onClick={() => props.dcrBeatsPerBarHandler()}>-</button> 
            <button onClick={() => props.incrBeatsPerBarHandler()}>+</button>
        </div>
    )
}

export default padsControls;