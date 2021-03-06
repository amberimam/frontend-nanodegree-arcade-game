'use strict';

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.setInitialPosAndSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.setInitialPosAndSpeed = function () {
    this.x = 0;
    this.y = Math.floor((Math.random() * 3) + 1);
    this.speed = Math.random() * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.speed;
    if (this.x > 5) {
      this.setInitialPosAndSpeed();
    }

    if ((Math.abs(this.x - player.x) <= 0.7) && (this.y == player.y)) {
      console.log("Player died :(");
      player.dead = true;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// The main player of the game
var Player = function() {
    this.setInitialPosition();
    this.dead = false;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.setInitialPosition = function () {
    this.x = 2;
    this.y = 5
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    if (this.dead === true) {
        this.setInitialPosition();
        this.dead = false;
    } else if (this.y === 0) {
        console.log("Player won the game!");
        this.setInitialPosition();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

Player.prototype.handleInput = function(keyPressed) {
    switch(keyPressed) {
    case 'left':
        if (this.x > 0) {
          this.x -= 1;
        }
        break;
    case 'up':
        if (this.y > 0) {
          this.y -= 1;
        }
        break;
    case 'right':
        if (this.x < 4) {
          this.x += 1;
        }
        break;
    case 'down':
        if (this.y < 5) {
          this.y += 1;
        }
        break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
