// Rocket prefab
class Rocket_P2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;

      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update(){
        //left and right movement
        if(!this.isFiring){
            if(this.x > game.input.mousePointer.x && this.x >= borderUISize + this.width){
            //if(keyA.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            //}else if(keyD.isDown && this.x <= game.config.width - borderUISize){
            }else if(this.x < game.input.mousePointer.x && this.x >= borderUISize + this.width){
                this.x += this.moveSpeed;
            }
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
            //if(keyA.isDown && this.x >= borderUISize + this.width){
            if(this.x > game.input.mousePointer.x && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            //}else if(keyD.isDown && this.x <= game.config.width - borderUISize){
            }else if(this.x < game.input.mousePointer.x && this.x <= game.config.width - borderUISize){
                this.x += this.moveSpeed;
            }
        }
        //reset on a miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    //reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    // Plays sound when rocket fired
    onRocketClick(){
        if(this.isFiring == false){
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
    }
}