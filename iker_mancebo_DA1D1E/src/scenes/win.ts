import Constants from "../constants";
import DatabaseManager from "../database/databaseManager";

export default class Win extends Phaser.Scene {

    private width: number;
    private height: number;

    private backgroundImage: Phaser.GameObjects.TileSprite;

    private scoreText: Phaser.GameObjects.BitmapText;
    private higherScoreText: Phaser.GameObjects.BitmapText;
    private return: Phaser.GameObjects.BitmapText;

    private escKey: Phaser.Input.Keyboard.Key;

    private score: number;

    constructor() {
        super(Constants.SCENES.WIN);
    }

    init(data:any): void {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.score = data.score;
    }

    create(): void{
        //Cremos el objeto para manejar la base de datos
        let DB: DatabaseManager = new DatabaseManager();

        if (this.score > parseInt(DB.data.scores["level1"])) {
            DB.data.scores["level1"] = this.score;
            DB.saveDB();
        }

        this.backgroundImage = this.add.tileSprite(0, 0, this.width, this.height, Constants.BACKGROUNDS.WIN)./*Para poner origen*/setOrigin(0, 0)./*Para que este en el fondo*/setDepth(-1);
        this.scoreText = this.add.bitmapText((this.width / 2) -400 , 100, Constants.FONTS.BITMAP, "YOUR SCORE: " + this.score, 20);
        this.higherScoreText = this.add.bitmapText((this.width / 2) -400 , 200, Constants.FONTS.BITMAP, "HIGHER SCORE: " + DB.data.scores["level1"], 20);
        this.return = this.add.bitmapText((this.width / 2) -200, this.height / 2 +100, Constants.FONTS.BITMAP, "RETURN TO MENU (ESC)", 20).setInteractive();

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Eventos para el texto return
        this.return.on('pointerdown', () => {
            this.returnToMenu();
        });

        // this.setHigherScoreInDB();
    }

    update(): void {
        //mover el fondo
        this.backgroundImage.tilePositionY -= 0.7;

        //Comprueba si pulso el boton R
        if (this.escKey.isDown){
            this.returnToMenu();
        }
    }

    private returnToMenu(){
        this.scene.stop(Constants.SCENES.WIN);
        this.scene.start(Constants.SCENES.MENU);
    }

}