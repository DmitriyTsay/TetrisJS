import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 320, 640, 25, 10);


window.game = game;
window.view = view;

view.renderPlayfield(game.getState());
// console.log(game);
// console.log(game.activePiece.x);