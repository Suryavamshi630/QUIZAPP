const questions = [
    {
        question: "When was first icc cricket world cup started?",
        answers: [
            { text: "1972", correct: false},
            { text: "1975", correct: true},
            { text: "1985", correct: false},
            { text: "1979", correct: false},
        ]
    },
    {
        question: "Which Indian cricketer had won the 'ManoftheMatch' award in the final of icc cricket world cup 1983?",
        answers: [
            { text: "Mohinder Amarnath", correct: true},
            { text: "Sunil Gavaskar", correct: false},
            { text: "Ravi Shastri", correct: false},
            { text: "Kapil Dev", correct: false},
        ]
    },
    {
        question: "Who was the highest run scorer in World cup 2023?",
        answers: [
            { text: "Rohit Sharma", correct: false},
            { text: "Virat Kohli", correct: true},
            { text: "Rachin Ravindra", correct: false},
            { text: "Quinton de Kock", correct: false},
        ]
    },
    {
        question: "Which Cricketer holds the record for the most sixes in the ICC Cricket World Cup 2023?",
        answers: [
            { text: "David Warner", correct: false},
            { text: "Glenn Maxwell", correct: false},
            { text: "Shreyas Iyer", correct: false},
            { text: "Rohit Sharma", correct: true},
        ]
    },
    {
        question: "Who won the ICC Cricket World Cup 2019?",
        answers: [
            { text: "Newzealand", correct: false},
            { text: "England", correct: true},
            { text: "India", correct: false},
            { text: "Australia", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Time in seconds

let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
    updateProgressBar();
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft + "seconds";
        } else {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100; // Calculate progress percentage
    progressBar.style.width = progress + "%"; // Update progress bar width
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    clearInterval(timerInterval); // Stop the timer when an answer is selected
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer(); // Start the timer for the next question
        updateProgressBar();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
