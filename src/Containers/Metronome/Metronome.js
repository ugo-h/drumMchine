import React, { Component } from 'react';
import './Metronome.css';
import Pads from './Pads/Pads';
import PlayIcon from '../../images/play.svg';
import PauseIcon from '../../images/pause.svg';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempo: 60,
            currentNote: 0,
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
        this.samples[0].playSample(time);
        console.log(this.checkedNotesArr[beatNumber])
        if(this.checkedNotesArr[beatNumber]) {
            this.samples[1].playSample(time)
        }
    }
    nextNote() {
        
        const secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime +=  secondsPerBeat;
        let currentNote = this.state.currentNote;
        currentNote++;
        if(currentNote == this.state.beatsPerBar) {//when chosen amount of bars pased
            currentNote = 0;
        }
        this.setState({currentNote})
    }

    tempoChangeHandler (event) {
        const tempo = event.currentTarget.value;
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
        const id = event.target.id
        this.checkedNotesArr[id] = event.target.checked;
    }

    render() {
        return(
            <div className="Metronome">
                <div className="Metronome__head">
                    <button onClick={this.metronomeHandler.bind(this)}>
                        {this.state.isRunning? <PauseIcon/>:<PlayIcon/>}
                    </button>
                    <input onInput={this.tempoChangeHandler.bind(this)} type="range" min="60" max="180"></input>
                    <p>{this.state.tempo} bpm</p>
                </div>
                <Pads 
                    currentNote = {this.state.currentNote}
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