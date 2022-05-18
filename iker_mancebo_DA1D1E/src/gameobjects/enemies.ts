import Level1 from "../scenes/level1";

//Grupo de spritesheets con fisica
export default class Enemies extends Phaser.Physics.Arcade.Group{
    
    private customScene : Level1;
    private frameWitdh: number;
    private frameHeight: number
    private speed: number;

    constructor(scene: Level1, objectName:string, objectId: string, objectAnim: string, frameWitdh: number, frameHeight: number, speed: number){
        super(scene.physics.world, scene);

        this.scene = scene;
        this.customScene = scene;
        this.frameWitdh = frameWitdh;
        this.frameHeight = frameHeight;
        this.speed = speed;

        //anyade los objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo
        this.addMultiple(this.customScene.tileMap.createFromObjects(objectName, {name: objectId}));

        //anyadimos fisicas a todos lo objetos del grupo
        this.customScene.physics.world.enable(this.children.entries);

        //Crea animaciones Enemigos
        this.customScene.anims.create({
            key: objectAnim,
            frames: objectId,
            frameRate: 20,
            repeat: -1
        });

        //Recorre todos los hijos que anyadimos con this.addMultiple y aplica el codigo a cada uno de ellos
        this.children.entries.map((enemy: any) => {
            enemy.body.setCollideWorldBounds(true);
            enemy.body.setSize(this.frameWitdh-5,this.frameHeight-14);
            enemy.body.setOffset(2,13);
            enemy.play(objectAnim);
            this.moveEnemy((Phaser.Math.Between(0,1) ? "left" : "right"), enemy)
        })
    }

    moveEnemy(direction: string, enemy: any){
        if (direction === "left") {
            enemy.body.setVelocityX(this.speed*-1);
            enemy.flipX=false;
        }else if(direction === "right"){
            enemy.body.setVelocityX(this.speed);
            enemy.flipX=true;
        }
    }

    public update(): void {
        this.children.entries.map((enemy: any) => {
            if(enemy.body.velocity.x === 0){
                this.moveEnemy((Phaser.Math.Between(0,1) ? "left" : "right"),enemy);
            }
            if (enemy.body.blocked.right){
                this.moveEnemy("left", enemy);
            }else if(enemy.body.blocked.left){
                this.moveEnemy("right", enemy);
            }
            
        });
    }
}