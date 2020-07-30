//everything needs to be refactored classbased
class Sample {
    constructor(audioCtx, filepath) {
        this.ctx = audioCtx;//audio context
        this.filepath = filepath;
        this.sampleIsLoaded = false;
    }
//fetching audionfile
    async loadSample() {
        const res = await fetch(this.filepath);
        const arrayBuff = await res.arrayBuffer();
        this.sample = await this.ctx.decodeAudioData(arrayBuff);
        this.sampleIsLoaded = true;
    }

    async playSample(time) {
        if(!this.sampleIsLoaded) {
            await this.loadSample()
        }
        const sampleSource = this.ctx.createBufferSource();
        sampleSource.buffer = this.sample;
        sampleSource.connect(this.ctx.destination);
        sampleSource.start(time);
        return sampleSource;
    }
}

export default Sample;
