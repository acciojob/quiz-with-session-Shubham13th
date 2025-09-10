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
        choices: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Jupiter",
      },
      {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
      },
    ];

    const questionsDiv = document.getElementById("questions");

    // Load saved answers
    let savedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");

    // Render quiz
    questions.forEach((q, qIndex) => {
      const div = document.createElement("div");

      const label = document.createElement("h3");
      label.textContent = q.question; // ✅ FIXED
      div.appendChild(label);

      q.choices.forEach((choice) => { // ✅ FIXED
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "question" + qIndex;
        input.value = choice;

        // Restore saved state
        if (savedAnswers[qIndex] === choice) {
          input.checked = true;
          input.setAttribute("checked", "true"); // Cypress sees it
        }

        // On click save to localStorage
        input.addEventListener("click", () => {
          savedAnswers[qIndex] = choice;
          localStorage.setItem("answers", JSON.stringify(savedAnswers));

          // Reset all radios in this group
          document
            .querySelectorAll(`input[name="question${qIndex}"]`)
            .forEach(r => r.removeAttribute("checked"));

          input.setAttribute("checked", "true");
        });

        const span = document.createElement("span");
        span.textContent = choice;

        div.appendChild(input);
        div.appendChild(span);
        div.appendChild(document.createElement("br"));
      });

      questionsDiv.appendChild(div);
    });

    // Submit button
    document.getElementById("submit").addEventListener("click", () => {
      let score = 0;
      questions.forEach((q, i) => {
        if (savedAnswers[i] === q.answer) {
          score++;
        }
      });
      const result = `Your score is ${score} out of ${questions.length}.`;
      document.getElementById("score").textContent = result;

      // Save score to localStorage
      localStorage.setItem("score", score);
    });

    // If score already in storage, show it
    if (localStorage.getItem("score")) {
      document.getElementById("score").textContent =
        `Your score is ${localStorage.getItem("score")} out of ${questions.length}.`;
    }