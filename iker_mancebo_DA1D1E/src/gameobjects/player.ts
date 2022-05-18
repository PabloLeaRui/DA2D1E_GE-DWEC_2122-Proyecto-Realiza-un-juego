import Constants from "../constants";
import Level1 from "../scenes/level1";

export default class Player extends Phaser.Physics.Arcade.Sprite{

    //Controlar los inputs
    private cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    private WASDkeys: any;
    private spaceKey: Phaser.Input.Keyboard.Key;

    private customScene: Level1;

    //Para evitar que no ocurra nada mas durante el momento del doble salto
    private doubleJumpingLeftActivatedWaitingTime: boolean;
    private doubleJumpingRightActivatedWaitingTime: boolean;

    //Para evitar que no ocurra nada mas durante ese momento de colision
    private collisionActivatedWaitingTime: boolean;

    //Para evitar que no ocurra nada mas durante el momento de recoleccion
    private collecting: boolean;

    //Sonidos
    public jumpAudio: Phaser.Sound.BaseSound;
    public fallOnEnemyAudio: Phaser.Sound.BaseSound;
    public collectAudio: Phaser.Sound.BaseSound;
    public loseLife: Phaser.Sound.BaseSound;

    /**
     * Crea un jugador como si de la clase Phaser.Physics.Arcade.Sprite se tratase
     * @param scene 
     * @param x 
     * @param y 
     * @param texture 
     */
    constructor(scene: Phaser.Scene, x:number, y:number, texture: string | Phaser.Textures.Texture){
        super(scene, x, y, texture);

        this.customScene = <Level1>scene;

        //Para habilitar este objeto en la escena actual
        this.scene.physics.world.enable(this);

        //Para que entre dentro de la escena
        this.scene.add.existing(this);

        //Cambiar hitbox del jugador
        this.body.setSize(20,30);

        //Para que no se salga de los limites del juego
        // this.setCollideWorldBounds(true);

        //Control de inputs
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.WASDkeys = this.scene.input.keyboard.addKeys("W,A,S,D");
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Inicio el jugador con la animacion de idle
        this.play(Constants.PLAYER.ANIMATION.IDLE);

        //Anyadir sonidos
        this.jumpAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.JUMP.ID);
        this.collectAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.COLLECT.ID);
        this.fallOnEnemyAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.FALLONENEMY.ID);
        this.loseLife = this.scene.sound.add(Constants.SOUNDS.EFFECTS.LOSELIfE.ID);
    }

    update(){

        //Control de movimiento
        if ((this.WASDkeys.A.isDown && this. WASDkeys.D.isDown) || (this.cursor.left.isDown && this.cursor.right.isDown)){
            if (this.body.blocked.down){
                this.setVelocityX(0);
                this.anims.play(Constants.PLAYER.ANIMATION.IDLE, true);
            }
        } else if ((this.WASDkeys.A.isDown || this.cursor.left.isDown) && !this.doubleJumpingLeftActivatedWaitingTime) {
            this.setVelocityX(-200);
            this.setAccelerationX(-0.1);
            if (this.body.blocked.down){
                this.anims.play(Constants.PLAYER.ANIMATION.RUN, true);
            } else if (this.body.blocked.left){
                this.setVelocityY(50);
                this.anims.play(Constants.PLAYER.ANIMATION.WALLJUMP, true);
            } else{
                this.anims.play(Constants.PLAYER.ANIMATION.DJUMP, true);
            }
            this.flipX = true;
        } else if ((this.WASDkeys.D.isDown || this.cursor.right.isDown) && !this.doubleJumpingRightActivatedWaitingTime) {
            this.setVelocityX(200);
            this.setAccelerationX(0.1);
            if (this.body.blocked.down){
                this.anims.play(Constants.PLAYER.ANIMATION.RUN, true);
            } else if (this.body.blocked.right){
                this.setVelocityY(50)
                this.anims.play(Constants.PLAYER.ANIMATION.WALLJUMP, true);
            } else {
                this.anims.play(Constants.PLAYER.ANIMATION.DJUMP, true);
            }
            this.flipX = false;
        } else {
            if (!this.doubleJumpingLeftActivatedWaitingTime && !this.doubleJumpingRightActivatedWaitingTime){
                this.setVelocityX(0);
            }
            if (this.body.blocked.down){
                this.anims.play(Constants.PLAYER.ANIMATION.IDLE, true);
                this.setAcceleration(0);
            }
        }

        if ((this.WASDkeys.W.isDown || this.spaceKey.isDown || this.cursor.up.isDown) && this.body.blocked.down){
            //Inicia el audio
            this.jumpAudio.play();

            this.setVelocityY(-300);
            this.anims.stop();
            this.setTexture(Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.JUMP);
        } else if ((this.WASDkeys.W.isDown || this.spaceKey.isDown || this.cursor.up.isDown) && this.body.blocked.left && !this.doubleJumpingLeftActivatedWaitingTime){
            //Inicia el audio
            this.jumpAudio.play();

            //Controla el salto en pared de la izquierda

            this.doubleJumpingLeftActivatedWaitingTime = true;

            this.setVelocity(130, -250);
            this.anims.stop();
            this.anims.play(Constants.PLAYER.ANIMATION.DJUMP, true);
            this.flipX = false;

            //Este evento reestablece la variable booleana a su estado originar pasado cierto tiempo
            this.customScene.time.addEvent({
                delay: 560,
                callback: () => {
                    this.doubleJumpingLeftActivatedWaitingTime = false;
                }
            });
        } else if ((this.WASDkeys.W.isDown || this.spaceKey.isDown || this.cursor.up.isDown) && this.body.blocked.right && !this.doubleJumpingRightActivatedWaitingTime){
            //Inicia el audio
            this.jumpAudio.play();

            //Controla el salto en pared de la izquierda

            this.doubleJumpingRightActivatedWaitingTime = true;

            this.setVelocity(-130, -250);
            this.anims.stop();
            this.anims.play(Constants.PLAYER.ANIMATION.DJUMP, true);
            this.flipX = true;

            //Este evento reestablece la variable booleana a su estado originar pasado cierto tiempo
            this.customScene.time.addEvent({
                delay: 560,
                callback: () => {
                    this.doubleJumpingRightActivatedWaitingTime = false;
                }
            });
        }
    }

    /**
     * Metodo que maneja la colision entre el jugador y un objeto enemigo
     * Se quita vida al jugador si enemigo toca al jugador
     * Si jugador toca al enemigo desde arriba, elimina enemigo e incrementa puntos
     * El contexto this es desde donde se llama por eso hay que usar jugador/player en lugas de this
     */
    public touchEnemy(player: Player, enemy: Phaser.Physics.Arcade.Sprite): void{
        //Hace desaparecer al enemigo si salta sobre el
        if (player.body.velocity.y > 100 && enemy.body.touching.up && player.body.touching.down){
            if(!player.collisionActivatedWaitingTime){
                //Inicia el sonido
                player.fallOnEnemyAudio.play();

                //Salto mas alto cuando se esta pulsando el boton de saltar cuando se cae sobre un enemigo
                if (player.WASDkeys.W.isDown || player.spaceKey.isDown || player.cursor.up.isDown){
                    player.setVelocityY(-300);
                }else{
                    player.setVelocityY(-100);
                }
                
                //Cogemos la posicion actual del enemigo porque es donde nosotros vamos a posicionar el humo
                let posX = enemy.x;
                let posY = enemy.y;
                enemy.destroy();

                //incrementa marcador 100puntos
                player.customScene.score += 250;
                player.customScene.registry.set(Constants.REGISTRY.SCORE,player.customScene.score);
                player.customScene.events.emit(Constants.EVENTS.SCORE);

                //anyade efectos de la explosion con una animacion que cuando se completa desaparece
                let explosion: Phaser.GameObjects.Sprite = player.customScene.add.sprite(posX, posY, Constants.ENEMIES.EXPLOSION.ID);
                explosion.play(Constants.ENEMIES.EXPLOSION.ANIM);
                explosion.once('animationcomplete', () => {
                    //Destruye el objeto que acabo de crear
                    explosion.destroy();
                })
            }
        }else if (!player.collisionActivatedWaitingTime){
            //Inicia el audio
            player.loseLife.play();

            //quita vidas y actualiza HUD
            player.customScene.lifes--;
            player.customScene.registry.set(Constants.REGISTRY.LIFES, player.customScene.lifes);
            player.customScene.events.emit(Constants.EVENTS.LIFES);

            //activa el collisionActivatedWaitingTime ya que al ser un overlap esta colisionando constantemente
            player.collisionActivatedWaitingTime = true;
            //lo pinta de rojo al jugador
            player.tint = 0xff0000;

            //anyade un evento de espera para volver a la normalidad
            player.customScene.time.addEvent({
                delay: 600,
                callback: () => {
                    player.collisionActivatedWaitingTime = false;
                    player.tint = 0xffffff;
                }
            });
        }
    }

    /**
     * Este metodo se usa para cuando el jugador collisione con un coleccionable
     * @param player 
     * @param object 
     */
    public collect(player: Player, object: Phaser.Physics.Arcade.Sprite): void{
        if (!player.collecting){
            player.collectAudio.play();
            player.collecting = true;
            
            //incrementa marcador 50puntos
            player.customScene.score += 500;
            player.customScene.registry.set(Constants.REGISTRY.SCORE, player.customScene.score);
            player.customScene.events.emit(Constants.EVENTS.SCORE);

            //realiza una animación para desaparecer
            player.customScene.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 600,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){                
                    player.collecting = false;
                    object.destroy();                                 
                }
            });
        }      
    }
}