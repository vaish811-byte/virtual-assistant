let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speakWord() {
  const word = document.getElementById("targetWord").value.trim();
  if (!word) {
    alert("Please enter a word first.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';

  const femaleVoice = voices.find(v =>
    v.lang === 'en-US' &&
    (v.name.toLowerCase().includes('female') ||
     v.name.toLowerCase().includes('samantha') ||
     v.name.toLowerCase().includes('zira') ||
     v.name.toLowerCase().includes('woman'))
  );
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  speechSynthesis.speak(utterance);
}

function startListening() {
  const inputBox = document.getElementById("targetWord");
  const target = inputBox.value.trim().toLowerCase();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech Recognition not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    const spoken = event.results[0][0].transcript.toLowerCase().trim();

    if (!target) {
      inputBox.value = spoken;
      speakWord();
      showResult(spoken, 100);
    } else {
      const accuracy = calculateSimilarity(spoken, target);
      showResult(spoken, accuracy);
    }
  };

  recognition.onerror = function (event) {
    alert("Speech recognition error: " + event.error);
  };
}

function calculateSimilarity(a, b) {
  let match = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] === b[i]) match++;
  }
  return Math.round((match / b.length) * 100);
}

function showResult(spoken, accuracy) {
  const resultDiv = document.getElementById("result");
  const bar = document.getElementById("accuracyBar");

  resultDiv.innerHTML = `🧠 You said: <strong>${spoken}</strong><br>🎯 Accuracy: <strong>${accuracy}%</strong>`;
  bar.style.width = `${accuracy}%`;
  bar.textContent = `${accuracy}%`;

  if (accuracy >= 80) {
    bar.className = "progress-bar bg-success";
  } else if (accuracy >= 50) {
    bar.className = "progress-bar bg-warning";
  } else {
    bar.className = "progress-bar bg-danger";
  }
}

function clearAll() {
  document.getElementById("targetWord").value = "";
  document.getElementById("result").innerHTML = "";
  const bar = document.getElementById("accuracyBar");
  bar.style.width = "0%";
  bar.textContent = "0%";
  bar.className = "progress-bar";
}
