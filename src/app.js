import Sample from './sample/sample';
import Metronome from './metronome/metronome';

import hat from './audioFiles/HAT.wav';
import kik from './audioFiles/KIK.wav';

const btnHat = document.getElementById('play-hat');
const btnKik = document.getElementById('play-kik');
// const btnMetronome = document.getElementById('start-metronome');

const audioCtx = new AudioContext();
const hatSample = new Sample(audioCtx, hat);
const kikSample = new Sample(audioCtx, kik);
hatSample.loadSample();
kikSample.loadSample();
// btnMetronome.addEventListener('click', metronomeHandler)
// btnHat.addEventListener('click', () => playHandler(hatSample));
// btnKik.addEventListener('click', () => playHandler(kikSample));

// function playHandler(sample) {
//     if(audioCtx.state !== 'running') {
//         audioCtx.resume();
//     }
//     sample.playSample();
// };


const m1 = new Metronome(audioCtx, [kikSample, hatSample])
