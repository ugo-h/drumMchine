import React from 'react';

const pads = (props) => {
    const pads = new Array(props.beatsPerBar).fill(null).map((el, i) => {
        const active = i  === props.currentNote;
       
        return (
        <input 
            onChange={() => props.checkHandler()} 
            disabled={active} 
            type="checkbox"
            key={i} 
            id={i}>
        </input>
        )
    });
    console.log(props)
    return (
        <div className="Pads">
           {pads}
        </div>
    )
}

export default pads;