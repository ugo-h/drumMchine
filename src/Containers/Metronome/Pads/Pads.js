import React from 'react';

const pads = (props) => {
    const pads = new Array(props.beatsPerBar).fill(null).map((el, i) => {
        if(i === props.beatsPerBar-1) i=-1
        const active = i + 1 === props.currentNote;
        return (<input onChange={() => props.checkHandler()} disabled={active} type="checkbox" key={i} id={i}></input>)
    })
   return( 
   <div className="Pads">
        <button onClick={() => props.dcrBeatsPerBarHandler()}>-</button> 
            <div className="container">
                {pads}
            </div>
        <button onClick={() => props.incrBeatsPerBarHandler()}>+</button>
    </div>
    );
};

export default pads;