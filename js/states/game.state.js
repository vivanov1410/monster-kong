;(function (Phaser, app) {
  app.GameState = {
    create: function () {
      this.ground = this.game.add.sprite(0, 500, 'ground')
      this.platform = this.game.add.sprite(0, 300, 'platform')

      this.player = this.game.add.sprite(100, 200, 'player', 3)
      this.player.anchor.setTo(0.5)
      this.player.animations.add('walking', [0, 1, 2, 1], 6, true)
      this.player.play('walking')
    },

    update: function () {}
  }
})(window.Phaser, window.app)
