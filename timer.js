document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const workoutName = document.getElementById("workout-name");
    const currentStatus = document.getElementById("current-status");
    const countdown = document.getElementById("countdown");
    const playButton = document.getElementById("play-button");
    const pauseButton = document.getElementById("pause-button");
    const stopButton = document.getElementById("stop-button");
    const repCounter = document.getElementById("rep-counter");
    const backButton = document.getElementById("back-button");
  
    // Load selected workout from localStorage
    const selectedWorkout = JSON.parse(localStorage.getItem("selectedWorkout"));
    if (!selectedWorkout) {
      alert("No workout selected. Redirecting to main page.");
      window.location.href = "index.html";
      return;
    }
  
    // Display workout name
    workoutName.textContent = selectedWorkout.name;
  
    // Timer variables
    let currentExerciseIndex = 0;
    let currentRep = 1;
    let isWorking = true; // Tracks if it's exercise time or break time
    let timeLeft = parseInt(selectedWorkout.workoutTime.split(":")[1]); // Initial workout time
    let timerInterval;
    let isPaused = false;
  
    // Update the timer display
    const updateTimerDisplay = () => {
      countdown.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
    };
  
    // Update the status color and message
    const updateStatus = () => {
      if (isPaused) {
        currentStatus.textContent = "Paused";
        currentStatus.classList.remove("break", "workout", "started");
        currentStatus.classList.add("paused");
      } else if (isWorking) {
        currentStatus.textContent = selectedWorkout.exercises[currentExerciseIndex];
        currentStatus.classList.remove("break", "paused", "started");
        currentStatus.classList.add("workout");
      } else {
        currentStatus.textContent = "Break";
        currentStatus.classList.remove("workout", "paused", "started");
        currentStatus.classList.add("break");
      }
    };
  
    // Start the timer
    const startTimer = () => {
      isPaused = false;
      updateStatus();
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          // Switch between exercise and break
          if (isWorking) {
            isWorking = false;
            timeLeft = parseInt(selectedWorkout.breakTime.split(":")[1]); // Set break time
          } else {
            isWorking = true;
            timeLeft = parseInt(selectedWorkout.workoutTime.split(":")[1]); // Set workout time
            currentExerciseIndex = (currentExerciseIndex + 1) % selectedWorkout.exercises.length; // Move to next exercise
          }
          updateTimerDisplay();
          updateStatus();
  
          // Check if all exercises are done for the current rep
          if (currentExerciseIndex === 0 && !isWorking) {
            currentRep++;
            repCounter.textContent = `Reps: ${currentRep}`;
  
            // Check if all reps are done
            if (currentRep > selectedWorkout.repetitions) {
              clearInterval(timerInterval);
              alert("Workout complete! Great job!");
              stopTimer();
            }
          }
        }
      }, 1000);
    };
  
    // Pause the timer
    const pauseTimer = () => {
      isPaused = true;
      clearInterval(timerInterval);
      updateStatus();
    };
  
    // Stop the timer
    const stopTimer = () => {
      clearInterval(timerInterval);
      currentExerciseIndex = 0;
      currentRep = 1;
      timeLeft = parseInt(selectedWorkout.workoutTime.split(":")[1]); // Reset to workout time
      isWorking = true;
      isPaused = false;
      currentStatus.textContent = selectedWorkout.exercises[currentExerciseIndex];
      repCounter.textContent = `Reps: ${currentRep}`;
      updateTimerDisplay();
      updateStatus();
    };
  
    // Event listeners for buttons
    playButton.addEventListener("click", startTimer);
    pauseButton.addEventListener("click", pauseTimer);
    stopButton.addEventListener("click", stopTimer);
  
    // Back Button: Return to main page
    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  
    // Initialize the timer
    currentStatus.textContent = selectedWorkout.exercises[currentExerciseIndex];
    repCounter.textContent = `Reps: ${currentRep}`;
    updateTimerDisplay();
    updateStatus();
  });