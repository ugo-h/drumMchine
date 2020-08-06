import React, { Component } from 'react';
import './Metronome.css';
import MetronomeHeader from './MetromoneHeader/MetronomeHeader'
import PadsPannel from './PadsPannel/PadsPannel';


class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempo: 120,
            currentNote: 3,
            beatsPerBar: 4,
            isRunning: false
        }
        this.noteTime = (60 / this.tempo) / 2;
        this.samples = props.samples;//change samples array to object
        this.ctx = props.audioCtx;
        this.ctx.suspend();
        this.nextNoteTime = 0;
        this.scheduleAheadTime = 0.1;
        this.lookahead = 25.0;
        this.checkedNotesArr = new Array(this.state.beatsPerBar).fill(false)
    }

    componentDidMount() {
        //load all samplesk
        this.samples.forEach((sample) =>  sample.loadSample())
    }

    metronomeHandler() {
        if(this.ctx.state === 'running') {
            this.ctx.suspend();
            this.setState({isRunning:false})
            window.clearTimeout(this.timerID);
            return
        }
        this.setState({isRunning:true})
        this.ctx.resume();
        this.scheduler();
        return;
    }

    scheduler() {//schedules notes in a loop for specific timing
        while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.state.currentNote, this.nextNoteTime);
            this.nextNote();
        }
        this.timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead);
    }
    scheduleNote(beatNumber, time) {
        const osc = this.ctx.createOscillator();
        osc.connect( this.ctx.destination );
        
        osc.frequency.value = 440.0;
        if (beatNumber === this.state.beatsPerBar-1 ) {   // quarter notes = medium pitch
            osc.frequency.value = 880.0;
        }
        osc.start( time );
        osc.stop( time + 0.05 );
        // this.samples[0].playSample(time);
        // if(beatNumber === this.state.beatsPerBar-1) {
        //     this.samples[1].playSample(time)
        // }
    }
    nextNote() {
        
        const secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime +=  secondsPerBeat;
        let currentNote = this.state.currentNote;
        currentNote++;
        if(currentNote >= this.state.beatsPerBar) {//when chosen amount of bars pased
            currentNote = 0;
        }
        this.setState({currentNote})
    }

    tempoChangeHandler (event) {
        const tempo = parseInt(event.currentTarget.value);
        this.setState({ tempo })
    }

    tempoChangeByHandler(amount) {
        const tempo = this.state.tempo + amount;
        this.setState({ tempo })
    }   

    incrBeatsPerBarHandler() {
        let { beatsPerBar } = this.state;
        if(beatsPerBar > 8) {
            return
        }
        beatsPerBar++;
        this.setState({beatsPerBar});
    }

    dcrBeatsPerBarHandler(){
        let { beatsPerBar } = this.state;
        if(beatsPerBar <= 2) {
            return
        }
        beatsPerBar--;
        this.setState({beatsPerBar});
    }

    checkHandler() {
        console.log("checkf")
        let id = event.target.id
        this.checkedNotesArr[id-1] = event.target.checked;
    }

    render() {
        return(
            <div className="Metronome">
                <MetronomeHeader
                    tempoChangeByHandler={this.tempoChangeByHandler.bind(this)}
                    metronomeHandler={this.metronomeHandler.bind(this)}
                    tempo={this.state.tempo}
                    tempoChangeHandler={this.tempoChangeHandler.bind(this)}
                    isRunning={this.state.isRunning}
                />
                <PadsPannel
                    samples={this.samples}
                    currentNote={this.state.currentNote}
                    beatsPerBar={this.state.beatsPerBar}
                    checkHandler = {this.checkHandler.bind(this)}
                    incrBeatsPerBarHandler={this.incrBeatsPerBarHandler.bind(this)}
                    dcrBeatsPerBarHandler={this.dcrBeatsPerBarHandler.bind(this)}
                />
            </div>
        )
    }
}

export default Metronome;