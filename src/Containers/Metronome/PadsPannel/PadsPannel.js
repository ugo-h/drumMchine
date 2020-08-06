import React from 'react';
import './PadsPannel.css';
import PadsControls from './PadsControls/PadsControls';
import Pads from './Pads/Pads';

const padsPannel = (props) => {
    
   return( 
   <div className="PadsPannel">
        <PadsControls
            dcrBeatsPerBarHandler={props.dcrBeatsPerBarHandler}
            incrBeatsPerBarHandler={props.incrBeatsPerBarHandler}
        />
        <Pads 
            beatsPerBar={props.beatsPerBar}
            currentNote={props.currentNote}
            checkHandler={props.checkHandler}
        />
        
    </div>
    );
};

export default padsPannel;