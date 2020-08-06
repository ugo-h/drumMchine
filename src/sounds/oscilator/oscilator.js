class Beep {
    constructor(audioCtx, duration) {
        this.ctx = audioCtx;//audio context
        this.duration = duration;
        this.sound = this.ctx.createOscillator();
        
    }

    loadSample() {
        console.log(1)
    }
    playSample(time) {
        this.sound.connect(this.ctx.destination);
        this.sound.start(time);
        this.sound.stop(time+1)
        return this.sound;
    }
}

export default Beep;
