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