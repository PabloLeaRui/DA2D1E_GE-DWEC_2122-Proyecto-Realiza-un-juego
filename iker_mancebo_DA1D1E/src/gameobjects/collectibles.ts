import Level1 from "../scenes/level1";

export default class Collectibles extends Phaser.Physics.Arcade.Group{
    private customScene: Level1;

    constructor(scene: Level1, objectName: string, objectId: string, objectAnim: string){
        super(scene.physics.world, scene);

        this.scene = scene;
        this.customScene = scene;

        //anyade los objetos de los coleccionables desde el array de sprites obtenidos del mapa al grupo
        this.addMultiple(this.customScene.tileMap.createFromObjects(objectName, {name: objectId, key:objectId}));

        //anyade fisica a todos los objetos del grupo
        this.customScene.physics.world.enable(this.children.entries);

        //Crea animaciones
        this.customScene.anims.create({
            key: objectAnim,
            frames: objectId,
            frameRate: 20,
            repeat: -1
        });

        //Recorre todos los hijos que anyadimos con this.addMultiple y aplica el codigo a cada uno de ellos
        this.children.entries.map((collectible: any) => {
            collectible.body.setAllowGravity(false);
            collectible.body.setImmovable(true);
            collectible.play(objectAnim);
        });
    }
}