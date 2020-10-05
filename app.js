const questionContainer = document.querySelector("#question-container");
const startButton = document.querySelector(".start-btn");
const nextButtton = document.querySelector(".next-btn");

const questionText = document.querySelector("#question");
const answersContainer = document.querySelector(".answers-container");

let currentQuestionIndex;
let questionAnswer;

let questions = [
    {
        question: "2+2",
        answers: [
            { text: "4", correct: true },
            { text: "6", correct: false },
            { text: "2", correct: false },
            { text: "-9", correct: false },
        ]
    },
    {
        question: "7+3",
        answers: [
            { text: "10", correct: true },
            { text: "1", correct: false },
            { text: "7", correct: false },
            { text: "-3", correct: false },
        ]
    },
    {
        question: "Hawaiian pizza?",
        answers: [
            { text: "no", correct: true },
            { text: "yes", correct: false },
        ]
    },
]


//Start game after click StartBtn button
startButton.addEventListener("click", startQuiz)

function startQuiz() {
    currentQuestionIndex = 0;
    //Shuffle Questions on Start;
    shuffleArray(questions);
    startButton.classList.add("remove");
    questionContainer.classList.remove("remove");
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        currentQuestionIndex++;
    } else {
        const quizTitle = document.querySelector("#title")
        quizTitle.innerText = "You Ended Quiz!";
        resetButton();
    }
}

function showQuestion(question) {
    questionText.innerText = `${question.question}`;
    showAnswers(question.answers);
    pickAnswer();
}

function showAnswers(answers) {
    //Shuffle Answers
    shuffleArray(answers);
    //Clear Answers Container
    answersContainer.innerHTML = ``;
    //Display Answers
    //Create Button For Each Answer
    answers.forEach(element => {
        const button = document.createElement('button');
        button.innerText = element.text;
        button.classList.add("answer");
        //If Answer is Correct Set Data to True
        if (element.correct) {
            button.dataset.correct = element.correct;
        }
        //Add Button To AnswersContainer
        answersContainer.appendChild(button);
    });
}

function pickAnswer() {
    var x = 0;
    const answerButtons = document.querySelectorAll(".answer");

    answerButtons.forEach(element => {
        element.addEventListener("click", function () {
            if (x === 0) {
                if (this.dataset.correct) {
                    this.classList.add("correct");
                    nextButtton.classList.remove("remove");
                } else {
                    this.classList.add("inncorrect")
                    resetButton();
                }
                x++;
            }
        })
    })

}

function resetButton() {
    startButton.innerText = "Reset";
    startButton.classList.remove("remove");
}

nextButtton.addEventListener("click", function () {
    this.classList.add("remove")
    nextQuestion();
})

//Randomize Array Elements Order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

