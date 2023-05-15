var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var pauseButton = document.getElementById("pause-button");
var nextButton = document.getElementById("next-button");
var endButton = document.getElementById("end-button");

var sections = [
    { title: "VR", duration: 1260 }, // 21 minutes = 21 * 60 seconds
    { title: "DM", duration: 1860 }, // 31 minutes = 31 * 60 seconds
    { title: "QR", duration: 1500 }, // 25 minutes = 25 * 60 seconds
    { title: "AR", duration: 720 },  // 12 minutes = 12 * 60 seconds
    { title: "SJ", duration: 1560 }  // 26 minutes = 26 * 60 seconds
];

var breakDuration = 80; // 1 minute 20 seconds
var currentSectionIndex = 0;
var isBreak = false;
var isPaused = false;
var timeRemaining = sections[currentSectionIndex].duration;
var timerInterval;

// Display the duration of the first section (VR)
var minutes = Math.floor(timeRemaining / 60);
var seconds = timeRemaining % 60;
timerElement.innerText = formatTime(minutes) + ":" + formatTime(seconds);

function startTimer() {
    startButton.disabled = true;
    pauseButton.disabled = false;
    nextButton.disabled = false;
    endButton.disabled = false; // Make end button active
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
        pauseButton.innerText = "Resume";
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        isPaused = false;
        pauseButton.innerText = "Pause";
    }
}

function updateTimer() {
    timeRemaining--;

    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;

    timerElement.innerText = formatTime(minutes) + ":" + formatTime(seconds);

    if (timeRemaining === 0) {
        clearInterval(timerInterval);
        timerElement.innerText = "00:00";

        if (isBreak || currentSectionIndex === sections.length - 1) {
            endProgram();
        } else {
            timeRemaining = breakDuration;
            isBreak = true;
            displaySectionTitle();
            startButton.disabled = false;
            pauseButton.disabled = true;
            nextButton.disabled = false;
            endButton.disabled = false;
        }
    }
}

function displaySectionTitle() {
    var sectionTitle = document.getElementById("section-title");
    if (isBreak) {
        sectionTitle.innerText = "Break";
    } else {
        sectionTitle.innerText = sections[currentSectionIndex].title;
    }
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function nextSection() {
    if (isPaused) {
      pauseTimer(); // Resume the timer if paused
    }
    
    if (!isBreak) {
      // If current section is the last one, restart the program
      if (currentSectionIndex === sections.length - 1) {
        endProgram();
      } else {
        timeRemaining = breakDuration;
        isBreak = true;
        displaySectionTitle();
        startTimer(); // Automatically start the timer
      }
    } else {
      currentSectionIndex++;
      timeRemaining = sections[currentSectionIndex].duration;
      isBreak = false;
      displaySectionTitle();
      startTimer(); // Automatically start the timer
    }
  
    // Update the timer display
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;
    timerElement.innerText = formatTime(minutes) + ":" + formatTime(seconds);
  }
  

function endProgram() {
    currentSectionIndex = 0;
    isBreak = false; // Reset the break flag
    timeRemaining = sections[currentSectionIndex].duration;
    displaySectionTitle();
    startButton.disabled = false;
    pauseButton.disabled = true;
    nextButton.disabled = false;
    endButton.disabled = false;
    clearInterval(timerInterval);
    timerElement.innerText = "00:00";

    // Display the duration of the first section (VR)
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;
    timerElement.innerText = formatTime(minutes) + ":" + formatTime(seconds);
}


displaySectionTitle();
