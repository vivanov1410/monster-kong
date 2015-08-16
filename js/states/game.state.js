;(function (Phaser, app, alert) {
  app.GameState = {
    init: function () {
      this.cursors = this.game.input.keyboard.createCursorKeys()
      this.RUNNING_SPEED = 280
      this.JUMPING_SPEED = 550
    },

    create: function () {
      // parse data file
      this.levelData = JSON.parse(this.game.cache.getText('level'))

      // create ground
      this.ground = this.game.add.sprite(0, 638, 'ground')
      this.game.physics.arcade.enable(this.ground)
      this.ground.body.allowGravity = false
      this.ground.body.immovable = true

      // create platforms
      this.platforms = this.game.add.group()
      this.platforms.enableBody = true

      var i
      for (i = 0; i < this.levelData.platformsData.length; i++) {
        this.platforms.create(this.levelData.platformsData[i].x, this.levelData.platformsData[i].y, 'platform')
      }

      this.platforms.setAll('body.immovable', true)
      this.platforms.setAll('body.allowGravity', false)

      // create fires
      this.fires = this.game.add.group()
      this.fires.enableBody = true

      var fire
      for (i = 0; i < this.levelData.firesData.length; i++) {
        fire = this.fires.create(this.levelData.firesData[i].x, this.levelData.firesData[i].y, 'fire')
        fire.animations.add('fire', [0, 1, 0], 4, true)
        fire.play('fire')
      }

      this.fires.setAll('body.immovable', true)
      this.fires.setAll('body.allowGravity', false)

      // create goal
      this.goal = this.game.add.sprite(this.levelData.goal.x, this.levelData.goal.x, 'goal')
      this.game.physics.arcade.enable(this.goal)
      this.goal.body.allowGravity = false
      this.goal.body.immovable = true

      // create player
      this.player = this.game.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3)
      this.player.anchor.setTo(0.5)
      this.player.animations.add('walking', [0, 1, 2, 1], 6, true)
      this.game.physics.arcade.enable(this.player)
      this.player.params = {}

      this.game.camera.follow(this.player)

      this.createOnScreenControls()
    },

    update: function () {
      this.game.physics.arcade.collide(this.player, this.ground, this.landed)
      this.game.physics.arcade.collide(this.player, this.platforms, this.landed)

      this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer, null, this)
      this.game.physics.arcade.overlap(this.player, this.goal, this.win, null, this)

      this.player.body.velocity.x = 0
      if (this.cursors.left.isDown || this.player.params.isMovingLeft) {
        this.player.body.velocity.x = -this.RUNNING_SPEED
        this.player.scale.setTo(1, 1)
        this.player.play('walking')
      } else if (this.cursors.right.isDown || this.player.params.isMovingRight) {
        this.player.body.velocity.x = this.RUNNING_SPEED
        this.player.scale.setTo(-1, 1)
        this.player.play('walking')
      } else {
        this.player.animations.stop()
        this.player.frame = 3
      }

      if ((this.cursors.up.isDown || this.player.params.isJumping) && this.player.body.touching.down) {
        this.player.body.velocity.y = -this.JUMPING_SPEED
        this.player.params.isJumping = false
      }
    },

    landed: function (player, ground) {},

    createOnScreenControls: function () {
      this.leftArrow = this.game.add.button(20, 535, 'arrow-button')
      this.rightArrow = this.game.add.button(110, 535, 'arrow-button')
      this.actionButton = this.game.add.button(280, 535, 'action-button')

      this.leftArrow.alpha = 0.5
      this.rightArrow.alpha = 0.5
      this.actionButton.alpha = 0.5

      this.leftArrow.fixedToCamera = true
      this.rightArrow.fixedToCamera = true
      this.actionButton.fixedToCamera = true

      this.actionButton.events.onInputDown.add(function () {
        this.player.params.isJumping = true
      }, this)

      // left arrow
      this.leftArrow.events.onInputDown.add(function () {
        this.player.params.isMovingLeft = true
      }, this)
      this.leftArrow.events.onInputUp.add(function () {
        this.player.params.isMovingLeft = false
      }, this)

      this.leftArrow.events.onInputOver.add(function () {
        this.player.params.isMovingLeft = true
      }, this)
      this.leftArrow.events.onInputOut.add(function () {
        this.player.params.isMovingLeft = false
      }, this)

      // right arrow
      this.rightArrow.events.onInputDown.add(function () {
        this.player.params.isMovingRight = true
      }, this)
      this.rightArrow.events.onInputUp.add(function () {
        this.player.params.isMovingRight = false
      }, this)

      this.rightArrow.events.onInputOver.add(function () {
        this.player.params.isMovingRight = true
      }, this)
      this.rightArrow.events.onInputOut.add(function () {
        this.player.params.isMovingRight = false
      }, this)
    },

    killPlayer: function (player, fire) {
      alert('GAME OVER!')
      this.game.state.start('game')
    },

    win: function (player, goal) {
      alert('YOU WIN!')
      this.game.state.start('game')
    }
  }
})(window.Phaser, window.app, window.alert)
