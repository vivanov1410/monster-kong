;(function (Phaser, app) {
  app.BootState = {
    init: function () {
      // scaling options
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.pageAlignHorizontally = true
      this.scale.pageAlignVertically = true
    },

    preload: function () {},

    create: function () {
      this.state.start('preload')
    }
  }

})(window.Phaser, window.app || (window.app = {}))
