// Constants
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Calculate and display the user's score
function calculateScore() {
  let score = 0;
  const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Event listener for the submit button
submitButton.addEventListener("click", () => {
  const finalScore = calculateScore();
  scoreElement.textContent = `Your score is ${finalScore} out of 5.`;
  localStorage.setItem("score", finalScore);
});
