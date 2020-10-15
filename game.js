const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

//fetch questions from API
fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then((res) => {
        console.log(res)
        return res.json();
    })
    .then((loadedQuestions) => {
//        console.log(loadedQuestions.results);

//map creates a new array w/ results of calling function
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };
//API format different than mine so formatting it to fit
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index+1)] = choice;
            });
            return formattedQuestion;
        });
     //   questions = loadedQuestions;

        startGame();
    })
    .catch(err => {
        console.error(err)
        
    });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
//loader appears and game hides until ready, then switches
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter>= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)
        //go to winning page
        return window.location.assign("end.html")
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
//update the progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerHTML = currentQuestion["choice" + number];
    });
//adding question index to available Question array w/o removing anything
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};
//adding click listener to choice buttons
choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
//make choice red or green for incorrect/correct        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
//makes quiz wait to move to next question so user can see if they were right/wrong
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
