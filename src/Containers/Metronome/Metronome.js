import React, { Component } from 'react';
import './Metronome.css';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempo: 60,
            currentNote: 0,
            isRunning: false
        }
        this.noteTime = (60 / this.tempo) / 2;
        this.samples = props.samples;//change samples array to object
        this.ctx = props.audioCtx;
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
            this.setState({isRunning:false})
            window.clearTimeout(this.timerID);
            console.log('timer cleared')
            return
        }
        this.setState({isRunning:true})
        console.log('run')
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
        this.samples[0].playSample(time);
        if(beatNumber % 4 === 0) {
            this.samples[1].playSample(time)
        }
    }
    nextNote() {
        
        const secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime +=  secondsPerBeat;
        let currentNote = this.state.currentNote;
        currentNote++;
        if(currentNote == 4) {//when 4 bars pased
            currentNote = 0;
        }
        this.setState({currentNote})
    }

    tempoChangeHandler (event) {
        const tempo = event.currentTarget.value;
        this.setState({ tempo })
    }

    render() {
        const pads = new Array(4).fill(null).map((el, i) => {
            if(i === 3) i=-1
            const active = i+1 === this.state.currentNote;
            return (<input disabled={active} type="checkbox" key={i}></input>)
        })
        
        return(
            <div className="Metronome">
                <div className="Metronome__head">
                    <button onClick={this.metronomeHandler.bind(this)}>{this.state.isRunning? "STOP": "START"}</button>
                    <input onInput={this.tempoChangeHandler.bind(this)} type="range" min="60" max="180"></input>
                    <p>{this.state.tempo} bpm</p>
                </div>
                <div className="Pads">{pads}</div>
            </div>
        )
    }
}

export default Metronome;