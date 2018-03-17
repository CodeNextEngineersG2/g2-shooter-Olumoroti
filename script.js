// UI Variables
var canvas;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;
var shipVoidDiameter;
var shipVoidX;
var shipVoidY;
var shipVoidColor;
var shipStandingBulletDiameter;
var shipStandingBulletX;
var shipStandingBulletY
var shipStandingBulletColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;
var alienVoidDiameter;
var alienVoidX;
var alienVoidY;
var alienVoidColor;
var alienStandingBulletDiameter;
var alienStandingBulletX;
var alienStandingBulletY;
var alienStandingBulletColor;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;



 function setup(){

	//alienBulletX = alienX;
    //alienBulletY = alienY;




    var canvasWidth = 500;
    var canvasHeight = 400;
 	canvas = createCanvas(canvasWidth,canvasHeight);
 	background(0);
 	gameScreen = select("#game-screen");
 	canvas.parent(gameScreen);
 	scoreDisplay = select("#score-display");
 	resetGame();

    


 }
 /*This function is called once. Sets up the canvas, accesses HTML elements with
 select(), and adds event listeners to those elements. Sets initial values of
 variables by calling resetGame().*/
 



function gameOver(){

	gameRunning = false;
	var shipScore = "You lost with a score of" + score.toString();
	alert(shipScore);
	resetGame();

}



 /* This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */



function resetGame(){
	canvasWidth = 500;
	canvasHeight = 400;
 	shipDiameter = 50;
	shipX = canvasWidth/2;
	shipY = canvasHeight -= shipDiameter/2;
	shipSpeed = 8;
	shipColor = color("#FFD700");
	shipVoidX = shipX;
	shipVoidY = shipY - shipY/50;
	shipVoidDiameter = shipDiameter/1.35;
	shipVoidColor = color(0);
	shipStandingBulletDiameter = 13;
	shipStandingBulletX = shipX;
	shipStandingBulletY = shipY;
	shipStandingBulletColor = color(255);

	bulletDiameter = shipStandingBulletDiameter;

	shipShooting = false;
	alienShooting = false;

	alienDiameter = 50;
	alienVelocity = 8;
	alienX = alienDiameter/2;
	alienY = alienDiameter/2;
	alienVoidX = alienX;
	alienVoidY = 32.5;
	alienVoidDiameter = alienDiameter/1.35;
	alienVoidColor = color(0);
	alienStandingBulletDiameter = 13;
	alienStandingBulletX = alienX;
	alienStandingBulletY = alienY;
	alienStandingBulletColor = color(0, 255, 0);



	alienBulletDiameter = alienStandingBulletDiameter;
 	score = 0;
 	scoreDisplay.html(score);	
 	gameRunning = true;
}
 /* This function "resets the game" by initializing ship, alien, and game
 * variables.
 */



function draw(){
	
	background(0);

	drawShip();

	drawAlien();


	if (shipShooting === true) {
		drawBullet();
	}

	else {

		fill(shipStandingBulletColor);

		ellipse(shipStandingBulletX, shipStandingBulletY, shipStandingBulletDiameter, shipStandingBulletDiameter);
	}

	if (alienShooting === true) {
		drawAlienBullet();
	}



	

 }


 /* This function animates the ship, alien, and both kinds of bullets, but only
 * if the game is running.
 */



function drawShip(){
 	
 	fill(shipColor);

    ellipse(shipX, shipY, shipDiameter, shipDiameter);

    fill(shipVoidColor);

    ellipse(shipVoidX, shipVoidY, shipVoidDiameter, shipVoidDiameter);

    

    




    if(keyIsDown(LEFT_ARROW) && shipX >= shipDiameter/2) {
    	shipX -= shipSpeed;
    	shipVoidX -= shipSpeed;
    	shipStandingBulletX -= shipSpeed;
    }

    if (keyIsDown(RIGHT_ARROW) && shipX <= width - shipDiameter/2) {
    	shipX += shipSpeed;
    	shipVoidX += shipSpeed;
    	shipStandingBulletX += shipSpeed;
    }

 	
 	
 }


 /* This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */



 		



function keyPressed(){

 	if(keyCode === 32 && !shipShooting && gameRunning === true
){
 		bulletX = shipX;
 		bulletY = shipY;
 		shipShooting = true;


 	}
 


 }
 /*This function runs automatically when the player presses the spacebar
 (keyCode === 32). If they do, and a bullet is not currently being fired
 ("shipShooting" variable is false), it positions the bullet relative to the
  ship. Then it sets the "shipShooting" variable to "true", indicating a ship
  bullet is currently being fired.*/
 



function drawBullet(){

	var hitAlien = checkCollision(alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter); 

	if(bulletY > 0 && !hitAlien) {

    noStroke();

	fill(255);

	ellipse(bulletX, bulletY, bulletDiameter, bulletDiameter);

	bulletY -= 10;
		   
  }

  	else if(hitAlien) {

  		resetAlien();

  		alienVelocity++;

  		shipShooting = false;

  		score++;

  		scoreDisplay.html(score);


  }

  	else {
    shipShooting = false;
  }






}
 /* This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */



 function drawAlien(){

 	alienX += alienVelocity;

 	alienVoidX += alienVelocity;

 	if(alienX >= 500 - alienDiameter/2 || alienX <= 0 + alienDiameter/2){

 		alienVelocity = alienVelocity * -1;
 	}

 	fill(236, 40, 60);

 	ellipse(alienX, alienY, alienDiameter, alienDiameter);

 	fill(alienVoidColor);

 	ellipse(alienVoidX, alienVoidY, alienVoidDiameter, alienVoidDiameter);

 	if (random(4) < 1 && !alienShooting) {

 		alienBulletX = alienX;

 		alienBulletY = alienY;

 		alienShooting = true;
 	}

	



 }
 /* This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */


function drawAlienBullet(){

	var hitShip = checkCollision(shipX, shipY, shipDiameter, alienBulletX, alienBulletY, alienBulletDiameter);


	if (alienBulletY < 500 && !hitShip){
		fill(0, 255, 0);

		ellipse(alienBulletX, alienBulletY, alienBulletDiameter, alienBulletDiameter);

		alienBulletY += 7;
	}

	else if (hitShip){

		gameOver();

	}

	else {
		alienShooting = false;


	}


	
}
 /* This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */



function resetAlien(){

	alienX = alienDiameter/2;

	alienY = alienDiameter/2;

	alienVelocity = abs(alienVelocity);

	alienVoidX = alienX;

	alienVoidY = 32.5;

}
 

  /* This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */



function checkCollision(aX, aY, aD, bX, bY, bD){

	

	

	if(dist(aX, aY, bX, bY) <= (aD + bD)/2) {
		return true;
	}

	else {
		return false;
	}
}




 /* This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
