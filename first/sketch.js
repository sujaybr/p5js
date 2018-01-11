/**
 * @file             : dev/p5js/first/empty-example/sketch.js
 * @author           : Sujay <sujaybr9@gmail.com>
 * Date              : 10.01.2018
 * Last Modified Date: 11.01.2018
 * Last Modified By  : Sujay <sujaybr9@gmail.com>
 */

// These are the vertices of (p)layer and (o)pponent
var pax = 310, pay = 500, pbx = 270, pby = 540, pcx = 350, pcy = 540;
var oax = 310, oay = 120, obx = 270, oby = 80, ocx = 350, ocy = 80;

var index = 0;
// The y remains a constant
var y = 500;

// To keep track of the bullets by the player
var limits = new Array(0, 0, 0, 0, 0);

// Value of x for the bullets
var xval = new Array(); 

// Value of size of the rect
var dist = new Array();

// This is for the implementation of Circular queue, it indicates the rear position in the queue
var currentIndex = -1;

// This is for the implementation of Circular queue, it indicates the front position in the queue
var prevIndex = -1;

// To know the latest key pressed to avoid multiple key presses
var latestKeyPressed = "";

// Maximum number of bullets
var MAX_BULLETS = 3;

// Opponent variables
var opponentCrashedFlag = 0;
var opSpeed = 9;
var opBulletSpeed = 7;
var opIndex = 0;
var bullets = new Array();

// Player Variables
var playerSpeed = 7;
var playerBulletSpeed = 9;

function setup() {
    createCanvas(620, 620);
    // frameRate(10);
}
function draw() {
    // translate(width / 2, height / 2);
    
    background(130, 224, 170);
    drawPlayer(pax + index, pay, pbx + index, pby, pcx + index, pcy); 
    if(opponentCrashedFlag == 0)
        drawOpponent(oax + opIndex, oay, obx + opIndex, oby, ocx + opIndex, ocy);
    else{
        drawOpponent(oax + opIndex, oay, obx + opIndex, oby, ocx + opIndex, ocy);
        opponentCrashedFlag = 0;
    }

    strokeWeight(0);
    if (keyIsPressed) {
        if (key == 'a') {
            if(index > (-1 * pax) + 40)
                index -= playerSpeed; 
            // print ("left")
            latestKeyPressed = 'a';
        } else if(key == 'd'){
            if(index < pax - 40)
                index += playerSpeed;
            // print ("right")
            latestKeyPressed = 'd';
        } else if(key == ' '){
            if(latestKeyPressed != ' '){
                addBullet();
                latestKeyPressed = ' ';
            }
        }     
    }

    if (prevIndex != -1) {
        for(var i = 0;i < MAX_BULLETS;i ++){
            if(limits[i] == 1){
                drawBullet(xval[i], int(y - dist[i]));
                bullets.push(xval[i]);
                checkOpponentCollision(xval[i], y - dist[i]);
                dist[i] = int(dist[i] + playerBulletSpeed);
            }
        }

        for(var i = 0;i < MAX_BULLETS;i ++){
            if(dist[i] >= 500 && limits[i] == 1){
                removeBullet();
            }
        }
    }

    opIndex += makeOpponentMove();
    // print(opIndex);
}

function drawBullet(x, y){
    fill(247, 249, 249);
    rect(x - 2.5, y - 30, 5, 15);
    fill(171, 235, 198);
    rect(x - 2.5, y - 12, 5, 30);
}

function addBullet(){
    // This function add a bullet into the circular queue
    if(currentIndex == MAX_BULLETS && prevIndex == 0 || prevIndex - currentIndex == 1){
        print("Queue Full");
        return 0;
    } else if(prevIndex == -1){
        prevIndex = currentIndex = 0;
    } else if(currentIndex == MAX_BULLETS && prevIndex == 0){
        currentIndex = 0;
    } else{
        currentIndex = (currentIndex + 1) % (MAX_BULLETS + 1);
    }

    limits[currentIndex] = 1;
    dist[currentIndex] = 0;
    xval[currentIndex] = pax + index;
    // print ("Bullet Initialized");
}

function removeBullet(){
    // Remove an element from the circular queue
    if(prevIndex == -1){
        // print ("no elements");
    } else {
        limits[prevIndex] = 0;
        dist[prevIndex] = 0;
        if(currentIndex == prevIndex){
            currentIndex = prevIndex = -1;
        } else {
            prevIndex = (prevIndex + 1) % (MAX_BULLETS + 1);
        }
        // print ("Bullet removed");
    }
}

function drawPlayer(x, y, a, b, p, q){
    fill(175, 122, 197);
    triangle(x, y, a, b, p, q);
}

function drawOpponent(x, y, a, b, p, q){
    fill(231, 76, 60);
    if(opponentCrashedFlag){
        fill(0);
    }
    triangle(x, y, a, b, p, q);
}

function checkOpponentCollision(x, y){
    // To detect collision
    if(y >= oby && y <= oay){
        if(x >= obx + opIndex && x <= ocx + opIndex){
            opponentCrashedFlag = 1;
        }
    }    
}

function makeOpponentMove(){
    // TODO: left blank for now, makes no opponent move
    return 0;
}
