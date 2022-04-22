class Drumkit {
	constructor() {
		this.pads = document.querySelectorAll('.pad');
		this.hihatAudio = document.querySelector('.hihat-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.kickAudio = document.querySelector('.kick-sound');
		this.play = document.querySelector('.play');
		this.selects = document.querySelectorAll('select');
		this.tempo = document.querySelector('.tempo-range');
		this.muteBtn = document.querySelectorAll('.mute');
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
	}
	active() {
		this.classList.toggle('active');
	}

	changeTrack(e) {
		const trackName = e.target.name;
		const trackValue = e.target.value;
		switch (trackName) {
			case 'hihat-select': {
				this.hihatAudio.src = trackValue;
				break;
			}
			case 'snare-select': {
				this.snareAudio.src = trackValue;
				break;
			}
			case 'kick-select': {
				this.kickAudio.src = trackValue;
				break;
			}
		}
	}

	repeat() {
		let step = this.index % 8;
		const activeBars = document.querySelectorAll(`.b${step + 1}`);
		activeBars.forEach((bar) => {
			bar.style.animation = 'play 0.3s alternate ease-in-out 2';
			bar.addEventListener('animationend', () => {
				bar.style.animation = '';
			});
			if (bar.classList.contains('active')) {
				if (bar.classList.contains('hihat-pad')) {
					this.hihatAudio.currentTime = 0;
					this.hihatAudio.play();
				}
				if (bar.classList.contains('snare-pad')) {
					this.snareAudio.currentTime = 0;
					this.snareAudio.play();
				}
				if (bar.classList.contains('kick-pad')) {
					this.kickAudio.currentTime = 0;
					this.kickAudio.play();
				}
			}
		});
		this.index++;
	}

	start() {
		const interval = (60 / this.bpm) * 1000;
		if (!this.isPlaying) {
			this.isPlaying = setInterval(() => {
				this.repeat();
			}, interval);
		} else {
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		}
	}

	muteSound(e) {
		const track = e.target.getAttribute('data-track');
		switch (track) {
			case '0': {
        if(!e.target.classList.contains('active')){
				this.hihatAudio.volume = 0;
				e.target.classList.add('active');
      }else{
        this.hihatAudio.volume = 1;
				e.target.classList.remove('active');
      }
				break;
			}
      case '1': {
        if(!e.target.classList.contains('active')){
				this.snareAudio.volume = 0;
				e.target.classList.add('active');
      }else{
        this.snareAudio.volume = 1;
				e.target.classList.remove('active');
      }
				break;
			}
      case '2': {
        if(!e.target.classList.contains('active')){
				this.kickAudio.volume = 0;
				e.target.classList.add('active');
      }else{
        this.kickAudio.volume = 1;
				e.target.classList.remove('active');
      }
				break;
			}
		}
	}

	updateBtn() {
		if (!this.isPlaying) {
			this.play.innerText = 'Stop';
			this.play.classList.add('active');
		} else {
			this.play.innerText = 'Play';
			this.play.classList.remove('active');
		}
	}
	updateTemo(e) {
		const tempoNr = document.querySelector('.tempo-nr');
		tempoNr.innerText = e.target.value;
	}

	changeTempo(e) {
		const playBtn = document.querySelector('.play');
		this.bpm = e.target.value;
		clearInterval(this.isPlaying);
		this.isPlaying = null;
		if (playBtn.classList.contains('active')) {
			this.start();
		}
	}
}

const drumKit = new Drumkit();

//Event Listeners
drumKit.pads.forEach((pad) => {
	pad.addEventListener('click', drumKit.active);
});

drumKit.play.addEventListener('click', () => {
	drumKit.updateBtn();
	drumKit.start();
});

drumKit.selects.forEach((select) => {
	select.addEventListener('change', (e) => {
		drumKit.changeTrack(e);
	});
});

drumKit.muteBtn.forEach((mute) => {
	mute.addEventListener('click', (e) => {
		drumKit.muteSound(e);
	});
});

drumKit.tempo.addEventListener('input', (e) => {
	drumKit.updateTemo(e);
});

drumKit.tempo.addEventListener('change', (e) => {
	drumKit.changeTempo(e);
});
