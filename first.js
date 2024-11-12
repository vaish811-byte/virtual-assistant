
let btn = document.querySelector("#askBtn");
let cont = document.querySelector("#ipt");


function speak(text) {
    let str = new SpeechSynthesisUtterance(text);
    str.rate = 1;
    str.volume = 1;
    str.pitch = 0.9;
   // str.voice=speechSynthesis.getVoices().find(voice => voice.name.includes("Google UK English Female"));
    str.lang = "en-US"; // Changed to "en-US" for better English pronunciation
    window.speechSynthesis.speak(str);
}
//Function to greet the user based on the time of day
function wish() {
    let d = new Date();
    let h = d.getHours();

    if (h >= 0 && h < 12) {
        speak("Good Morning! Hope you have a productive day.");
    } else if (h >= 12 && h < 16) {
        speak("Good Afternoon! What can I assist you with?");
    } else if (h >= 16 && h < 20) {
        speak("Good Evening! How can I help you today?");
    } else if (h >= 20 && h < 24) {
        speak("Good Night! Don't stay up too late.");
    }
}

// Invoke the wish function when the page loads
window.addEventListener("load", wish);

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    cont.value = transcript;
    console.log("You said:", transcript);
    takeCommand(transcript.toLowerCase());
};

// Start speech recognition on button click
btn.addEventListener("click", () => {
    recognition.start();
    speak("Listening, please say your command.");
});

// Function to process user commands
function takeCommand(message) {
    // Common greetings and queries
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! How may I assist you today?");
    } else if (message.includes("how are you")) {
        speak("I'm doing great! Thanks for asking. How can I assist you?");
    } else if (message.includes("who are you") || message.includes("who created you")) {
        speak("I am Alexa, your virtual assistant created by Vaishnavi Nigam.");
    } else if (message.includes("vaishnavi") || message.includes("your owner")) {
        speak("Vaishnavi created me. She is currently a second-year tech student with a passion for AI, Machine Learning, and Blockchain.");
    } else if (message.includes("open youtube")) {
        speak("Sure, opening YouTube for you.");
        window.open('https://www.youtube.com/');
    } else if (message.includes("open google")) {
        speak("Opening Google now.");
        window.open('https://www.google.com');
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp Web.");
        window.open('https://web.whatsapp.com');
    } else if (message.includes("who is your favorite person")) {
        speak("My favorite person is Vaishnavi, of course! She created me.");
    } else if (message.includes("what is the time")) {
        let time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
    } else if (message.includes("what is the date today")) {
        let date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else if (message.includes("tell me a joke")) {
        speak("Why don't programmers like nature? It has too many bugs!");
    } else if (message.includes("bye")) {
        speak("Goodbye! Have a great day ahead.");
    } else {
        // Attempt to answer simple questions before redirecting to Google search
        let response = getAnswer(message);
        if (response) {
            speak(response);
        } else {
            speak("I didn't quite catch that. Here is what I found on Google for you.");
            window.open(`https://www.google.com/search?q=${message}`);
        }
    }
}

// Function to provide immediate answers for common questions
function getAnswer(question) {
    // Basic responses for common questions
    const answers = {
        "what is your name": "My name is Alexa, your virtual assistant.",
        "how you are made":"i am made using HTML,CSS ,bootsrap  and Javascript",
        "what is bootsrap":"Bootstrap is a powerful front-end framework that makes web development easier and faster. Developed by Twitter, it provides a collection of CSS and JavaScript tools for creating responsive, mobile-first websites.",
        "how old are you": "I was created recently, so I'm quite young!",
        "what is ai": "Artificial Intelligence is the simulation of human intelligence in machines that are programmed to think and learn.",
        "what is blockchain": "Blockchain is a decentralized digital ledger that records transactions across many computers securely.",
        "what is javascript": "JavaScript is a versatile programming language used primarily for creating interactive effects within web browsers.",
        "what is html": "HTML stands for HyperText Markup Language, and it's the standard language for creating web pages.",
        "what is css": "CSS stands for Cascading Style Sheets, used for describing the look and formatting of a document written in HTML."
    };

    // Check if the question matches any known response
    for (let key in answers) {
        if (question.includes(key)) {
            return answers[key];
        }
    }
    return null; // Return null if no match is found
}
function clear()
{
    cont.value="";

}
let btn1=document.getElementById('clearBtn');
btn1.addEventListener("click",clear);
