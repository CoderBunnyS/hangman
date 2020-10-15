const userName = document.getElementById("userName");
const saveScoreButton = document.getElementById("saveScoreButton")
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
//console.log(highScores)

//console.log(JSON.parse(localStorage.getItem("highScores")));

finalScore.innerText = mostRecentScore

userName.addEventListener("keyup", () => {
    saveScoreButton.disabled = !userName.value;
})
saveHighScore = e => {
//    console.log("clicked the save button")
    e.preventDefault();
    const score = {
        score: Math.floor(Math.random() * 100),
        name: userName.value
    };
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html")
    
//    console.log(highScores);
};