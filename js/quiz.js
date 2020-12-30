
const points = document.getElementById('points')
const question = document.getElementById('question')
const answerBar = document.getElementById('answerBar')
const logInScreen = document.getElementById('logInScreen')
const username = document.getElementById('username')
const nameInput = document.getElementById('nameInput')
const myTimer = document.getElementById('timer')
const gameWindow = document.getElementById('gameWindow')
const questionInput = document.getElementById('questionInput').oninput = changeValue
const submitButton = document.getElementById('submitButton').onclick = submitQuestion
const startGameButton = document.getElementById('startGameButton').onclick = startGame


let timePassed = 0
let questionId = 0
let userPoints = 0
let counter


function startGame () {

    counter = 60
    gameWindow.style.display = "block"
    logInScreen.style.display = "none"
    username.innerText = nameInput.value
    timePassed = 0
    gameWindow.classList.remove("greenAnimation")
    gameWindow.classList.remove("redAnimation")

    fetch(`http://167.99.138.67:3300/quiz/question`)
        .then(response => response.json())
        .then(data => {
            question.innerText = ""
            questionInput.placeholder = ""
            answerBar.innerText = ""
            questionInput.value = ""
            question.innerText = data.question
            questionId = data.id
            myTimerF ()
            console.log(data)
        })
}

function changeValue (event) {
    console.log(event)
    answerBar.innerHTML = event.path[0].value
}

function submitQuestion () {


    fetch(`http://167.99.138.67:3300/quiz/${answerBar.innerHTML}/${questionId}`,)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.correct) { //TIKRINA AR data.correct TRUE
                userPoints += data.points
                points.innerHTML = userPoints
                gameWindow.style.animation = "greenAnimation 5s"
                setTimeout(()=>{
                    gameWindow.style.animation = ""
                }, 6000)
                counter = 60
                startGame()
            } else {
                alert("WRONG ANSWER!")
                gameWindow.style.animation = "redAnimation 5s"
                setTimeout(()=>{
                    gameWindow.style.animation = ""
                }, 6000)
                questionInput.innerHTML = ""
                answerBar.innerText = ""
                counter = 60
            }

            if (userPoints >= 30) {
                alert("CONGRATULATIONS, YOU WON!")
            }
        })
}

// MAKE A SIMPLE QUIZ APPLICATION

// get random question from server by fetching http://167.99.138.67:3300/quiz/question (GET METHOD)
// you get an server response with question, id, and answer, make the question to appear on screen
// so user is asked a question which he answers by typing answer to the input
// when answer is typed and submit button clicked, post request is sent to server http://167.99.138.67:3300/quiz/answer
// post request should be used with these params : answer: "user Answer", id: "question id" }
// after successful request you should get back there params correct: true, points: 3}
// if answer correct, add points to user score and get another question from api
// if user reach 30 points make a screen to congrats him, as he won the game
// to get answer make get request to : http://167.99.138.67:3300/quiz/:answer/:id

// Make user login, so before playing user should enter his name
// after name is entered open game window where user name is displayed on top
// when answer is correct add animation to background so it changes its color smoothly
// when answer is incorrect add animation to background so it changes its color to red smoothly
// also add a counter to make limited time answering a question,
// when counter is out and question is not answered, subtract one point

function myTimerF () {
    function myTimerFunction (time) {
        const minutes = Math.floor((time / 60))
        let seconds = time % 60
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        return `${minutes}:${seconds}`
    }


    setInterval(()=>{
        myTimer.innerText = myTimerFunction(counter)
        counter--
        if (counter === 0) {
            alert("TIME IS UP, YOU LOST!")
            userPoints--
            startGame()
        }
    },1000)

}



