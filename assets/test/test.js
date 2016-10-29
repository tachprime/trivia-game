var questions = ["question"];
var answers = ["answer 1", "answer 2"];
   
function showQuestion() {
    $('.question').html(questions[0]);
}

function showAnswers() {
    $('.answers').append('<div class="answer" id="a1">'+ answers[0] +'</div>');
    $('.answers').append('<div class="answer" id="a2">'+ answers[1] +'</div>');
}

function clickAnswer() {
    $('.answer').on('click', function(){
        var id = $(this).attr('id');
        console.log(id);
    });
}

$(document).ready(function() {
    showQuestion();
    showAnswers();
    console.log("document is ready");
    
    play();
});

function play() {
    clickAnswer();
}