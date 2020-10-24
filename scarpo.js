var i = 0;
function random(min, max){
    return Math.round(min + (Math.random()* (max - min)));
}
function randomChoice(array){
    return array[Math.round( random(0, array.length - 1) ) ];
}

var infiniteRunner = Sketch.create({
    fullscreen: false,
    width: 640,
    height: 360,
    container: 
    document.getElementById('container')
});

function Vector2(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.previousX = 0;
    this.previousY = 0;
};

Vector2.prototype.setPosition = function(x, y){
    this.previousX = this.x;
    this.previousY = this.y;
    this.x = x;
    this.y = y;
};

Vector2.prototype.setX = function(x){
    this.previousX = this.x;
    this.x = x;
};

Vector2.prototype.setY = function(y){
    this.previousY = this.y;
    this.y = y;
};

Vector2.prototype.intersects = function(obj){
    if (obj.x < this.x + this.width && obj.y < this.y + this.height && obj.x + obj.width > this.x && obj.y + obj.height > this.y ){
        return true;
    }
    return false;
};
/*PLAYER*/
function Player(options){
    this.setPosition(options.x, options.y);
    this.width = options.width;
    this.height = options.height;
    this.velocityX = 0;
    this.velocityY = 0;
    this.jumpSize = -13;
    this.color = '#161616';
}

Player.prototype = new Vector2;
Player.prototype.update - function(){
    this.velocityY += 1;
    this.setPosition(this.x + this.velocityX, this.y + this.velocityY);

    if (this.y > InfiniteRunner.height || this.x + this.width < 0){
        this.x = 150;
        this.y = 50;
        this.velocityX = 0;
        this.velocityY = 0;
        InfiniteRunner.jumpCount = 0;
        InfiniteRunner.acceleration = 0;
        InfiniteRunner.accelerationMaker = 0;
        InfiniteRunner.scoreColor = '#eb4034';
        InfiniteRunner.platformManager.maxDistanceBetween = 350;
        InfiniteRunner.platformManager.updateWhenLose();
    }
    if ( (InfiniteRunner.keys.UP || InfiniteRunner.keys.SPACE || InfiniteRunner.keys.W || InfiniteRunner.dragging) && this.velocityY < -8 ){
        this.velocityY += -0.75;
    }
};

Player.prototype.draw = function(){
    InfiniteRunner.fillStyle = this.color;
    InfiniteRunner.fillRect(this.x, this.y. this.width, this.height);
};


function Platform(options){
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.previousX = 0;
    this.previousY = 0;
    this.color = options.color;
}

Platform.prototype = new Vector2;
Platform.prototype.draw = function(){
    InfiniteRunner.fillStyle = this.color;
    InfiniteRunner.fillRect(this.x, this.y, this.width, this.height);
};

/*MANAGER*/
function PlatformManager(){
    this.maxDistanceBetween = 300;
    this.colors = ['#8c34eb', '#9ede59', '#78243f','#9c87ad', '#735b2d'];
    this.first = new Platform({
        x: 300,
        y: InfiniteRunner.width / 2,
        width: 400,
        height: 70
    });
    this.second = new Platform({
        x: (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween), 
        y: random(this.first.y -126, InfiniteRunner.height - 80), 
        width: 400,
        height: 70
    });
    this.third = new Platform({
        x: (this.second.x + this.second.width) + random(this.maxDistanceBetween -150,
            this.maxDistanceBetween),
            y: random(this.second.y - 126, InfiniteRunner.height - 80),
             width: 400,
             height: 70
    })

    this.first.height = this.first.y + InfiniteRunner.height;
    this.second.height = this.second.y + InfiniteRunner.height;
    this.third.height = this.third.y + InfiniteRunner.height;
    this.first.color = randomChoice(this.colors);
    this.second.color = randomChoice(this.colors);
    this.third.color = randomChoice(this.colors);
    this.colliding = false;
    this.platforms = [this.first, this.second, this.third];
}
PlatformManager.prototype.update = function(){
    this.first.x -= 3 + InfiniteRunner.acceleration;
    if (this.first.x + this.first.width < 0) {
        this.first.width = random(450, InfiniteRunner.width + 200);
        this.first.x = (this.third.x + this.third.width) + random(this.maxDistanceBetween - 150,
            this.maxDistanceBetween);
        this.first.y = random(this.third.y - 32, InfiniteRunner.height - 80);
        this.first.height = this.first.y + InfiniteRunner.height + 10;
        this.first.color = randomChoice(this.colors);
}

this.second.x -= 3 + InfiniteRunner.acceleration;
if (this.second.x + this.second.width < 0){
    this.second.width = random(450, InfiniteRunner.width + 200);
    this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150,
        this.maxDistanceBetween);
    this.second.y = random(this.first.y - 32,
        InfiniteRunner.height - 80);
    this.second.height = this.second.y + InfiniteRunner.height + 10;
    this.second.color = randomChoice(this.colors);
}

this.third.x -= 3 + InfiniteRunner.acceleration;
if (this.third.x + this.third.width < 0 ){
    this.third.width = random(450, InfiniteRunner.width + 200);
    this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150,
        this.maxDistanceBetween);
    this.third.y = random(this.second.y - 32, InfiniteRunner.height - 80);
    this.third.height = this.third.y + InfiniteRunner.height + 10;
    this.third.color = randomChoice(this.colors);
    }
};