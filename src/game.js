"use strict"


// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var canvas = document.getElementById('canvas');
var iconSize = 20;

function GameObject(x, y, angle, imgUrl, speed) {
    var startHor, startVer;

    if (getRandomArbitrary(0, 2) == 0) {
        startHor = "east";
    } else {
        startHor = "west";
    }

    if (getRandomArbitrary(0, 2) == 0) {
        startVer = "south";
    } else {
        startVer = "north";
    }

    this.direction = {
        hor: startHor, ver: startVer
    };

    this.element = this.createElement(imgUrl);
    this.speed = speed;
    this.setPosition(x, y, angle);
}

GameObject.prototype.step = function() {
    var nextX, nextY;

    if (this.direction.hor == "east" && this.x + iconSize >= canvas.offsetWidth) {
        this.direction.hor = "west";
    }

    if (this.direction.hor == "west" && this.x <= 0) {
        this.direction.hor = "east";
    }

    if (this.direction.hor == "west") {
        nextX = this.x - this.speed;
    } else {
        nextX = this.x + this.speed;
    }

    if (this.direction.ver == "south" && this.y + iconSize >= canvas.offsetHeight) {
        this.direction.ver = "north";
    }

    if (this.direction.ver == "north" && this.y <= 0) {
        this.direction.ver = "south";
    }

    if (this.direction.ver == "north") {
        nextY = this.y - this.speed;
    } else {
        nextY = this.y + this.speed;
    }

    this.setPosition(nextX, nextY, this.angle);
};

GameObject.prototype.createElement = function(imgUrl) {
    var element = document.createElement("img");
    element.setAttribute("src", imgUrl);
    element.setAttribute("width", iconSize + "px");
    element.setAttribute("height", iconSize + "px");
    element.style.position = "absolute";
    return element;
};

GameObject.prototype.setPosition = function(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.element.style.transform = "translate("+ x + "px," + y + "px) rotate(" + angle + "deg)";
}

GameObject.prototype.show = function() {
    canvas.appendChild(this.element);
}

GameObject.prototype.hide = function() {
    canvas.removeChild(this.element);
}


var Game = {
    objects: [],

    step: function() {
        var objectsCount = this.objects.length;

        for (var i = 0; i < objectsCount; i++) {
            this.objects[i].step();
        }

        requestAnimationFrame(this.step.bind(Game));
    },

    run: function() {
        var spaceShip = new GameObject(100, 100, 0, "http://www.thomaslovgren.com/wp-content/uploads/spaceship1.png", 1);
        spaceShip.show();
        this.objects.push(spaceShip);

        for (var i = 0; i < 2; i++) {
            var asteroid = new GameObject(0, iconSize * i, 0, "http://icons.iconarchive.com/icons/zairaam/bumpy-planets/64/asteroid-icon.png", 1.5);
            asteroid.show();
            this.objects.push(asteroid);
        }

        requestAnimationFrame(this.step.bind(Game));
    }
};

Game.run();




