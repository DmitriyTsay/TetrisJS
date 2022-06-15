export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.timerId = null;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

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
        if (this.isPlaying) {
            switch (event.keyCode) {
                case 13: // enter
                    if (this.isPlaying) {
                        this.pause();
                        this.view.renderPauseScreen();
                    }
                    else {
                        this.play();
                        this.updateView();
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
                    game.movePieceDown();
                    this.updateView();
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case 13: // enter
                    if (this.isPlaying) {
                        this.pause();
                    }
                    else {
                        this.play();
                    }
                    this.updateView();
                    break;
            }
        }
    }
}