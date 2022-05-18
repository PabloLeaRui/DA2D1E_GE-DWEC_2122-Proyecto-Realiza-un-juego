import Constants from "../constants";
import DatabaseManager from "../database/databaseManager";

export default class Menu extends Phaser.Scene {
private width: number;
private height: number;

private menuSoundtrack: Phaser.Sound.BaseSound;

private database: DatabaseManager;

private backgroundImage: Phaser.GameObjects.TileSprite;

    constructor(){
        super('Menu');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        //Para todo el sonido, esto es porque anteiormente no se paraba todo el audio. Con esta linea nos aseguramos de ello
        this.sound.stopAll();
        this.database = new DatabaseManager();
    }

    preload(){
        //Carga sonidos
        this.menuSoundtrack = this.sound.add(Constants.SOUNDS.SOUNDTRACK.ID+0, {loop:true});
        this.menuSoundtrack.play();
    }

    create(){
        const logo = this.add.image(this.width/2, 70, 'logo1');

        const playTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(50, this.height/2, Constants.FONTS.BITMAP, Constants.MENU.PLAY, 25).setInteractive();

        const instructionsTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(this.width/2 + 50, this.height/2, Constants.FONTS.BITMAP, Constants.MENU.INSTRUCTIONS, 25).setInteractive();

        const highestScoreTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(100, this.height - 100, Constants.FONTS.BITMAP, Constants.MENU.HIGHESTSCORE + this.database.data.scores["level1"], 25);

        this.backgroundImage = this.add.tileSprite(0, 0, this.width, this.height, Constants.BACKGROUNDS.MENU)./*Para poner origen*/setOrigin(0, 0)./*Para que este en el fondo*/setDepth(-1);

        instructionsTxt.on('pointerdown', () => {                      
            this.scene.start(Constants.SCENES.INSTRUCTIONS);   
        });

        this.changeScene(playTxt, 'Level1');
    }
    
    /**
     * Cuando se pulse sobre el textoBitmap nos va a llevar a la escena indicada
     * @param playTxt 
     * @param scene 
     */
    changeScene(playTxt: Phaser.GameObjects.BitmapText, scene: string) {
            playTxt.on('pointerdown', ()=>{
                this.cameras.main.fade(700,0,0,0);
                this.cameras.main.on("camerafadeoutcomplete", () =>{
                    this.sound.stopAll();
                    this.scene.start(scene);
                    this.scene.start(Constants.SCENES.HUD);
                    this.scene.bringToTop(Constants.SCENES.HUD);
                    });
            });
    }

}


