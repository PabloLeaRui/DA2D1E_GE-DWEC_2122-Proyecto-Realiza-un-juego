import Level1 from "./scenes/level1";
import Load from "./scenes/load";
import Menu from "./scenes/menu";
import HUD from "./scenes/hud";
import Win from "./scenes/win";
import Pause from "./scenes/pause";
import GameOver from "./scenes/gameover";
import Instructions from "./scenes/instructions";

const Settings = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 810,
        height: 477,
    },
    scene: [Load, Menu, Level1, HUD, Win, Pause, GameOver, Instructions],
    pixelArt: true,
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 600},
            debug: false
        }
    }
};

export default Settings;