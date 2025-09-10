const questions = [
      { question: "2 + 2 = ?", choices: ["3", "4", "5"], answer: "4" },
      { question: "Capital of India?", choices: ["Delhi", "Mumbai", "Kolkata"], answer: "Delhi" },
      { question: "5 * 3 = ?", choices: ["15", "10", "8"], answer: "15" },
      { question: "Sun rises in?", choices: ["East", "West", "North"], answer: "East" },
      { question: "Water formula?", choices: ["H2O", "CO2", "O2"], answer: "H2O" }
    ];

    const questionsDiv = document.getElementById("questions");
    let savedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");

    // Render quiz
    questions.forEach((q, qIndex) => {
      const div = document.createElement("div");
      const label = document.createElement("h3");
      label.textContent = q.question;
      div.appendChild(label);

      q.choices.forEach((choice) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "question" + qIndex;
        input.value = choice;

        // Restore saved answers
        if (savedAnswers[qIndex] === choice) {
          input.checked = true;
          input.setAttribute("checked", "true");
        }

        input.addEventListener("click", () => {
          savedAnswers[qIndex] = choice;
          localStorage.setItem("answers", JSON.stringify(savedAnswers));
          // Reset all in group
          document.querySelectorAll(`input[name="question${qIndex}"]`).forEach(r => {
            r.removeAttribute("checked");
          });
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
      localStorage.setItem("score", score);
    });

    // If already scored, show score
    if (localStorage.getItem("score")) {
      document.getElementById("score").textContent =
        `Your score is ${localStorage.getItem("score")} out of ${questions.length}.`;
    }