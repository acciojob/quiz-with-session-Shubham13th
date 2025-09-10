//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
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
const questionsElement = document.getElementById("questions");
        const submitButton = document.getElementById("submit");
        const scoreElement = document.getElementById("score");

        // Load saved answers from sessionStorage (progress)
        let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

        // Render questions
        function renderQuestions() {
            questionsElement.innerHTML = ""; // clear on refresh
            questions.forEach((q, i) => {
                const questionDiv = document.createElement("div");
                questionDiv.innerHTML = `<p>${q.question}</p>`;

                q.choices.forEach((choice) => {
                    const choiceElement = document.createElement("input");
                    choiceElement.type = "radio";
                    choiceElement.name = `question-${i}`;
                    choiceElement.value = choice;

                    // keep checked state if saved
                    if (userAnswers[i] === choice) {
                        choiceElement.checked = true;
                    }

                    // Save to sessionStorage on change
                    choiceElement.addEventListener("change", () => {
                        userAnswers[i] = choice;
                        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
                    });

                    const label = document.createElement("label");
                    label.textContent = choice;

                    questionDiv.appendChild(choiceElement);
                    questionDiv.appendChild(label);
                    questionDiv.appendChild(document.createElement("br"));
                });

                questionsElement.appendChild(questionDiv);
            });
        }

        // Submit quiz
        submitButton.addEventListener("click", () => {
            let score = 0;

            questions.forEach((q, i) => {
                if (userAnswers[i] === q.answer) {
                    score++;
                }
            });

            scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

            // Save score in localStorage
            localStorage.setItem("score", score);
        });

        // Show last saved score (if any)
        const savedScore = localStorage.getItem("score");
        if (savedScore !== null) {
            scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
        }

        renderQuestions();
