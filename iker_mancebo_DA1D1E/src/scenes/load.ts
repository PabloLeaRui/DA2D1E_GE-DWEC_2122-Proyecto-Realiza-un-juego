import Constants from "../constants";

export default class Load extends Phaser.Scene {
    //Barra de Carga
    private loadBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor() {
        super(Constants.SCENES.LOAD);
    }

    preload(): void {
        //ESTO es para simular una carga de assets
        const loadingBar = document.getElementById('loadingBar');

        //Creamos una promesa con un setTimeout
        async function task() {
        return new Promise(res => {
            setTimeout(res, Math.random() * 1000);
        })
        }
        //Funcion para mostrar el progreso
        function loadingBarStatus(current, max) {
        loadingBar.textContent = `Loading ${current} of ${max}`;
        }
        //Espera y Mapeo asíncrono de un array de 100 promesas
        (async() => {
        let current = 1;
        const promises = new Array(100)
            .fill(0)
            .map(() => task().then(() => loadingBarStatus(current++, 100)));

        //Esperamos a que se realizen todas las promesas
        await Promise.all(promises);
        loadingBar.textContent = `Loading Finished`;
        //Eliminamos el div que estabamos usando
        loadingBar.outerHTML = "";
        
        })();



        /**
         * Listener cuando se hayan cargado todos los Assets
         */
        this.load.on('complete', function () {
            //Cargamos una fuente de tipo bitmap
            const fontJSON = this.cache.json.get(Constants.FONTS.JSON);
            this.cache.bitmapFont.add(Constants.FONTS.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fontJSON));
            
            //Corta la escena actual y se dirige a la que indiques
            this.scene.start(Constants.SCENES.MENU);
        },
            this
        );

        /**
         * Esto sirve para establecer un path en el que va a estar todo los objetos que va a cargar
         * Esto permite no tener que escribirlo al principio de todas las rutas
         */
        // this.load.path = "assets/";

        //Cargar los assets de juego
        this.load.image('logo1', 'assets/phaser3-logo.png');

        //Mapas
        this.load.tilemapTiledJSON(Constants.MAPS.LEVEL1.TILEMAPJSON, Constants.MAPS.LEVEL1.JSONLOCATION);
        this.load.image(Constants.MAPS.TILESET, Constants.MAPS.TILESETLOCATION);

        //Fondos
        this.load.image(Constants.BACKGROUNDS.LEVEL1, Constants.BACKGROUNDS.LEVEL1LOCATION);
        this.load.image(Constants.BACKGROUNDS.PAUSE, Constants.BACKGROUNDS.PAUSELOCATION);
        this.load.image(Constants.BACKGROUNDS.WIN, Constants.BACKGROUNDS.WINLOCATION);
        this.load.image(Constants.BACKGROUNDS.GAMEOVER, Constants.BACKGROUNDS.GAMEOVERLOCATION);
        this.load.image(Constants.BACKGROUNDS.MENU, Constants.BACKGROUNDS.MENULOCATION);

        //Fuentes
        this.load.json(Constants.FONTS.JSON, Constants.FONTS.JSONLOCATION);
        this.load.image(Constants.FONTS.IMAGE, Constants.FONTS.IMAGELOCATION);

        //Jugador
        this.load.atlas(Constants.PLAYER.ID, Constants.PLAYER.IMGLOCATION, Constants.PLAYER.JSONLOCATON);

        //ObjetoFinal
        this.load.image(Constants.ITEMS.ENDPOINT.ID, Constants.ITEMS.ENDPOINT.LOCATION);

        //Enemigos
        this.load.spritesheet(Constants.ENEMIES.BUNNY.ID, Constants.ENEMIES.BUNNY.IMGLOCATION, { frameWidth: Constants.ENEMIES.BUNNY.FRAMEWIDTH, frameHeight: Constants.ENEMIES.BUNNY.FRAMEHEIGHT});
        // this.load.spritesheet(Constants.ENEMIES.BUNNY.ID, Constants.ENEMIES.BUNNY.IMGLOCATION, { frameWidth: 32, frameHeight: 34});
        //chicken hecho a mi manera
        this.load.atlas(Constants.ENEMIES.CHICKEN.ID, Constants.ENEMIES.CHICKEN.IMGLOCATION, Constants.ENEMIES.CHICKEN.JSONLOCATION);
        this.load.spritesheet(Constants.ENEMIES.MUSHROOM.ID, Constants.ENEMIES.MUSHROOM.IMGLOCATION, { frameWidth: Constants.ENEMIES.MUSHROOM.FRAMEWIDTH, frameHeight: Constants.ENEMIES.MUSHROOM.FRAMEHEIGHT});
        this.load.spritesheet(Constants.ENEMIES.RADISH.ID, Constants.ENEMIES.RADISH.IMGLOCATION, { frameWidth: Constants.ENEMIES.RADISH.FRAMEWIDTH, frameHeight: Constants.ENEMIES.RADISH.FRAMEHEIGHT});

        //Explosion
        this.load.spritesheet(Constants.ENEMIES.EXPLOSION.ID, Constants.ENEMIES.EXPLOSION.IMGLOCATION, { frameWidth: Constants.ENEMIES.EXPLOSION.FRAMEWIDTH, frameHeight: Constants.ENEMIES.EXPLOSION.FRAMEHEIGHT});
        
        //Plataformas moviles
        this.load.image(Constants.ITEMS.MOVINGPLATFORM.ID, Constants.ITEMS.MOVINGPLATFORM.IMGLOCATION);

        //Sonidos
        this.load.audio(Constants.SOUNDS.EFFECTS.JUMP.ID, Constants.SOUNDS.EFFECTS.JUMP.FILELOCATION);
        this.load.audio(Constants.SOUNDS.EFFECTS.FALLONENEMY.ID, Constants.SOUNDS.EFFECTS.FALLONENEMY.FILELOCATION);
        this.load.audio(Constants.SOUNDS.EFFECTS.LOSELIfE.ID, Constants.SOUNDS.EFFECTS.LOSELIfE.FILELOCATION);
        this.load.audio(Constants.SOUNDS.EFFECTS.COLLECT.ID, Constants.SOUNDS.EFFECTS.COLLECT.FILELOCATION);

        for (let i=0; i<=2; i++){
            this.load.audio(Constants.SOUNDS.SOUNDTRACK.ID + i, `assets/sounds/soundtrack/cartoongame${i}.ogg`);
        }

        //Recolectables o Coleccionables
        this.load.spritesheet(Constants.COLLECTIBLES.BANANA.ID, Constants.COLLECTIBLES.BANANA.FILELOCATION, {frameWidth: Constants.COLLECTIBLES.BANANA.FRAMEWIDTH, frameHeight: Constants.COLLECTIBLES.BANANA.FRAMEHEIGHT});
        this.load.spritesheet(Constants.COLLECTIBLES.PINEAPPLE.ID, Constants.COLLECTIBLES.PINEAPPLE.FILELOCATION, {frameWidth: Constants.COLLECTIBLES.PINEAPPLE.FRAMEWIDTH, frameHeight: Constants.COLLECTIBLES.PINEAPPLE.FRAMEHEIGHT});
        this.load.spritesheet(Constants.COLLECTIBLES.CHERRY.ID, Constants.COLLECTIBLES.CHERRY.FILELOCATION, {frameWidth: Constants.COLLECTIBLES.CHERRY.FRAMEWIDTH, frameHeight: Constants.COLLECTIBLES.CHERRY.FRAMEHEIGHT});
    }
}