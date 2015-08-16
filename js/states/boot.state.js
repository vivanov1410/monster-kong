;(function (Phaser, app) {
  app.BootState = {
    init: function () {
      // scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.pageAlignHorizontally = true
      this.scale.pageAlignVertically = true

      // enable physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE)
      this.game.physics.arcade.gravity.y = 1000
    },

    preload: function () {},

    create: function () {
      this.state.start('preload')
    }
  }

})(window.Phaser, window.app || (window.app = {}))
