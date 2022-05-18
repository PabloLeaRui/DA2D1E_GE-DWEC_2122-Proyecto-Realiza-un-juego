const Constants = {
    EVENTS:{
        LIFES: 'changeLifes',
        SCORE: 'changeScore',
        TIMER: "timer",
        PAUSE: "pauseOrResumeGame",
        RESTART: "restartGame",
        RETURNMENU: "returnToMenu"
    },
    MENU:{
        PLAY: 'PLAY',
        INSTRUCTIONS: "HOW TO PLAY",
        HIGHESTSCORE: "YOUR HIGHEST SCORE: "
    },
    HUD:{
        LIFES: 'LIFES: ',
        SCORE: 'Score: '
    },
    SCENES:{
        LOAD: 'Load',
        MENU: 'Menu',
        LEVEL1: 'Level1',
        HUD: 'HUD',
        WIN: 'Win',
        PAUSE: 'Pause',
        GAMEOVER: "GameOver",
        INSTRUCTIONS: "Instructions"
    },
    REGISTRY:{
        LIFES: 'lifes',
        SCORE: 'score',
        TIMER: "timer"
    },
    MAPS: {
        LEVEL1:{
            TILEMAPJSON: 'mapLevel1',
            PLATFORMLAYER: 'Platforms',
            BACKGROUNDLAYER: "Background",
            JSONLOCATION: 'assets/levels/level1.json'
        },
        TILESET: 'Terrain',
        TILESETLOCATION: 'assets/levels/Terrain.png',
        FINISHPOINT: "finishPoint",
        //Nombre de la capa en el TileMap json
        ENEMIES: "enemies",
        MOVINGPLATFORMS: "movingPlatforms",
        YPLATFORM: "vertical",
        XPLATFORM: "horizontal",
        COLLECTIBLES: "collectibles"
    },
    BACKGROUNDS: {
        LEVEL1: 'brown',
        LEVEL1LOCATION: 'assets/background/Brown.png',
        PAUSE: "pink",
        PAUSELOCATION: 'assets/background/Pink.png',
        WIN: "yellow",
        WINLOCATION: 'assets/background/Yellow.png',
        GAMEOVER: "purple",
        GAMEOVERLOCATION: 'assets/background/Purple.png',
        MENU: "green",
        MENULOCATION: "assets/background/Green.png"
    },
    FONTS: {
        JSON: "fontJSON",
        JSONLOCATION: "assets/fonts/font.json",
        IMAGE: "fontImage",
        IMAGELOCATION: "assets/fonts/fontImage.png",
        BITMAP: "fontPixel"
    },
    PLAYER: {
        ID: "playerAtlas",
        JSONLOCATON: "assets/player/ninjaFrog.json",
        IMGLOCATION: "assets/player/ninjaFrog.png",
        ANIMATION: {
            IDLE: "idle",
            RUN: "run",
            JUMP: "jump",
            DJUMP: "dJump",
            WALLJUMP: "wJump"
        }
    },
    ITEMS:{
        ENDPOINT:{
            ID: "endPoint",
            LOCATION: "assets/items/endPoint.png"
        },
        MOVINGPLATFORM: {
            ID: "movingPlatform",
            IMGLOCATION: "assets/items/movingPlatform2.png",
            SPEED: 120
        }

    },
    ENEMIES:{
        BUNNY:{
            ID: "bunny",
            IMGLOCATION: "assets/enemies/Bunny/Run.png",
            FRAMEWIDTH: 34,
            FRAMEHEIGHT: 44,
            RUN: "bunnyRun",
            SPEED: 75
        },
        CHICKEN:{
            ID: "chicken",
            JSONLOCATION: "assets/enemies/Chicken/chicken.json",
            IMGLOCATION: "assets/enemies/Chicken/chicken.png",
            ANIMATION: {
                IDLE: "idle-",
                RUN: "run-",
                HIT: "hit-"
            },
            SPEED: 75
        },

        MUSHROOM:{
            ID: "mushroom",
            IMGLOCATION: "assets/enemies/Mushroom/Idle.png",
            FRAMEWIDTH: 32,
            FRAMEHEIGHT: 32,
            IDLE: "mushroomIdle",
            SPEED: 0
        },
        RADISH:{
            ID: "radish",
            IMGLOCATION: "assets/enemies/Radish/Run (30x38).png",
            FRAMEWIDTH: 30,
            FRAMEHEIGHT: 38,
            RUN: "radishRun",
            SPEED: 75
        },
        EXPLOSION:{
            ID: "explosion",
            IMGLOCATION: "assets/enemies/explosion.png",
            ANIM: "explode",
            FRAMEWIDTH: 38,
            FRAMEHEIGHT: 38
        }
    },
    SOUNDS:{
        EFFECTS:{
            JUMP: {
                ID: "jump",
                FILELOCATION: "assets/sounds/effects/jump.ogg"
            },
            FALLONENEMY: {
                ID: "fallOnEnemy",
                FILELOCATION: "assets/sounds/effects/fallOnEnemy.ogg"
            },
            LOSELIfE: {
                ID: "loseLife",
                FILELOCATION: "assets/sounds/effects/loseLife.ogg"
            },
            COLLECT: {
                ID: "collect",
                FILELOCATION: "assets/sounds/effects/collect.ogg"
            }
        },
        SOUNDTRACK: {
            ID: "soundtrack"
        }
    },
    COLLECTIBLES: {
        BANANA:{
            ID: "banana",
            FILELOCATION: "assets/collectibles/Bananas.png",
            FRAMEWIDTH: 32,
            FRAMEHEIGHT: 32,
            ANIM: "bananaAnim"
        },
        PINEAPPLE:{
            ID: "pineapple",
            FILELOCATION: "assets/collectibles/Pineapple.png",
            FRAMEWIDTH: 32,
            FRAMEHEIGHT: 32,
            ANIM: "pineappleAnim"
        },
        CHERRY:{
            ID: "cherry",
            FILELOCATION: "assets/collectibles/Cherries.png",
            FRAMEWIDTH: 32,
            FRAMEHEIGHT: 32,
            ANIM: "cherryAnim"
        }
    },
    DATABASE: {
        NAME: "ranaquesaltaV1"
    }

}

export default Constants;