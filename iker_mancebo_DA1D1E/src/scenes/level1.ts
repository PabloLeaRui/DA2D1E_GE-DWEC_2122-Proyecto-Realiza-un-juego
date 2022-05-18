import Constants from "../constants";
import Player from "../gameobjects/player";
import Enemies from "../gameobjects/enemies";
import MovingPlatforms from "../gameobjects/movingPlatforms";
import Collectibles from "../gameobjects/collectibles";

export default class Level1 extends Phaser.Scene {
    private width: number;
    private height: number;

    public lifes: number;
    public score: number;

    //Para el tilemap
    public tileMap: Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private tilemapLayer: Phaser.Tilemaps.TilemapLayer;
    private tilemapBackgroundLayer: Phaser.Tilemaps.TilemapLayer;

    //Para el fondo
    private backgroundImage: Phaser.GameObjects.TileSprite;

    //Para el jugador
    private player: Player;

    //Controlar los inputs
    private escKey: Phaser.Input.Keyboard.Key;

    //tiempo nivel
    private seconds: number;
    private timeLeft: number;
    private timeOut: boolean;

    //enemies
    private bunnyGroup: Enemies;
    private radishGroup: Enemies;
    private mushroomGroup: Enemies;

    //plataformas moviles
    private movingPlatformsX: MovingPlatforms;
    private movingPlatformsY: MovingPlatforms;

    //Sonido
    private levelSoundtrack: Phaser.Sound.BaseSound;

    //Recolectables o Coleccionables
    private bananasGroup: Collectibles;
    private pinepplesGroup: Collectibles;
    private cherriesGroup: Collectibles;

    constructor() {
        super(Constants.SCENES.LEVEL1);
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.lifes = 3;
        this.registry.set(Constants.REGISTRY.LIFES, this.lifes);
        this.score = 0;
        this.registry.set(Constants.REGISTRY.SCORE, this.score);

        this.seconds = 1;
        this.timeLeft = 180;
        this.timeOut = false;

        //Para todo el sonido, esto es porque anteiormente no se paraba todo el audio. Con esta linea nos aseguramos de ello
        this.sound.stopAll();
    }

    preload() {
        //Carga sonido y lo ejecuta con loop
        this.levelSoundtrack = this.sound.add(Constants.SOUNDS.SOUNDTRACK.ID+1, {loop:true});
        this.levelSoundtrack.play();
    }

    create() {
        //Cargar Tilemap
        this.tileMap = this.make.tilemap({ key: Constants.MAPS.LEVEL1.TILEMAPJSON, tileWidth: 16, tileHeight: 16 });

        this.tileSet = this.tileMap.addTilesetImage(Constants.MAPS.TILESET);

        this.tilemapLayer = this.tileMap.createLayer(Constants.MAPS.LEVEL1.PLATFORMLAYER, this.tileSet);
        //Anyadimos colision a las plataformas
        this.tilemapLayer.setCollisionByExclusion([-1]);
        //El mapa fisico del juego lo establecemos al ancho del mapa
        //Si no ponias esto, probocaba que no pudieses avanzar mas lejos de la pantalla inicial debido a que player tiene la caracteristica de no poder salirse de los limites del mundo
        this.physics.world.bounds.setTo(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
        //Creamos otra capa para cargar el background creado en el mapaJSON
        this.tilemapBackgroundLayer = this.tileMap.createLayer(Constants.MAPS.LEVEL1.BACKGROUNDLAYER, this.tileSet);
        this.tilemapBackgroundLayer.setDepth(-1);

        //Crear Jugador
        //Esto Crea el jugador en el punto exacto donde se encuentra definido en el tilemap
        this.tileMap.findObject(Constants.PLAYER.ID, (d: any) => {
            this.player = new Player(this, d.x, d.y, Constants.PLAYER.ID);
        });

        //Las camaras siguen al jugador
        this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
        this.cameras.main.startFollow(this.player);

        //ANYADIR COLISION ENTRE EL JUGADOR Y LA CAPA DEL NIVEL
        this.physics.add.collider(this.player, this.tilemapLayer);

        //Fondo
        this.backgroundImage = this.add.tileSprite(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels, Constants.BACKGROUNDS.LEVEL1)./*Para poner origen*/setOrigin(0, 0)./*Para que este en el fondo*/setDepth(-2);

        //Crea sprite con posicion final
        let finalObject: any = this.tileMap.createFromObjects(Constants.MAPS.FINISHPOINT, { name: Constants.MAPS.FINISHPOINT })[0];
        this.physics.world.enable(finalObject);
        finalObject.body.setAllowGravity(false);
        finalObject.setTexture(Constants.ITEMS.ENDPOINT.ID);
        finalObject.body.setSize(40, 50);
        finalObject.body.setOffset(10, 15);

        //Colision para final del nivel
        this.physics.add.collider(this.player, finalObject, () => this.goToWinScene());

        //Animaciones
        //Esperar
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.IDLE,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID,
                { prefix: Constants.PLAYER.ANIMATION.IDLE + "-", end: 10 }),
            frameRate: 20,
            repeat: -1
        });
        //Correr
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.RUN,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID,
                { prefix: Constants.PLAYER.ANIMATION.RUN + "-", end: 11 }),
            frameRate: 20,
            repeat: -1
        });
        //Salto en pared
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.WALLJUMP,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID,
                { prefix: Constants.PLAYER.ANIMATION.WALLJUMP + "-", end: 4 }),
            frameRate: 20,
            repeat: -1
        });
        //Salto
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.DJUMP,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID,
                { prefix: Constants.PLAYER.ANIMATION.DJUMP + "-", end: 5 }),
            frameRate: 20,
            repeat: -1
        });
        //Crea la animacion de la explosion de un enemigo
        this.anims.create({
            key: Constants.ENEMIES.EXPLOSION.ANIM,
            frames: Constants.ENEMIES.EXPLOSION.ID,
            frameRate: 15,
            repeat: 0
        })

        //Anyadir los enemigos obteniendolos de la capa de objetos del mapa
        this.bunnyGroup = new Enemies(this, Constants.MAPS.ENEMIES, Constants.ENEMIES.BUNNY.ID, Constants.ENEMIES.BUNNY.IMGLOCATION,Constants.ENEMIES.BUNNY.FRAMEWIDTH,Constants.ENEMIES.BUNNY.FRAMEHEIGHT, Constants.ENEMIES.BUNNY.SPEED);
        this.radishGroup = new Enemies(this, Constants.MAPS.ENEMIES, Constants.ENEMIES.RADISH.ID, Constants.ENEMIES.RADISH.IMGLOCATION,Constants.ENEMIES.RADISH.FRAMEWIDTH,Constants.ENEMIES.RADISH.FRAMEHEIGHT, Constants.ENEMIES.RADISH.SPEED);
        this.mushroomGroup = new Enemies(this, Constants.MAPS.ENEMIES, Constants.ENEMIES.MUSHROOM.ID, Constants.ENEMIES.MUSHROOM.IMGLOCATION,Constants.ENEMIES.MUSHROOM.FRAMEWIDTH,Constants.ENEMIES.MUSHROOM.FRAMEHEIGHT, Constants.ENEMIES.MUSHROOM.SPEED);
        //Anyado colision al grupo de enemigos con la capa del nivel del mapa
        this.physics.add.collider(this.bunnyGroup, this.tilemapLayer);
        this.physics.add.collider(this.radishGroup, this.tilemapLayer);
        this.physics.add.collider(this.mushroomGroup, this.tilemapLayer);

        //Cuando hay una contacto en el que sobrepasa el jugador con otro objeto
        this.physics.add.overlap(this.player, this.bunnyGroup, this.player.touchEnemy, null, this);
        this.physics.add.overlap(this.player, this.radishGroup, this.player.touchEnemy, null, this);
        this.physics.add.overlap(this.player, this.mushroomGroup, this.player.touchEnemy, null, this);

        //Anyadir plataformas moviles
        this.movingPlatformsX = new MovingPlatforms(this, Constants.MAPS.MOVINGPLATFORMS, Constants.ITEMS.MOVINGPLATFORM.ID, Constants.ITEMS.MOVINGPLATFORM.SPEED, true);

        this.movingPlatformsY = new MovingPlatforms(this, Constants.MAPS.MOVINGPLATFORMS, Constants.ITEMS.MOVINGPLATFORM.ID, Constants.ITEMS.MOVINGPLATFORM.SPEED, false);
        //Anyadir colision a las plataformas con el jugador
        this.physics.add.collider(this.player, [this.movingPlatformsX, this.movingPlatformsY]);
        this.physics.add.collider(this.tilemapLayer, [this.movingPlatformsX, this.movingPlatformsY]);

        //anyade recolectables o coleccionables
        this.bananasGroup = new Collectibles(this, Constants.MAPS.COLLECTIBLES, Constants.COLLECTIBLES.BANANA.ID, Constants.COLLECTIBLES.BANANA.ANIM);
        this.physics.add.overlap(this.player, this.bananasGroup, this.player.collect, null, this);

        this.pinepplesGroup = new Collectibles(this, Constants.MAPS.COLLECTIBLES, Constants.COLLECTIBLES.PINEAPPLE.ID, Constants.COLLECTIBLES.PINEAPPLE.ANIM);
        this.physics.add.overlap(this.player, this.pinepplesGroup, this.player.collect, null, this);
        
        this.cherriesGroup = new Collectibles(this, Constants.MAPS.COLLECTIBLES, Constants.COLLECTIBLES.CHERRY.ID, Constants.COLLECTIBLES.CHERRY.ANIM);
        this.physics.add.overlap(this.player, this.cherriesGroup, this.player.collect, null, this);

        //Se anyade el boton ESC a la variable
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //creo un evento en la escena pausa para poder usarlo en el mismo
        const pause: Phaser.Scene = this.scene.get(Constants.SCENES.PAUSE);
        pause.events.on(Constants.EVENTS.PAUSE, this.resumeGame, this)
        pause.events.on(Constants.EVENTS.RESTART, this.restartGame, this);
        pause.events.on(Constants.EVENTS.RETURNMENU, this.returnToMenu, this)
    }

    //Se ejecuta de 60fps
    update(time): void {

        if(this.escKey.isDown){this.pauseResumeGame()};

        //mover el fondo
        this.backgroundImage.tilePositionY -= 0.4;

        this.player.update();

        this.bunnyGroup.update();

        this.radishGroup.update();

        this.movingPlatformsX.update();
        this.movingPlatformsY.update();

        //Gestion del tiempo
            //Divido el valor entre 100 y redondeo el valor a la baja
        if ((this.seconds != Math.floor(Math.abs(time / 1000))) && !this.timeOut){
            this.seconds = Math.floor(Math.abs(time / 1000));
            this.timeLeft--;

            let minutes: number = Math.floor(this.timeLeft / 60);
            let seconds: number = Math.floor(this.timeLeft - (minutes * 60));

            let timerTxt: string = Phaser.Utils.String.Pad(minutes,2,"0",1) + ":" + Phaser.Utils.String.Pad(seconds,2,"0",1);
            //Registro
            this.registry.set(Constants.REGISTRY.TIMER, timerTxt);
            //envio al HUD
            this.events.emit(Constants.EVENTS.TIMER);

            if (this.timeLeft == 0){
                this.timeOut == true;
                this.gameOver();
            }
        }

        //Volver al menu si nos quedamos sin vidas o se nos acaba el tiempo
        if (this.lifes === 0 || this.timeOut){this.gameOver();};
    }

    public returnToMenu(): void{
            this.sound.stopAll();
            this.scene.stop(Constants.SCENES.LEVEL1);
            this.scene.stop(Constants.SCENES.HUD);
            this.scene.stop(Constants.SCENES.PAUSE);
            this.scene.start(Constants.SCENES.MENU);
    }

    private goToWinScene(): void{
        this.sound.stopAll();
        this.scene.stop(Constants.SCENES.LEVEL1);
        this.scene.stop(Constants.SCENES.HUD);
        //Score que vamos a enviar a la escena de Win
        let send = this.score + (this.timeLeft*10);
        this.scene.start(Constants.SCENES.WIN, {
            score: send
        });
    }

    private pauseResumeGame(): void {
        if (this.scene.isPaused(Constants.SCENES.LEVEL1)){
            this.sound.resumeAll();
            this.scene.resume(Constants.SCENES.LEVEL1);
            this.scene.resume(Constants.SCENES.HUD);
            this.scene.stop(Constants.SCENES.PAUSE);
            this.scene.bringToTop(Constants.SCENES.HUD);
        }else{
            this.sound.pauseAll();
            this.scene.pause(Constants.SCENES.LEVEL1);
            this.scene.pause(Constants.SCENES.HUD);
            this.scene.launch(Constants.SCENES.PAUSE);
            this.scene.bringToTop(Constants.SCENES.PAUSE);
        }
        ;
    }

    public resumeGame(): void {
        this.sound.resumeAll();
        this.scene.resume(Constants.SCENES.HUD);
        this.scene.resume(Constants.SCENES.LEVEL1);
        this.scene.stop(Constants.SCENES.PAUSE);
        this.scene.bringToTop(Constants.SCENES.HUD);
    }

    public restartGame(): void{
        this.sound.stopAll();
        this.scene.stop(Constants.SCENES.HUD);
        this.scene.stop(Constants.SCENES.LEVEL1);
        this.scene.stop(Constants.SCENES.PAUSE)
        this.scene.start(Constants.SCENES.HUD);
        this.scene.start(Constants.SCENES.LEVEL1);
        this.scene.bringToTop(Constants.SCENES.HUD);
    }

    private gameOver(): void{
        this.sound.stopAll();
        this.scene.stop(Constants.SCENES.HUD);
        this.scene.stop(Constants.SCENES.LEVEL1);
        this.scene.start(Constants.SCENES.GAMEOVER);
    }

}