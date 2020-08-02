import React from 'react';
import './App.css';
// import Sample from '../../sample/sample';
import Metronome from '../../Containers/Metronome/Metronome';
import hat from '../../audioFiles/HAT.wav';
import kik from '../../audioFiles/KIK.wav';
window.AudioContext = window.AudioContext || window.webkitAudioContext;

class Sample {
    constructor(audioCtx, filepath) {
        this.ctx = audioCtx;//audio context
        this.filepath = filepath;
        this.sampleIsLoaded = false;
    }
//fetching audionfile
    loadSample() {
        const res =  fetch(this.filepath)
        .then((res)=> {
            return res.arrayBuffer();
            
        }).then((arrayBuff) => {
            return this.ctx.decodeAudioData(arrayBuff);
            
        }).then((sample) => {
            this.sample = sample;
            this.sampleIsLoaded = true;
            console.log('loaded', sample)
        });
    }

    playSample(time) {
        const sampleSource = this.ctx.createBufferSource();
        sampleSource.buffer = this.sample;
        sampleSource.connect(this.ctx.destination);
        sampleSource.start(time);
        return sampleSource;
    }
}

const audioCtx = new AudioContext();

const App = () => {
    return (
        <div className="App">
            <Metronome audioCtx = {audioCtx} samples = {[new Sample(audioCtx, hat), new Sample(audioCtx, kik)]}/>
        </div>
    )
}

export default App;