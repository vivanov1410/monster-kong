;(function (Phaser, app) {
  app.GameState = {
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
    },

    update: function () {
      this.game.physics.arcade.collide(this.player, this.ground, this.landed)
      this.game.physics.arcade.collide(this.player, this.platform, this.landed)
    },

    landed: function (player, ground) {}
  }
})(window.Phaser, window.app)
