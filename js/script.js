var buttom = document.getElementsByClassName("buttom")[0];
var body   = document.getElementsByTagName("body")[0];
var box    = document.getElementsByClassName("motherfucker")[0];
var ball   = document.getElementsByClassName("movingBall")[0];
var paddle = document.getElementsByClassName("paddle")[0];
var firstBrick = document.getElementsByClassName("brick")[0];


/***--------------------Setting Up the Wall--------------------***/
var separation = 0;
var width = firstBrick.clientWidth;
var brick_x = getPosition(firstBrick).x + firstBrick.clientWidth + separation; //Because we already have the first one on html
var brick_y = getPosition(firstBrick).y;

for (j = 0; j < 5; j++) { 

	while ( isTheRowFilled()){
		addBrick();
		brick_x = brick_x + firstBrick.clientWidth + separation; 
	}
 	brick_y = brick_y + firstBrick.clientHeight + separation ;  //Jump to next row
 	brick_x = getPosition(firstBrick).x;;
}	

function isTheRowFilled () {
	if(brick_x >= window.innerWidth - ( firstBrick.clientWidth + (firstBrick.clientWidth/2) ) ){
		return false
	}else{
		return true;
	}
}

function addBrick(){
	var newBrick = document.createElement("div"); //Constructor (In java speaking)
	newBrick.classList.add('brick'); //Con esto agregamos la clase .brick del css
	body.insertBefore(newBrick,ball);
	//body.appendChild(newBrick);
	newBrick.style.left = brick_x + "px";
	newBrick.style.top  = brick_y + "px";
	newBrick.style.backgroundColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
}

/***Animating the paddle***/
document.onmousemove = readMouseMove;
function readMouseMove(e){
	var result_x = e.clientX;
	var result_y = e.clientY;
	//console.log(result_x);

	if(result_x <= paddle.clientWidth){
		paddle.style.left = 0 + "px"; 
	} else {
		paddle.style.left = (result_x - paddle.clientWidth + "px");
	}
}


/***--------------------Animation and GamePlay--------------------***/


var ball_dx = 4;
var ball_dy = 4;
//var animation = setInterval(function(){moveBall()}, 1000/60 );
moveBall();

function moveBall(){
	checkForWall();
	checkForPaddle();
	checkForBrick();
	move(ball, ball_dx, ball_dy);
	window.requestAnimationFrame(moveBall);
}


/**In Construction*/
function checkForBrick(){
	checkTopSide();
	checkLeftSide();
}


function checkTopSide(){
	/*We are NOT going to NEST these functions FOR NOW but keep in considaration the following pages and the FACT that by nesting a function you are actually creating the inner function over and over and again which ofcourse SHOULD affect the performance. Check the followig anyway http://code.tutsplus.com/tutorials/stop-nesting-functions-but-not-all-of-them--net-22315      and     http://www.w3schools.com/js/js_function_closures.asp an

	/*********************** Checking up side of the ball************************/
	a = getPosition(ball).x;
	b = getPosition(ball).y - 1; //This way takes in account the entire line above the brick instead 
	c = getPosition(ball).y + 40 + 1;
	there_is_an_element  = false;
	class_of_the_element = "notBrick";

	for( i=0 ; i < 39 ; i++){ //Whenever you CAN please replace this 39 by a more generic variable
		a = a + 1; //Each cicle move 'a' foward one pixel in this way we check the entire row at the end of the loop 
		
		var above_element = document.elementFromPoint(Math.abs(a), Math.abs(b) );
		if(above_element != null){ class_of_the_element_1 = above_element.className;}
		
		var below_element = document.elementFromPoint(Math.abs(a), Math.abs(c) );
		if(below_element != null){ class_of_the_element_2 =  below_element.className;}
		
		if(class_of_the_element_1 == "brick"){
			var audio = new Audio('button-4.mp3');
			audio.play();
			if(above_element != null){above_element.remove();}
			there_is_an_element = true; 

		} else if (class_of_the_element_2 == "brick") {
			var audio = new Audio('button-4.mp3');
			audio.play();	
			if(below_element != null){below_element.remove();}
			there_is_an_element = true; 
			ball_dx = -ball_dx;//Arbitrary for playability 
		}

		
	}

	if(there_is_an_element){
		console.log("there was colition");
		ball_dy = -ball_dy;
		ball_dx = -ball_dx;
	}
}

function checkLeftSide(){
	a = getPosition(ball).x - 1;
	b = getPosition(ball).y; 
	c = getPosition(ball).x + 40 + 1;
	there_is_an_element = false;

	for( i=0 ; i < 39 ; i++){ //Whenever you CAN please replace this 39 by a more generic variable
		b = b + 1;  
		
		
		var above_element = document.elementFromPoint(Math.abs(a), Math.abs(b) );
		if(above_element != null){ class_of_the_element_1 = above_element.className;}
		
		var below_element = document.elementFromPoint(Math.abs(c), Math.abs(b) );
		if(below_element != null){ class_of_the_element_2 =  below_element.className;}
		
		if(class_of_the_element_1 == "brick"){
			var audio = new Audio('button-4.mp3');
			audio.play();
			if(above_element != null){above_element.remove();}
			there_is_an_element = true; 

		} else if (class_of_the_element_2 == "brick") {
			var audio = new Audio('button-4.mp3');
			audio.play();	
			if(below_element != null){below_element.remove();}
			there_is_an_element = true; 
			ball_dx = -ball_dx;//Arbitrary for playability 
		}


	}

	if(there_is_an_element){
		//console.log("Man on the moon!");
		ball_dx = -ball_dx;
		ball_dy = -ball_dy; //This make it a little bit harder even It's not physically right
	}
}








function move(element, dx, dy){
	element.style.left = ( getPosition(ball).x + dx ) + "px";
	element.style.top  = ( getPosition(ball).y + dy ) + "px";
}

function checkForPaddle(){
	x = getPosition(ball).x + (ball.clientWidth/2);
	y = getPosition(ball).y + ball.clientHeight;

	paddleLeftCorner_x = getPosition(paddle).x;
	paddleLeftCorner_y = getPosition(paddle).y;

	if(   ( x >  paddleLeftCorner_x && x < paddleLeftCorner_x + paddle.clientWidth) && (y >= paddleLeftCorner_y)  ){ 
		ball_dy = -ball_dy;
		//ball_dx = ;
	}
}

function checkForWall() {
	x = getPosition(ball).x;
	y = getPosition(ball).y;

	if(x >= window.innerWidth  - (ball.clientWidth + Math.abs(ball_dx)) || x <= 0) {
		ball_dx = (-1)*ball_dx;
	}

	if(y >= window.innerHeight - (ball.clientHeight+ Math.abs(ball_dy)) || y <= 0){
		ball_dy = (-1)*ball_dy;
	}
}

function getPosition(element) {	
	//Source: kiriupa, returns the position of the upper left corner of the given element
    var xPosition = 0;
  	var yPosition = 0;
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}


































var buttom2 = document.getElementsByClassName("secondButtom")[0];
var is_it_paused = true;

buttom2.onclick = function(){pause()};

function pause(){
	if(is_it_paused){
		clearInterval(animation);
		is_it_paused = false;
	}else{
		animation = setInterval(function(){moveBall()},1000/60);
		is_it_paused = true;
	}
}

