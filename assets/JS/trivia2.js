

var questionArray = ["1. What is the Capital of Jamaica?" , "2. What is the Capital of France?" ,   "3. What is the Capital of England?"];

var answerArray = [["Kingston" , "Paris" , "London" , "Brussels"], ["Paris" , "Kingston" , "London" , "Brussels"], ["Paris" , "Kingston" , "London" , "Brussels"], ["test"] ]; 

var correctAnswer = [ "Kingston" , "Paris" , "London"];

var imageArray = [ "<img class='jamaica img'   src='assets/JS/jamaica.jpg'>" ,  "<img class='paris img'   src='assets/JS/paris.jpg'>" ,    "<img class='london img'   src='assets/JS/camden.jpg'>" ] 

var time = 30;

var questionCounter = 0;

var correct = 0;

var incorrect = 0;

var unanswered = 0;

var answer;

var start;
 
clickSound = new Audio("assets/JS/click.mp3");

function startGame () {

 start = "<p class='text-center timer-p'> Time Remaining: <span class='timer'>30</span></p><p class='text-center question'>" + questionArray[questionCounter] +  "</p><p class='first-answer  text-center answer'>" + answerArray[questionCounter][0] + "</p><p class=' text-center answer'>" + answerArray[questionCounter][1] + "</p><p class='  text-center  answer'> " + answerArray[questionCounter][2]+ "</p><p class=' text-center   answer'> "+ answerArray[questionCounter][3]+"</p>";
	
	$(".mainArea").html(start);

}

function timer() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (time === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (time > 0) {
			time--;
		}
		$(".timer").html(time);
	}
}



$(document).ready(function() {

initialScreen();

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg  start-button   button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

});


$("body").on("click", ".start-button", function () {

	clickSound.play();
	startGame();
	timer();

});



function generateWin() {

	correct++;
	correctScreen =  imageArray[questionCounter] +  "<p class='  win  text-center'> Correct! The answer is: " + correctAnswer[questionCounter] + "</p>";
	$(".mainArea").html(correctScreen);
	setTimeout(wait, 2000);  
}


function generateLoss () {

incorrect++;

incorrectScreen = imageArray[questionCounter] + "<p class=' lose  text-center'> Incorrect! Sorrry but the correct answer is: " + correctAnswer[questionCounter] +  "</p>";

$(".mainArea").html(incorrectScreen);
	setTimeout(wait, 2000);  

}





$("body").on("click", ".answer", function(){

	clickSound.play();
 	answer = $(this).text();
 	console.log("count: " + questionCounter);
	if( answer.trim() === correctAnswer[questionCounter]) {
		
		generateWin();
		clearInterval(theClock);
		
	}
	else {
		generateLoss();
		clearInterval(theClock);
	}
}); 



function finalScreen () {

$(".img").hide()

$(".mainArea").hide();

 if (   unanswered  + incorrect >= correct ) {


 	var LoseScreen = 

 	"<p> You lost! </p>" + "<p>" + "Number Incorrect: " + incorrect + "</p>" + "<p>" + "Number Correct: " + correct + "</p>" + "<p>" + "Number Unanswered: " + unanswered + "</p>" 

 	 $(".result").html(LoseScreen)
 }



else {

	var winScreen =	"<p> You Won! </p>" + "<p>" + "Number Incorrect: " + incorrect + "</p>" + "<p>" + "Number Correct: " + correct + "</p>" + "<p>" + "Number Unanswered: " + unanswered + "</p>" 

	$(".result").html(winScreen);
}


}





function generateLossDueToTimeOut() {
	console.log(questionCounter);
	unanswered++;
	gameHTML =  "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + time + "</span></p>" + "<p class='text-center noTime '>You ran out of time!  The correct answer was: " + correctAnswer[questionCounter] + "</p>" ;
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);  
}

function wait() {

	++questionCounter;

	time = 30;
	
	if (questionCounter <=2 ) {
   
    startGame();
    timer();
	
	}

	else {

		finalScreen();
	}

};