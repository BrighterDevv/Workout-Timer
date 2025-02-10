const workoutsList = document.getElementById("workouts-list");

// Load workouts
workouts.forEach((workout, index) => {
  const workoutItem = document.createElement("div");
  workoutItem.classList.add("workout-item");
  workoutItem.innerHTML = `
    <h3>${workout.name}</h3>
    <div class="difficulty ${workout.difficulty}">${workout.difficulty}</div>
    <p>Total Time: ${workout.totalTime}</p>
    <div class="details" style="display: none;">
      <p>Workout Time: ${workout.workoutTime}</p>
      <p>Break Time: ${workout.breakTime}</p>
      <p>Exercises: ${workout.exercises.join(", ")}</p>
      <p>Repetitions: ${workout.repetitions}</p>
      <button class="start-button">Start</button>
    </div>
  `;
  workoutsList.appendChild(workoutItem);

  // Expand/collapse workout
  workoutItem.addEventListener("click", (e) => {
    if (!e.target.classList.contains("start-button")) {
      const details = workoutItem.querySelector(".details");
      details.style.display = details.style.display === "none" ? "block" : "none";
    }
  });

  // Start Button Click
  const startButton = workoutItem.querySelector(".start-button");
  startButton.addEventListener("click", () => {
    // Store the selected workout in localStorage
    localStorage.setItem("selectedWorkout", JSON.stringify(workout));
    // Redirect to the Timer Page
    window.location.href = "timer.html";
  });
});