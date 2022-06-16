export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.timerId = null;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.view.renderStartScreen();
    }

    updateView() {
        const state = this.game.getState();
        if (state.isGameOver) {
            this.view.renderGameOver(state);
        }
        else {
            this.view.render(this.game.getState());
        }

    }

    freeFall() {
        this.game.movePieceDown();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
    }

    reset() {
        this.game.reset();
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.timerId) {
            this.timerId = setInterval(() => {
                this.freeFall();
            }, speed > 0 ? speed : 100); // restriction for level 10 or higher
        }
    }

    stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }


    handleKeyDown(event) {
        const state = this.game.getState();

        if (this.isPlaying && state.isGameOver === false) {
            switch (event.keyCode) {
                case 13: // enter
                    if (this.isPlaying) {
                        this.pause();
                        this.view.renderPauseScreen();
                    }
                    break;
                case 37: // left arrow
                    game.movePieceLeft();
                    this.updateView();
                    break;
                case 38: // up arrow
                    game.rotatePiece();
                    this.updateView();
                    break;
                case 39: // right arrow
                    game.movePieceRight();
                    this.updateView();
                    break;
                case 40: // down arrow
                    this.stopTimer();
                    game.movePieceDown();
                    this.updateView();
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case 13: // enter
                    if (state.isGameOver === true) {
                        this.reset();
                        this.play();
                        console.log('Enter is pressed while isGameOver === true');
                    }
                    else if (this.isPlaying) {
                        this.pause();
                        console.log('Enter is pressed while isPlaying === true2');
                    }
                    else {
                        this.play();
                        console.log('Enter is pressed while isPlaying === false2');
                    }
                    this.updateView();
                    break;
            }
        }
    }

    handleKeyUp(event) {
        switch (event.keyCode) {
            case 40: // down arrow
                this.startTimer();
                break;
        }
    }
}