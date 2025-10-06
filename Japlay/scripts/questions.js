const jlptN5Questions = [
    {
        question: "What does 'こんにちは' mean?",
        answers: ["Hello", "Goodbye", "Thank you", "Excuse me"],
        correctIndex: 0
    },
    {
        question: "How do you say 'book' in Japanese?",
        answers: ["ほん (hon)", "かみ (kami)", "つくえ (tsukue)", "いす (isu)"],
        correctIndex: 0
    },
    {
        question: "What is the Japanese word for 'water'?",
        answers: ["みず (mizu)", "ひ (hi)", "そら (sora)", "かぜ (kaze)"],
        correctIndex: 0
    },
    {
        question: "Which particle indicates the subject of a sentence?",
        answers: ["は (wa)", "を (wo)", "に (ni)", "で (de)"],
        correctIndex: 0
    },
    {
        question: "What does 'たべます' mean?",
        answers: ["To eat", "To drink", "To see", "To go"],
        correctIndex: 0
    },
    {
        question: "How do you say 'I' in Japanese (formal)?",
        answers: ["わたし (watashi)", "ぼく (boku)", "おれ (ore)", "わたくし (watakushi)"],
        correctIndex: 0
    },
    {
        question: "What is the reading of this kanji: 人?",
        answers: ["ひと (hito)", "にん (nin)", "じん (jin)", "にんげん (ningen)"],
        correctIndex: 0
    },
    {
        question: "What does 'ありがとう' mean?",
        answers: ["Thank you", "I'm sorry", "Good morning", "Good night"],
        correctIndex: 0
    },
    {
        question: "Which number is '七'?",
        answers: ["7", "1", "4", "9"],
        correctIndex: 0
    },
    {
        question: "What is the Japanese word for 'big'?",
        answers: ["おおきい (ookii)", "ちいさい (chiisai)", "たかい (takai)", "やすい (yasui)"],
        correctIndex: 0
    },
    {
        question: "What does 'いきます' mean?",
        answers: ["To go", "To come", "To return", "To stay"],
        correctIndex: 0
    },
    {
        question: "How do you say 'teacher' in Japanese?",
        answers: ["せんせい (sensei)", "がくせい (gakusei)", "いしゃ (isha)", "えんぴつ (enpitsu)"],
        correctIndex: 0
    },
    {
        question: "Which is the correct way to say 'I am a student'?",
        answers: ["わたしはがくせいです", "わたしがくせいです", "がくせいですわたし", "がくせいわたしです"],
        correctIndex: 0
    },
    {
        question: "What is the Japanese word for 'cat'?",
        answers: ["ねこ (neko)", "いぬ (inu)", "とり (tori)", "さかな (sakana)"],
        correctIndex: 0
    },
    {
        question: "What does 'すみません' mean?",
        answers: ["Excuse me / I'm sorry", "Thank you", "Goodbye", "Hello"],
        correctIndex: 0
    }
];

let usedQuestions = [];
let currentQUestion = null;

const questionText = document.getElementById('questionText');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const answerButtons = [answer1, answer2, answer3, answer4];

answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        checkAnswer(index);
    });
});

function nextQuestion() {
    // Get a random question
    const availableQuestions = jlptN5Questions.filter(q => !usedQuestions.includes(q));
    
    if (availableQuestions.length === 0) {
        console.log("No more questions");
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    usedQuestions.push(currentQuestion);
    
    // Display the question
    displayQuestion(currentQuestion);
}

function displayQuestion(question) {
    questionText.textContent = question.question;
    
    // Shuffle the answers
    const shuffledAnswers = shuffleArray([...question.answers]);
    
    // Display answers on buttons
    answerButtons.forEach((button, index) => {
        button.textContent = shuffledAnswers[index];
    });
    
    // Store correct answer index for shuffled answers
    currentQuestion.shuffledCorrectIndex = shuffledAnswers.indexOf(question.answers[question.correctIndex]);
}

function checkAnswer(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestion.shuffledCorrectIndex;

    showAnswerFeedback(isCorrect);
    
    if (isCorrect) {
        console.log("Correct answer!");
        score += 10;
        document.getElementById('score').innerText = `Score: ${score}`;
    } else {
        console.log("Wrong answer");
        timeLeft -= 5;
        if (timeLeft < 0) timeLeft = 0;
        document.getElementById('timerDisplay').textContent = `Time: ${timeLeft}s`;
    }
    
    // HIDE THE QUESTION DISPLAY AFTER ANSWERING
    document.getElementById('questionDisplay').style.display = "none";
    
    // Resume the game
    gameState = 'playing';
}

function showAnswerFeedback(isCorrect) {
    const feedback = document.getElementById('answerFeedback');
    const feedbackText = document.getElementById('feedbackText');
    
    if (isCorrect) {
        feedbackText.textContent = "CORRECT!";
        feedback.className = "answer-feedback correct";
    } else {
        feedbackText.textContent = "WRONG!";
        feedback.className = "answer-feedback wrong";
    }
    
    // Show the feedback
    feedback.style.display = "block";
    
    // Hide it after 1.5 seconds
    setTimeout(() => {
        feedback.style.display = "none";
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}