import 'phaser';
import Settings from './settings';

export class Game extends Phaser.Game {
    constructor(settings: Phaser.Types.Core.GameConfig) {
        super(settings);
    }
}

//Esto hace que el juego se inicie cada vez que cargo la pagina del navegador
window.addEventListener('load', () => {
    const game = new Game(Settings);
});

