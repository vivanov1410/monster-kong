;(function (Phaser, app) {
  app.PreloadState = {
    preload: function () {
      this.game.load.image('ground', 'assets/images/ground.png')
      this.game.load.image('platform', 'assets/images/platform.png')
      this.game.load.image('goal', 'assets/images/gorilla3.png')
      this.game.load.image('arrow-button', 'assets/images/arrow-button.png')
      this.game.load.image('action-button', 'assets/images/action-button.png')
      this.game.load.image('barrel', 'assets/images/barrel.png')

      this.game.load.spritesheet('player', 'assets/images/player.spritesheet.png', 28, 30, 5, 1, 1)
      this.game.load.spritesheet('fire', 'assets/images/fire.spritesheet.png', 20, 21, 2, 1, 1)

      this.game.load.text('level', 'assets/data/level.json')
    },

    create: function () {
      this.state.start('game')
    }
  }

})(window.Phaser, window.app)
