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

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;



 function setup(){
 	shipDiameter = 60;
	shipX = 250;
	shipY = 400 - shipDiameter/2;
	shipSpeed = 7;
	shipColor = color("#FFD700");

	bulletDiameter = 18;

	shipShooting = false;
	alienShooting = false;

	alienDiameter = 46;
	alienVelocity = 10;
	alienX = 23;
	alienY = 23;


	alienBulletDiameter = 5;
	//alienBulletX = alienX;
    //alienBulletY = alienY;





 	canvas = createCanvas(500,400);
 	background(0);
 	gameScreen = select("#game-screen");
 	canvas.parent(gameScreen);
 	fill(shipColor);
    


 }
 /*This function is called once. Sets up the canvas, accesses HTML elements with
 select(), and adds event listeners to those elements. Sets initial values of
 variables by calling resetGame().*/
 



function gameOver(){

	alert("You lost! Hooray!")
	setup();

}



 /* This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */



function draw(){
	
	background(0);

	drawShip();

	drawAlien();

	drawAlienBullet();

	if (shipShooting === true) {
		drawBullet();
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


    if(keyIsDown(LEFT_ARROW) && shipX >= shipDiameter/2) {
    	shipX -= shipSpeed;
    }

    if (keyIsDown(RIGHT_ARROW) && shipX <= width - shipDiameter/2) {
    	shipX += shipSpeed;
    }

 	
 	
 }


 /* This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */



 		



function keyPressed(){

 	if(keyCode === 32 && shipShooting === false){
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

 	if(alienX >= 500 - alienDiameter/2 || alienX <= 0 + alienDiameter/2){

 		alienVelocity = alienVelocity * -1;
 	}

 	fill(236, 40, 60);

 	ellipse(alienX, alienY, alienDiameter, alienDiameter);

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

	var hitShip = checkCollision(alienBulletX, alienBulletY, alienBulletDiameter, shipX, shipY, shipDiameter)


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

	alienX = 23;

	alienY = 23;

	alienVelocity = abs(alienVelocity);

}
 

  /* This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */



function checkCollision(aX, aY, aD, bX, bY, bD){

	var distance = dist(aX, aY, bX, bY);

	

	if((aD += bD)/2 >= distance) {
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
