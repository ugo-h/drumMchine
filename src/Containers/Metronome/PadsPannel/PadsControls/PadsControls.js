import React from 'react';
import './PadsControls.css';
import MetronomeButton from '../../Button/MetronomeButton';

const padsControls = (props) => {
    return (
        <div className="PadsControls">
            <MetronomeButton buttonHandler={() => props.dcrBeatsPerBarHandler()}>-</MetronomeButton> 
            <MetronomeButton buttonHandler={() => props.incrBeatsPerBarHandler()}>+</MetronomeButton>
        </div>
    )
}

export default padsControls;