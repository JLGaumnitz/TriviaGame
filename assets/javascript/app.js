$(document).ready(function () {

  // Start the game when user clicks on the "Giddy-up" button
  $("#start-button").on("click", gameState.startTimer);
});

//The state of game play
var gameState = {

  // Set the timer for 60 seconds, and count down by 1 second
  timeRemaining: 60,

  // Start the timer, hide the start page, display the 10 questions
  startTimer: function () {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // Decrement the timer and update the page; stop the timer at 0
  countdown: function () {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // Stop the timer and check the answers
  stopTimer: function () {
    clearInterval();
    trivia.checkAnswers();
  },

  // Hide the quetions and display the end page with results
  // I would like to display the correct answers here, too.

  showEndPage: function (numberCorrect, numberIncorrect, numberUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correctAnswers").text("Correct answers (Hay!): " + numberCorrect);
    $("#incorrectAnswers").text("Incorrect answers (Neigh!): " + numberIncorrect);
    $("#unansweredQuestions").text("Unanswered questions: " + numberUnanswered);
  }
}

// Functions to build the questions page and scoring
var trivia = {

  //Pull questions from the array of questions, loop through them, and append to div
  displayQuestions: function () {
    var divContainer = $("#questions-box");
    divContainer.append('<h2>Choose one answer for each question:</h2>');

    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];
      var answer4 = questionBank[i].answers[3];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer4 + '</label></div>');
    }

    // Button at end of question list to stop timer and go to end page
    var doneButton = '<button class="btn btn-dark btn-lg" id="done-button" type="submit">Whoa!</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // Test whether the user answers are correct, incorret, or unanswered
  checkAnswers: function () {
    var correctAnswer;
    var userAnswer;
    var numberCorrect = 0;
    var numberIncorrect = 0;
    var numberUnanswered = 0;

    //Loop to compare the label with the user's answers and increment the scores
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio' + i + ']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numberCorrect++;
      } else if (userAnswer === "") {
        numberUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numberIncorrect++;
        }
      }
    }

    //Reveal the end page with the score tally
    gameState.showEndPage(numberCorrect, numberIncorrect, numberUnanswered);
  },
}

// Question bank with questions, possible answers, and correct answer (set up as an array with objects)
var questionBank =
  [
    {
      question: "Which of these things can a horse NOT do?",
      answers: ["Burp", "Vomit", "Breathe through its mouth", "All of the above"],
      correct: "All of the above"
    },

    {
      question: "How many gallons of water does the average horse drink each day?",
      answers: ["25 gallons", "18 gallons", "10 gallons", "5 gallons"],
      correct: "25 gallons"
    },
    {
      question: "A horse’s height is measured at its shoulder in units known as 'hands.' How much is 1 hand equal to?",
      answers: ["2 inches", "4 inches", "6 inches", "12 inches"],
      correct: "4 inches"
    },
    {
      question: "How does the size of a horse’s brain compare to that of a human brain?",
      answers: ["It is twice as large.", "It is the same size.", "It is half the size.", "It is a quarter the size."],
      correct: "It is half the size."
    },
    {
      question: "How many horses are estimated to live in the United States?",
      answers: ["1 million", "9 million", "20 million", "50 million"],
      correct: "9 million"
    },
    {
      question: "The oldest known horse lived how many years?",
      answers: ["40 years", "51 years", "62 years", "73 years"],
      correct: "62 years"
    },
    {
      question: "When a horse is at a full gallop, how many hooves are off the ground at the same time?",
      answers: ["1", "2", "3", "4"],
      correct: "4"
    },
    {
      question: "What is a young female horse called?",
      answers: ["Foal", "Filly", "Colt", "Pony"],
      correct: "Filly"
    },
    {
      question: "What is a gelding?",
      answers: ["A young male horse", "A male horse that has been castrated", "A female horse that has not had a foal", "A female horse that has had a foal"],
      correct: "A male horse that has been castrated"
    },
    {
      question: "Which of these statements is false about a horse’s vision?",
      answers: ["Horses are color blind.", "Horses can see almost completely around their entire body.", "A horse has blind spots directly in front of its face, beneath its head, and directly behind itself.", "Horse eyes are among the largest of any land mammal."],
      correct: "Horses are color blind."
    }
  ]