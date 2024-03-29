class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    create(){

        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield' ).setOrigin(0, 0)

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.input.on('pointerdown', function (pointer)
        {
            this.p1Rocket.shoot()
        }, this)
        
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4 + 40, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 40, 'spaceship', 0, 20, game.settings.spaceshipSpeed).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4 + 40, 'spaceship', 0, 10, game.settings.spaceshipSpeed).setOrigin(0,0)
        this.ship04 = new Spaceship(this, game.config.width + borderUISize * 4, borderUISize*4, 'amoeba', 0, 80, game.settings.spaceshipSpeed + 2).setOrigin(0,0)
        this.emitter = this.add.particles(25, 25, 'particle', {
            speed: {min:-100 , max:100},
            angle: {min:0, max:360},
            scale: { start: 2, end: .5 },
            gravityX: 100,
            gravityY: 100,
            lifespan: 4000,
            emitting: false,
            blendMode: 'ADD'
        })
    
        this.p1Score = 0
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        
        this.gameOver = false
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
        this.gameOver = true
        }, null, this)
        }

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        this.starfield.tilePositionX -= 4
        if(!this.gameOver){
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
          this.p1Rocket.reset()
          this.shipExplode(this.ship04)
      }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
      }

      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        this.emitter.explode(20,ship.x,ship.y)
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })       
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score      
        let num = Math.floor(Math.random() * 5)
        if( num == 0){
          this.sound.play('boom1')
        } else if ( num == 1){
          this.sound.play('boom2')
        } else if ( num == 2){
          this.sound.play('boom3')
        } else if ( num == 3){
          this.sound.play('boom4')
        } else if ( num == 4){
          this.sound.play('boom5')
        }
      }
}