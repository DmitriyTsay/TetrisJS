export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }

    handleKeyDown() {
        switch (event.keyCode) {
            case 37: // left arrow
                game.movePieceLeft();
                view.render(game.getState());
                break;
            case 38: // up arrow
                game.rotatePiece();
                view.render(game.getState());
                break;
            case 39: // right arrow
                game.movePieceRight();
                view.render(game.getState());
                break;
            case 40: // down arrow
                game.movePieceDown();
                view.render(game.getState());
                break;
        }
    }
}