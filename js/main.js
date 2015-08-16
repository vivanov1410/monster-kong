;(function (Phaser, app) {
  var game = new Phaser.Game(360, 592, Phaser.AUTO)

  game.state.add('boot', app.BootState)
  game.state.add('preload', app.PreloadState)
  game.state.add('home', app.HomeState)
  game.state.add('game', app.GameState)

  game.state.start('boot')
})(window.Phaser, window.app)
