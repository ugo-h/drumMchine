class Metronome {
    constructor(audioCtx, samples) {
        this.tempo = 80;
        this.noteTime = (60 / this.tempo) / 2;
        this.samples = samples;
        this.ctx = audioCtx;
        this.currentNote = 0;
        this.nextNoteTime = 0;
        this.scheduleAheadTime = 0.1;
        this.lookahead = 25.0;
        this.isRunning = false;
        this.btnStart = document.getElementById('start-metronome');
        this.tempoSlider = document.getElementById('tempo');
        this.btnStart.addEventListener('click', () => this.metronomeHandler());
        this.tempoSlider.addEventListener('input', (event) => this.tempoChangeHandler(event));
    }
    metronomeHandler() {
        console.log(this.isRunning)
        if(!this.isRunning) {
            this.isRunning = true;
            this.ctx.resume();
            this.scheduler();
            return;
        }
        this.isRunning = false;
        this.ctx.suspend();
        window.clearTimeout(this.timerID);
     
    }

    scheduler() {
        while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentNote, this.nextNoteTime);
            this.nextNote();
        }
        this.timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead);
    }
    scheduleNote(beatNumber, time) {
        
        this.samples[1].playSample(time);
        if(beatNumber % 4 === 0) {
            this.samples[0].playSample(time)
        }
    }
    nextNote() {
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime +=  secondsPerBeat;
        this.currentNote++;
        if(this.currentNote == 4) {
            this.currentNote = 0;
        }
        
    }

    tempoChangeHandler(event) {
        const tempo = event.currentTarget.value;
        this.tempo = tempo;
    }
}

export default Metronome;