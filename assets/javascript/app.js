var start = false;
var soundFx = null;

var Game = {
    timer: 31,
    //to hold interval
    counter: 0,
    //to track what question we are on
    questionNumber: 0,
    //track trivia stats
    rightChoice: 0,
    wrongChoice: 0,
    noChoice: 0,
    
    //game functions
    //------------------------------------------------------------------
    countDown: function () {
        Game.timer--;
        Game.showTimer();
        Game.checkForTime();
    },
    //checks to see if user has anytime left if not move on to next ?
    checkForTime: function () {
        if (this.timer <= 0) {
            Game.noChoice++;
            continueGame();
        }
    },
    nextQuestion: function () {
        this.questionNumber++;
        this.resetTimer();
        setTimeout(playGame, 1000);
    },
    reset: function() {
        this.resetTimer();
        this.counter = 0;
        this.questionNumber = 0;
        this.rightChoice= 0;
        this.wrongChoice= 0;
        this.noChoice= 0;
    },
    resetTimer: function () {
        this.timer = 31;
    },
    showTimer: function () {
        $('#timer').html(Game.timer);
    },
    startTimer: function () {
        this.counter = setInterval(Game.countDown, 1000);
    },
    stopTimer: function () {
        clearInterval(Game.counter);
    }
};

var TriviaQuestion = {
    question: [],
    answerChoices: [],
    correctAnswer: [],
    images: ["assets/images/transf_logo.gif"],
};

function setTriviaQuestions() {
    TriviaQuestion.question = setQuestion();
    TriviaQuestion.answerChoices = setAnswerChoices();
    TriviaQuestion.correctAnswer = setCorrectAnswer();
}

function setQuestion() {
    let question =
        [
            "Who is the Leader of the Autobots?",
            "Which is an actual Transformer name?",
            "Which of these is not a Transformer",
            "What is another alias for Optimus Prime",
            "Megatron is later transformed into which villain",
            "What is the name of the evil version of Optimus",
            "Who is the creator of the Transformers",
            "Who is the leader of the Dinobots"
        ]
    
    return question;
}

function setCorrectAnswer() {
    let correctAnswer =
        [
            "Optimus Prime",
            "Jazz",
            "Ontronicon",
            "Convoy",
            "Galvatron",
            "Nemesis Prime",
            "The Quintessons",
            "Grimlock"
        ]
    
    return correctAnswer;
}

function setAnswerChoices() {
    let answerChoices = 
        [
            [
                "Rodimus Prime",
                "Optimus Primal",
                "Alpha Trion",
                "Optimus Prime"
            ],
            [
                "Boombox",
                "Harmony",
                "Jazz",
                "Disco-inferno"
            ],
            [
                "Trypticon",
                "Ontronicon",
                "Metroplex",
                "Omega Supreme"
            ],
            [
                "Convoy",
                "Zeta Prime",
                "Automus",
                "Big Red"
            ],
            [
                "Shockwave",
                "Galvatron",
                "Quintesson",
                "Devestator"
            ],
            [
                "Dark Convoy",
                "Rodimus Prime",
                "Omega Prime",
                "Nemesis Prime"
            ],
            [
                "The Quintessons",
                "Unicron",
                "Primus",
                "Alpha Trion"
            ],
            [
                "Slag",
                "Snarl",
                "Grimlock",
                "Swoop"
            ]
        ]
    
    return answerChoices;
}

function showQuestion() {
    $('#question').html('<h3>' + TriviaQuestion.question[Game.questionNumber] + '</h3>');
}

function showChoices() {
    $('#answers').html('<div class="answer" id="ansA">'
                         + TriviaQuestion.answerChoices[Game.questionNumber][0] +'</div>');
    $('#answers').append('<div class="answer" id="ansB">'
                         + TriviaQuestion.answerChoices[Game.questionNumber][1] +'</div>');
    $('#answers').append('<div class="answer" id="ansC">'
                         + TriviaQuestion.answerChoices[Game.questionNumber][2] +'</div>');
    $('#answers').append('<div class="answer" id="ansD">'
                         + TriviaQuestion.answerChoices[Game.questionNumber][3] +'</div>');
}

function showTrivia() {
    showQuestion();
    showChoices();
}

function reset() {
    Game.reset();
    $('#results').hide();
    $('.gameSection').show();
    start = true;
    playGame();
}

//for when Game is over
function showRestartBtn() {
    var restartBtn = $('<button>');
    restartBtn.addClass("btn btn-danger");
    restartBtn.css('box-shadow', '-2px 5px 1px black');
    restartBtn.text("Restart");
    restartBtn.attr('id', "restartBtn");
    $('#results').append(restartBtn);
    
    $('#restartBtn').on("click", function() {
       reset(); 
    });
}

//for when Game is over
function showFinalResults() {
    let numCorrect = Game.rightChoice,
        numWrong = Game.wrongChoice,
        unAnswered = Game.noChoice;
    $('#results').show();
    $('.gameSection').hide();
    $('#results').html('<h2>The End</h2>');
    $('#results').append('<h3>Correct: '+ numCorrect +'</h3>');
    $('#results').append('<h3>Wrong: '+ numWrong +'</h3>');
    $('#results').append('<h3>Didn\'t Answer: '+ unAnswered +'</h3>');
    
    showRestartBtn();
}

//for when question is answered or Time is up
function showResult(result) {
    if(soundFx != null){
        soundFx.play();
    }
    $('#answers').empty();
    $('#answers').html('<h3>'+ result +'</h3>');
    $('#answers').append('<img src='+ TriviaQuestion.images[0] +'>');
}

//continue only after Choice is made or Time is up
function continueGame() {
    //get next question or stop game if no more questions left
    if(Game.questionNumber < TriviaQuestion.question.length -1){
         Game.nextQuestion();
    } else {
        Game.stopTimer();
        setTimeout(showFinalResults, 2000);
    }  
}

function isChoiceCorrect(answer) {
    //compare answer clicked with correct answer in Trivia
    if (answer === TriviaQuestion.correctAnswer[Game.questionNumber]) {
        let result = "correct answer";
        Game.rightChoice++;
        showResult(result);
    } else {
        let result = "wrong answer";
        Game.wrongChoice++;
        showResult(result);
    } 
    //continue game regardless of result
    continueGame();
}

function getUserChoice() {
   //click event for choosing an answer
    $('.answer').on('click', function() {
            let choice = $(this).attr('id');
            let answer = $('#'+ choice).text();
            isChoiceCorrect(answer);
    }); 
}

function startGame() {
    $('#startBtn').on('click', function() {
        $('.startSection').hide();
        $('.gameSection').show();
        Game.startTimer();
    }); 
}

function playGame() {
    startGame();
    setTriviaQuestions();
    showTrivia();
    //only used when restarting from end of game
    if(start){
        Game.startTimer();
        start =false;
    }
    getUserChoice();
}

$(document).ready(function() {
    $('.gameSection').hide();
    $('#results').hide();
    soundFx = new Audio("assets/audio/Transition1.wav");
    playGame();
});