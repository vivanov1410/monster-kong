;(function (Phaser, app) {
  app.GameState = {
    init: function () {
      this.cursors = this.game.input.keyboard.createCursorKeys()
      this.RUNNING_SPEED = 280
      this.JUMPING_SPEED = 550
    },

    create: function () {
      // create ground
      this.ground = this.game.add.sprite(0, 500, 'ground')
      this.game.physics.arcade.enable(this.ground)
      this.ground.body.allowGravity = false
      this.ground.body.immovable = true

      // create platform
      this.platform = this.game.add.sprite(0, 300, 'platform')
      this.game.physics.arcade.enable(this.platform)
      this.platform.body.allowGravity = false
      this.platform.body.immovable = true

      // create player
      this.player = this.game.add.sprite(100, 200, 'player', 3)
      this.player.anchor.setTo(0.5)
      this.player.animations.add('walking', [0, 1, 2, 1], 6, true)
      this.game.physics.arcade.enable(this.player)
      this.player.params = {}

      this.createOnScreenControls()
    },

    update: function () {
      this.game.physics.arcade.collide(this.player, this.ground, this.landed)
      this.game.physics.arcade.collide(this.player, this.platform, this.landed)

      this.player.body.velocity.x = 0
      if (this.cursors.left.isDown || this.player.params.isMovingLeft) {
        this.player.body.velocity.x = -this.RUNNING_SPEED
      } else if (this.cursors.right.isDown || this.player.params.isMovingRight) {
        this.player.body.velocity.x = this.RUNNING_SPEED
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
    }
  }
})(window.Phaser, window.app)
