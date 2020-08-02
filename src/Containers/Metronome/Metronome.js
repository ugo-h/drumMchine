import React, { Component } from 'react';
import './Metronome.css';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempo: 60,
        }
        this.noteTime = (60 / this.tempo) / 2;
        this.samples = props.samples;//change samples array to object
        this.ctx = props.audioCtx;
        this.currentNote = 0;
        this.nextNoteTime = 0;
        this.scheduleAheadTime = 0.1;
        this.lookahead = 25.0;
    }

    componentDidMount() {
        //load all samples
        this.samples.forEach((sample) =>  sample.loadSample())
    }

    metronomeHandler() {
        console.log('begin', this.ctx.state)
        if(this.ctx.state === 'running') {
            this.ctx.suspend();
            window.clearTimeout(this.timerID);
            console.log('timer cleared')
            return
        }
        
        console.log('run')
        this.ctx.resume();
        this.scheduler();
        return;
    }

    scheduler() {//schedules notes in a loop for specific timing
        while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentNote, this.nextNoteTime);
            this.nextNote();
        }
        this.timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead);
    }
    scheduleNote(beatNumber, time) {
        this.samples[0].playSample(time);
        if(beatNumber % 4 === 0) {
            this.samples[1].playSample(time)
        }
    }
    nextNote() {
        
        const secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime +=  secondsPerBeat;
        this.currentNote++;
        if(this.currentNote == 4) {//when 4 bars pased
            this.currentNote = 0;
        }
        
    }

    tempoChangeHandler (event) {
        const tempo = event.currentTarget.value;
        this.setState({ tempo })
    }

    render() {
        return(
            <div className="Metronome">
                <p>Tempo: {this.state.tempo}</p>
                <button onClick={this.metronomeHandler.bind(this)}>Start</button>
                <input onInput={this.tempoChangeHandler.bind(this)} type="range" min="60" max="180"></input>
            </div>
        )
    }
}

export default Metronome;