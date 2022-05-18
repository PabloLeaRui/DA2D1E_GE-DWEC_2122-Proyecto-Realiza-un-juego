import Constants from "../constants";

export default class Pause extends Phaser.Scene{

    private width: number;
    private height: number;

    private backgroundImage: Phaser.GameObjects.TileSprite;

    private resume: Phaser.GameObjects.BitmapText;
    private restart: Phaser.GameObjects.BitmapText;
    private returnToMenuText: Phaser.GameObjects.BitmapText;
    private escKey: Phaser.Input.Keyboard.Key;
    private rKey: Phaser.Input.Keyboard.Key;

    constructor(){
        super(Constants.SCENES.PAUSE);
    }

    init(): void{
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void{
        //Fondo
        this.backgroundImage = this.add.tileSprite(0, 0, this.width, this.height, Constants.BACKGROUNDS.PAUSE)./*Para poner origen*/setOrigin(0, 0)./*Para que este en el fondo*/setDepth(-1);
        this.resume = this.add.bitmapText(200 , this.height / 2 -100, Constants.FONTS.BITMAP, "RESUME (ESC)", 20).setInteractive();
        this.restart = this.add.bitmapText(200 , this.height / 2, Constants.FONTS.BITMAP, "RESTART (R)", 20).setInteractive();
        this.returnToMenuText = this.add.bitmapText(200 , this.height / 2 +100, Constants.FONTS.BITMAP, "RETURN TO MENU", 20).setInteractive();
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //Eventos para el texto resume
        this.resume.on('pointerdown', () => {
            this.events.emit(Constants.EVENTS.PAUSE);
        });

        //Eventos paraa el texto restart
        this.restart.on('pointerdown', () => {
            this.events.emit(Constants.EVENTS.RESTART);
        });

         //Eventos para el texto return to Menu
        this.returnToMenuText.on('pointerdown', () => {
            this.events.emit(Constants.EVENTS.PAUSE);
            this.events.emit(Constants.EVENTS.RETURNMENU);
        });
    }

    update(): void {
        //Cpmpruebo si pulso ESC y ejecuto el evento creado en Level1
        if (this.escKey.isDown){
            this.events.emit(Constants.EVENTS.PAUSE);
        }

        //Compruebo si pulso R y ejecuto el evento creado en Level1
        if (this.rKey.isDown){
            this.events.emit(Constants.EVENTS.RESTART);
        }
        
    }
}