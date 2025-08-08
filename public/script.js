
/*

const mosquitoBuzz = new Audio("mosquito1.mp3");
const mosquitoVoice = new Audio("mosquito2.mp3");
const mosquitoQuotes = [
  "You missed me! 🦟",
  "poda enne kitoola",
  "Catch me if you can!",
  "I drink your blood, not kaapi!",
  "You humans are so slow.",
  "Buzz buzz... too late!",
  "korch chora plsh",
  "I'm behind you!",
  "Try harder!",
  "Oops, not today!",
  "You really thought you'd get me?"
];

let escapeTimeout;

function startDetection() {
  document.getElementById("statusText").innerText = "Buzz detected!";
  document.getElementById("resultArea").style.display = "block";
  document.getElementById("smashBtn").style.display = "inline-block";
  document.getElementById("escapeText").style.display = "none";
  document.getElementById("speechBubble").style.display = "block";

  // Reset audio
  mosquitoBuzz.pause();
  mosquitoBuzz.currentTime = 0;
  mosquitoBuzz.play();

  mosquitoVoice.pause();
  mosquitoVoice.currentTime = 0;
  mosquitoVoice.play();

  // New quote
  const quote = mosquitoQuotes[Math.floor(Math.random() * mosquitoQuotes.length)];
  document.getElementById("mosquitoQuote").innerText = quote;

  clearTimeout(escapeTimeout);
  escapeTimeout = setTimeout(() => {
    mosquitoEscapes();
  }, 3000);
}

function smashMosquito() {
  clearTimeout(escapeTimeout);
  document.getElementById("statusText").innerText = "Mosquito squashed!";
  document.getElementById("smashBtn").style.display = "none";
  document.getElementById("speechBubble").style.display = "none";
  document.getElementById("escapeText").style.display = "none";

  // Stop audios
  mosquitoBuzz.pause();
  mosquitoVoice.pause();
}

function mosquitoEscapes() {
  document.getElementById("statusText").innerText = "Mosquito escaped!";
  document.getElementById("smashBtn").style.display = "none";
  document.getElementById("escapeText").style.display = "block";

  // Voice continues, buzz continues
}

*/

let isDetecting = false;
let currentAudio = null;
let escapeTimeout = null;
let mosquitoAppearedAt = 0; // For reaction time

const audioFiles = ['mosquito1.mp3', 'mosquito2.mp3', 'mosquito3.mp3'];
const dialogues = [
    "Hehe... Catch me if you can!",
    "You think you can stop me, hooman?",
    "Buzz buzz, your blood smells delish!",
    "Not today, forehead!",
    "I’ve trained with ninjas. You’ll never squash me!",
    "Haha! You swing like my grandma!",
    "Your defeat... is delicious.",
    "One mosquito, infinite chaos.",
    "You call that a slap? Try harder!",
    "I'm off to find tastier blood!"
];

// DOM Elements
const detectBtn = document.getElementById('detectBtn');
const statusText = document.getElementById('statusText');
const resultArea = document.getElementById('resultArea');
const smashBtn = document.getElementById('smashBtn');
const escapeText = document.getElementById('escapeText');
const speechBubble = document.getElementById('speechBubble');
const mosquitoQuote = document.getElementById('mosquitoQuote');
/*const reactionDisplay = document.createElement('div');

// Add Reaction Speed to page
reactionDisplay.className = 'reaction-time';
reactionDisplay.textContent = "⚡ Reaction: -- ms";
document.querySelector('header').appendChild(reactionDisplay);

// Update reaction time display
function updateReactionTime(ms) {
    reactionDisplay.textContent = `⚡ Reaction: ${ms} ms`;
}*/

const reactionDisplay = document.getElementById('reactionDisplay');

function updateReactionTime(ms) {
    reactionDisplay.textContent = `⚡ Reaction: ${ms} ms`;
}


// Play a random mosquito buzz + quote
function playRandomBuzz() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    currentAudio = new Audio(randomAudio);
    currentAudio.loop = true;
    currentAudio.play();

    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    mosquitoQuote.textContent = randomDialogue;
    speechBubble.style.display = 'block';
}

// Start mosquito detection
function startDetection() {
    if (isDetecting) return;
    isDetecting = true;

    detectBtn.disabled = true;
    detectBtn.textContent = '🔍 Detecting...';
    statusText.textContent = 'Scanning airspace...';
    resultArea.style.display = 'none';
    escapeText.style.display = 'none';
    smashBtn.style.display = 'none';

    const detectionTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
        showSmashOption();
    }, detectionTime);
}

// Show smash button and start buzz
function showSmashOption() {
    statusText.textContent = "Mosquito detected!";
    resultArea.style.display = 'block';
    smashBtn.style.display = 'inline-block';
    playRandomBuzz();

    mosquitoAppearedAt = Date.now(); // Start reaction timer

    // Mosquito escapes after 3 seconds if no smash
    escapeTimeout = setTimeout(() => {
        showEscapeMessage();
    }, 3000);
}

// Smash mosquito
function smashMosquito() {
    clearTimeout(escapeTimeout);

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const reactionTime = Date.now() - mosquitoAppearedAt;
    updateReactionTime(reactionTime);

    statusText.textContent = "🦟 Mosquito squashed!";
    smashBtn.style.display = 'none';
    speechBubble.style.display = 'none';

    setTimeout(resetSystem, 2000);
}

// Escape message
function showEscapeMessage() {
    if (currentAudio) {
        currentAudio.play();
    }
    smashBtn.style.display = 'none';
    escapeText.style.display = 'block';
    statusText.textContent = "It escaped!";
    updateReactionTime("--"); // No reaction time recorded for escape

    setTimeout(resetSystem, 2000);
}

// Reset system to ready state
function resetSystem() {
    detectBtn.disabled = false;
    detectBtn.textContent = '🔍 Detect Buzz';
    statusText.textContent = 'System Ready';
    isDetecting = false;
}

// Event Listeners
detectBtn.addEventListener('click', startDetection);
smashBtn.addEventListener('click', smashMosquito);
