import Constants from "../constants";

export default class Instructions extends Phaser.Scene{

    private width: number;
    private height: number;

    private returnToMenuText: Phaser.GameObjects.BitmapText;
    private instructionText: Phaser.GameObjects.BitmapText;
    private instructionText2: Phaser.GameObjects.BitmapText;

    private escKey: Phaser.Input.Keyboard.Key;

    constructor(){
        super(Constants.SCENES.INSTRUCTIONS);
    }

    init(): void{
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        
    }

    create(): void{
        //Creamos el texto
        this.instructionText = this.add.bitmapText(50, 200, Constants.FONTS.BITMAP, "WASD OR ARROW KEYS TO MOVE", 20);
        this.instructionText2 = this.add.bitmapText(50, 300, Constants.FONTS.BITMAP, "YOU ALSO CAN JUMP WITH THE SPACE KEY", 20);
        this.returnToMenuText = this.add.bitmapText(0, 0, Constants.FONTS.BITMAP, "RETURN TO MENU (ESC)", 20).setInteractive();

        //anyadimos el boton ESC a la variable
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Evento si hago click en el texto. Vuelvo al menu
        this.returnToMenuText.on('pointerdown', () => {                      
            this.scene.stop(Constants.SCENES.INSTRUCTIONS)
            this.scene.start(Constants.SCENES.MENU);            
        });
    }

    update(): void {
        //Evento si pulso ESC. Vuelvo al menu
        if (this.escKey.isDown){
            this.scene.stop(Constants.SCENES.INSTRUCTIONS)
            this.scene.start(Constants.SCENES.MENU);  
        }
    }
}