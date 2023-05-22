var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;
var highestScore =0;
var gamelevels = {"beginner":1200,"intermediate":900,"expert":100};
var gameSpeed = 0;

$('.level-btn').click(function(){
    console.log(this.id);
    $('.levels').hide();
    $('#level-title').remove();
    $('#game-title').text('Press Any Key to Start');
    gameSpeed = gamelevels[this.id];
    $('.container').removeClass('hidden');
});

// Listeners
$('.btn').click(function(e){
    var pressedColor = e.currentTarget.id;
    userClickedPattern.push(pressedColor);
    playSound(pressedColor);
    $("#"+pressedColor).addClass('pressed');
    setTimeout(function() {$("#"+pressedColor).removeClass("pressed");}, 100);
    checkUser(userClickedPattern.length -1);
});

$(document).keydown(function(){
    startGame();
});


$('.mobile-btn').on("click",function(){
               startGame();
                $('.mobile-btn').addClass('hidden');
});



function startGame(){
    if (!started && gameSpeed!=0){
        $('#game-title').text('Level '+level);
        nextSound();
        started = true;
    }
}


// Functions
function nextSound(){
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    $('#game-title').text('Level '+level);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


}


function playSound(fileName){
    var sound = new Audio("sounds/"+fileName+".mp3");
    sound.play();
}

function checkUser(index){
    if(gamePattern[index] === userClickedPattern[index]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){nextSound()},gameSpeed);
        }
    }
    else{
        gameOver();
    }
}

function gameOver(){
    if(level > highestScore)
    {
        highestScore = level;
        $('#highest-score').text('Highest score: '+highestScore)
    }
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {$('body').removeClass("game-over");}, 400);
    gamePattern =[];
    level = 0;
    started = false;
    $('.container').addClass('hidden');
    $('.levels').show();
    $('#game-title').text('Game Over, Choose your level:');
}
