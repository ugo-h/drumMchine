class Metronome {
    constructor(audioCtx, samples) {
        this.tempo = 80;
        this.noteTime = (60 / this.tempo) / 2;
        this.samples = samples;
        this.ctx = audioCtx;
        this.isRunning = false;
        this.btnStart = document.getElementById('start-metronome');
        this.btnStart.addEventListener('click', () => this.metronomeHandler());
    }
    metronomeHandler() {
        console.log(this.isRunning)
        if(this.isRunning) {
            this.isRunning = false;
            return;
        }
        this.isRunning = true;
        this.run(); 
    }

    run() {
        const startTime = this.ctx.currentTime + 0.100;
        for(let bar = 0; bar < 4; bar++) {
            console.log(1)
            let time = startTime + bar * 4 * this.noteTime;
            this.samples[0].playSample(time);
            for(let i = 0; i < 4; i++) {
                this.samples[1].playSample(time + i * this.noteTime);
            }
        }
    }
}

export default Metronome;