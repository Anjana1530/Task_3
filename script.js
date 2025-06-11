// Known, accessible quiz questions
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "London"],
    answer: "Paris"
  },
  {
    question: "How many days are in a leap year?",
    options: ["365", "366", "364"],
    answer: "366"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Jupiter", "Mars", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Pacific", "Indian"],
    answer: "Pacific"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain"],
    answer: "William Shakespeare"
  }
];

let currentQuestionIndex = 0;

// Load initial question
document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
});

// Load question
function loadQuestion() {
  const quizQuestion = document.getElementById('quiz-question');
  const quizButtons = document.getElementById('quiz-buttons');
  const result = document.getElementById('quiz-result');
  result.textContent = ""; // Clear previous result

  if (currentQuestionIndex < quizData.length) {
    const current = quizData[currentQuestionIndex];
    quizQuestion.textContent = current.question;

    // Clear old buttons
    quizButtons.innerHTML = '';

    // Create option buttons
    current.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      quizButtons.appendChild(button);
    });
  } else {
    quizQuestion.textContent = "🎉 You've completed the quiz!";
    quizButtons.innerHTML = '';
  }
}

// Check answer
function checkAnswer(selectedOption) {
  const result = document.getElementById('quiz-result');
  const current = quizData[currentQuestionIndex];

  if (selectedOption === current.answer) {
    result.textContent = "🎉 Correct!";
    result.className = "correct";
  } else {
    result.textContent = "❌ Oops! Try again.";
    result.className = "wrong";
  }

  // Move to next question after a short delay
  setTimeout(() => {
    currentQuestionIndex++;
    loadQuestion();
  }, 1000);
}

// Fetch Joke from API
function fetchJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
      document.getElementById('joke').textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(error => {
      console.error('Error fetching joke:', error);
      document.getElementById('joke').textContent = "😔 Couldn't load a joke. Please try again.";
    });
}

