import Constants from "../constants";
import Level1 from "../scenes/level1";

export default class MovingPlatforms extends Phaser.Physics.Arcade.Group{
    private customScene: Level1;
    private speed: number;
    
    private horizontal: boolean;

    constructor(scene: Level1, objectName: string, objectId: string, speed: number, horizontal: boolean){
        super(scene.physics.world, scene);

        this.scene = scene;
        this.customScene = scene;

        this.speed = speed;

        this.horizontal = horizontal;

        //elige el nombre del objeto dependiendo si es horizontal o vertical
        let platformObjectName: string = (this.horizontal) ? Constants.MAPS.XPLATFORM : Constants.MAPS.YPLATFORM;

        //anyade los objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo
        this.addMultiple(this.customScene.tileMap.createFromObjects(objectName, {name: platformObjectName, key: objectId}));

        //Recorre todos los hijos que anyadimos con this.addMultiple y aplica el codigo a cada uno de ellos
        this.children.entries.map((platform: any) => {
            platform.setTexture(objectId);
            platform.body.setCollideWorldBounds(true);
            platform.body.setAllowGravity(false);
            platform.body.setImmovable(true);
            //Comprueba si la plataforma es horizontal o vertical
            if (this.horizontal){
                //Cuanto se pone el objeto encima, no se caiga
                platform.body.setFrictionX(1);
                platform.body.setVelocityX(this.speed);
                this.moveHorizontalPlatform((Phaser.Math.Between(0,1) ? "left" : "right"), platform);
            }else{
                platform.body.setFrictionY(1);
                platform.body.setVelocityY(this.speed);
                this.moveVerticalPlatform((Phaser.Math.Between(0,1) ? "up" : "down"), platform);
            }
        })
    }

    moveHorizontalPlatform(direction: string, platform: any): void{
        (direction === "left")? platform.body.setVelocityX(this.speed*-1) : platform.body.setVelocityX(this.speed);
    }

    moveVerticalPlatform(direction: string, platform: any): void{
        (direction === "up")? platform.body.setVelocityY(this.speed*-1) : platform.body.setVelocityY(this.speed);
    }

    public update(): void{
        this.children.entries.map((platform: any) => {
            if (this.horizontal){
                if(platform.body.velocity.x === 0){
                    this.moveHorizontalPlatform((Phaser.Math.Between(0,1) ? "left" : "right"), platform);
                }
                if (platform.body.blocked.right){
                    this.moveHorizontalPlatform("left", platform);
                }else if(platform.body.blocked.left) {
                    this.moveHorizontalPlatform("right", platform);
                }
            }else{
                if(platform.body.velocity.y === 0){
                    this.moveVerticalPlatform((Phaser.Math.Between(0,1) ? "up" : "down"), platform);
                }
                if (platform.body.blocked.top){
                    this.moveVerticalPlatform("down", platform);
                }else if(platform.body.blocked.bottom) {
                    this.moveVerticalPlatform("up", platform);
                }
            }
        })
    }
}