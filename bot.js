var five = require("johnny-five");
var keypress = require("keypress");

var board = new five.Board();

keypress(process.stdin);

board.on("ready", function() {

  // Our servo instances
  var leftServo = new five.Servo({pin: 11});
  var rightServo = new five.Servo({pin: 10, invert: true});
  var servos = new five.Servos([left, right]);

  // These are the commands we will inject into the repl
  var commands = {
    left: function() { left.cw();right.ccw(); },
    right: function() { left.ccw();right.cw(); },
    fwd: function(speed) { servos.cw(speed); },
    rev: function(speed) { servos.ccw(speed); },
    stop: function() { servos.stop(); }
  };

  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  // Listen for keypress events
  process.stdin.on("keypress", function(ch, key) {
    if (!key) return;
    if (key.name === "up") commands.fwd();
    if (key.name === "down") commands.rev();
    if (key.name === "left") commands.left();
    if (key.name === "right") commands.right();
    if (key.name === "space") commands.stop();
  });

  this.repl.inject(commands);

});
