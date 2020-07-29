//everything needs to be refactored classbased

//fetching audionfile, decoding and return buffer
async function getFile(audioCtx, filepath) {
    const res = await fetch(filepath);
    const arrayBuff = await res.arrayBuffer();
    const audioBuff = await audioCtx.decodeAudioData(arrayBuff);
    return audioBuff;
}
//need change for multiple files
async function setupSample(audioCtx) {
    const filePath = './audioFiles/HAT.wav';
    const sample = await getFile(audioCtx, filePath);
    return sample

}
//need to add gain and other modifications
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
    console.log('run')
    if(audioCtx.state !== 'running') {
        audioCtx.resume();
    }
    setupSample(audioCtx)
    .then((sample)=> {
        playSample(audioCtx, sample)
});
}