import React from 'react';
import './MetronomeHeader.css';
import PlayIcon from '../../../images/play.svg';
import PauseIcon from '../../../images/pause.svg';
import MetronomeButton from '../Button/MetronomeButton';

const metronomeHead = (props) => {
    return (
        <div className="Metronome__head">
            <p className="bpm-container">{props.tempo} bpm</p>
            <button 
                className="PlayButton"
                onClick={props.metronomeHandler}
            >
                {props.isRunning? <PauseIcon/>:<PlayIcon/>}
            </button>
            <div className="TempoControls">
                <MetronomeButton buttonHandler={()=>props.tempoChangeByHandler(-1)}>-</MetronomeButton>
                <input defaultValue={props.tempo} onInput={props.tempoChangeHandler} type="range" min="60" max="240"></input>
                <MetronomeButton buttonHandler={()=>props.tempoChangeByHandler(1)}>+</MetronomeButton>
            </div>
        </div>
    )
}

export default metronomeHead;