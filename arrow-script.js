document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("arrowForm");
    const resultBox = document.getElementById("result");
    const scoreDetails = document.getElementById("score-details");
    const timerDisplay = document.getElementById("timer");
  
    // Full answer key for all 15 questions
    const correctAnswers = {
      q1: "liquidity",
      q2: "displacement",
      q3: "closeBelow",
      q4: "killzones",
      q5: "unicorn",
      q6: "sweep",
      q7: "reaction",
      q8: "precision",
      q9: "return",
      q10: "invalidation",
      q11: "smt",
      q12: "respected",
      q13: "external",
      q14: "algo",
      q15: "reaction",
    };
  
    // Timer logic (15 minutes = 900 seconds)
    let timeLeft = 900;
    const timer = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        form.querySelector("button").disabled = true;
        resultBox.textContent = "⏰ Time’s up! Test auto-submitted.";
        submitAnswers();
      }
    }, 1000);
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitAnswers();
    });
  
    function submitAnswers() {
      clearInterval(timer);
      const userAnswers = {};
      let score = 0;
  
      // Collect user answers
      for (let i = 1; i <= 15; i++) {
        userAnswers[`q${i}`] = form[`q${i}`].value;
        if (!userAnswers[`q${i}`]) {
          resultBox.textContent = "⚠️ Answer all questions first.";
          resultBox.style.color = "#ffcc00";
          return;
        }
        if (userAnswers[`q${i}`] === correctAnswers[`q${i}`]) score++;
      }
  
      // Display result
      const percentage = (score / 15) * 100;
      if (percentage >= 80) {
        resultBox.textContent = `✅ Passed! Score: ${score}/15 (${percentage.toFixed(1)}%) - Welcome to the ARROW sniper squad.`;
        resultBox.style.color = "#00ff88";
      } else {
        resultBox.textContent = `❌ Failed. Score: ${score}/15 (${percentage.toFixed(1)}%) - Study the algo hunt and retry.`;
        resultBox.style.color = "#ff4c4c";
      }
  
      // Show detailed feedback
      scoreDetails.classList.remove("hidden");
      scoreDetails.innerHTML = "<h3>Your Answers:</h3>";
      for (let i = 1; i <= 15; i++) {
        const q = `q${i}`;
        const isCorrect = userAnswers[q] === correctAnswers[q];
        scoreDetails.innerHTML += `<p>Q${i}: ${isCorrect ? "✅ Correct" : `❌ Wrong (Correct: ${correctAnswers[q]})`}</p>`;
      }
    }
  });