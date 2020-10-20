var database;
var ball;
//var showError;
function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    ballPosition = database.ref('ball/position');
    ballPosition.on('value',readPosition,showError)
    


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
    drawSprites();
}

/*function changePosition(x,y){
    hypnoticBall.x = hypnoticBall.x + x;
    hypnoticBall.y = hypnoticBall.y + y;
}*/

function writePosition(x,y){
    database.ref('ball/position').set(
        {
            'x': position.x + x,
            'y': position.y + y
        })
}

function readPosition(data){
    position = data.val();
    console.log(position.x);
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function showError(){
    console.log("Error in writing to the database.");
}

