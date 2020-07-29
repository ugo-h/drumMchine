class SoundMachine {
    constructor(id) {
        this._init(id);
        this.state = {
            isRunning: false
        }
    }

    _init(id) {
        this._body = document.getElementById(id);
        this._sound = this._body.querySelector('audio');
        this._ctx = new AudioContext();
        const destination = this._ctx.destination;
        this._initBtns()

        
        
    }

    _initBtns() {
        const btnStart = this._body.querySelector('button');
        btnStart.addEventListener('click', this.startHandler);
    }

    startHandler = (event) => {
        this._sound.play();
    }

}

const soundMachine = new SoundMachine('metronome');