const userName = document.getElementById("userName");
const saveScoreButton = document.getElementById("saveScoreButton");
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
//console.log(highScores)

//console.log(JSON.parse(localStorage.getItem("highScores")));

finalScore.innerText = mostRecentScore

//don't let the button be clicked before something is input
userName.addEventListener("keyup", () => {
    saveScoreButton.disabled = !userName.value;
})
saveHighScore = (e) => {
//    console.log("clicked the save button")
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: userName.value
    };
    highScores.push(score);
//sort() sorts values as strings. Adding compare (below) compares values and sorts by value
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
//set high scores into local storage by making string
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html")
    
//    console.log(highScores);
};