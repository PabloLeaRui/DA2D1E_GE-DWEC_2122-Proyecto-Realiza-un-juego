import Constants from "../constants";

export default class HUD extends Phaser.Scene {

    private lifesTxt: Phaser.GameObjects.BitmapText;
    private pointsTxt: Phaser.GameObjects.BitmapText;
    private timerTxt: Phaser.GameObjects.BitmapText;


    private width: number;
    private height: number;

    constructor(){
        super('HUD');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void {
        //Para leer el evento que hay en level1
        //Primero tenemos que crear una variable con la escena level1
        const level1: Phaser.Scene = this.scene.get('Level1');
        level1.events.on(Constants.EVENTS.LIFES, this.refreshLifes, this/*Este this es simplemente para generar contexto (importante en js)*/);
        level1.events.on(Constants.EVENTS.SCORE, this.refreshScore, this);
        level1.events.on(Constants.EVENTS.TIMER, this.refreshTimer, this);

        this.lifesTxt = this.add.bitmapText(20, 20, Constants.FONTS.BITMAP, Constants.HUD.LIFES + this.registry.get(Constants.REGISTRY.LIFES), 20);
        
        this.pointsTxt = this.add.bitmapText(this.width - 100 ,20, Constants.FONTS.BITMAP, '000', 20);

        this.timerTxt = this.add.bitmapText(this.width /2 ,20,Constants.FONTS.BITMAP, '05:00', 20);
    }

    private refreshLifes(): void{
        this.lifesTxt.text = Constants.HUD.LIFES + this.registry.get(Constants.REGISTRY.LIFES);
    }

    private refreshScore(): void{
        this.pointsTxt.text = Phaser.Utils.String.Pad(this.registry.get(Constants.REGISTRY.SCORE), 3, '0', 1);
    }

    private refreshTimer(): void{
        this.timerTxt.text = this.registry.get(Constants.REGISTRY.TIMER);
    }
}

