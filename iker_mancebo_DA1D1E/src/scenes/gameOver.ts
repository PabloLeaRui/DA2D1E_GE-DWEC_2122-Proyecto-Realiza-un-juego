import Constants from "../constants";

export default class GameOver extends Phaser.Scene{
    private width: number;
    private height: number;

    private backgroundImage: Phaser.GameObjects.TileSprite;

    private gameOver: Phaser.GameObjects.BitmapText;
    private tryAgain: Phaser.GameObjects.BitmapText;
    private returnToMenuText: Phaser.GameObjects.BitmapText;
    private escKey: Phaser.Input.Keyboard.Key;
    private rKey: Phaser.Input.Keyboard.Key;

    constructor(){
        super(Constants.SCENES.GAMEOVER);
    }

    init(): void{
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void{
        //Fondo
        this.backgroundImage = this.add.tileSprite(0, 0, this.width, this.height, Constants.BACKGROUNDS.GAMEOVER)./*Para poner origen*/setOrigin(0, 0)./*Para que este en el fondo*/setDepth(-1);

        //Creamos el texto
        this.gameOver = this.add.bitmapText(180 , this.height / 2 -100, Constants.FONTS.BITMAP, "GAME OVER", 50).setInteractive();
        this.tryAgain = this.add.bitmapText(180 , this.height / 2 , Constants.FONTS.BITMAP, "TRY AGAIN (R)", 20).setInteractive();
        this.returnToMenuText = this.add.bitmapText(180 , this.height / 2 +100, Constants.FONTS.BITMAP, "RETURN TO MENU (ESC)", 20).setInteractive();

        //Anyadimos las teclas a sus variables
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //Eventos para el texto tryAgain
        this.tryAgain.on('pointerdown', () => {
            this.restartGame();
        });

        //Eventos par ael texto Return to Menu
        this.returnToMenuText.on('pointerdown', () => {
            this.returnToMenu();
        });
    }

    update(): void {
        //Cpmpruebo si pulso ESC y ejecuto el evento creado
        if (this.escKey.isDown){
            this.returnToMenu();
        }

        //Compruebo si pulso R y ejecuto el evento creado
        if (this.rKey.isDown){
            this.restartGame();
        }
}

    private restartGame(){
        this.scene.stop(Constants.SCENES.GAMEOVER);
        this.scene.start(Constants.SCENES.LEVEL1);
        this.scene.start(Constants.SCENES.HUD);
        this.scene.bringToTop(Constants.SCENES.HUD);
    }

    private returnToMenu():void {
        this.scene.stop(Constants.SCENES.GAMEOVER);
        this.scene.start(Constants.SCENES.MENU);
    }
}