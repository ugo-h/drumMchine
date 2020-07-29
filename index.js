async function getFile(audioCtx, filepath) {
    const res = await fetch(filepath);
    const arrayBuff = await res.arrayBuffer();
    const audioBuff = await audioCtx.decodeAudioData(arrayBuff);
    return audioBuff;
}

async function setupSample(audioCtx) {
    const filePath = './audioFiles/HAT.wav';
    const sample = await getFile(audioCtx, filePath);
    return sample

}

function playSample(audioCtx, audioBuff) {
    const sampleSource = audioCtx.createBufferSource();
    sampleSource.buffer = audioBuff;
    sampleSource.connect(audioCtx.destination);
    sampleSource.start();
    return sampleSource;
}

const btn = document.querySelector('button');
btn.addEventListener('click', playHandler);
const audioCtx = new AudioContext();



function playHandler() {
    if(audioCtx.state !== 'running') {
        audioCtx.resume();
    }
    setupSample(audioCtx)
    .then((sample)=> {
        playSample(audioCtx, sample)
});
}