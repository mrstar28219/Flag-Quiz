const flags = [
    {
        country: "Japan",
        image: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
        options: ["Japan", "South Korea", "China", "Thailand"]
    },
    {
        country: "Germany",
        image: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
        options: ["Germany", "Belgium", "Netherlands", "Sweden"]
    },
    {
        country: "Brazil",
        image: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
        options: ["Brazil", "Argentina", "Mexico", "Colombia"]
    },
    {
        country: "India",
        image: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
        options: ["India", "Pakistan", "Nepal", "Sri Lanka"]
    },
    {
        country: "United States",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
        options: ["United States", "Canada", "Australia", "United Kingdom"]
    }
];

// Function to shuffle the flags array
function shuffleFlags() {
    for (let i = flags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flags[i], flags[j]] = [flags[j], flags[i]];
    }
}

shuffleFlags();

let currentFlagIndex = 0;

function loadFlag() {
    const flag = flags[currentFlagIndex];
    const flagImage = document.getElementById("flagImage");

    // Add fade-out animation
    flagImage.classList.add("fade-out");

    setTimeout(() => {
        flagImage.src = flag.image;
        const buttons = document.querySelectorAll(".option");
        flag.options.forEach((option, index) => {
            buttons[index].textContent = option;
        });

        document.getElementById("result").textContent = "";  // Clear the result message
        flagImage.classList.remove("fade-out");
        flagImage.classList.add("fade-in");
    }, 500); // Delay for the fade-out duration
}

function checkAnswer(button) {
    const selectedAnswer = button.textContent;
    const correctAnswer = flags[currentFlagIndex].country;

    if (selectedAnswer === correctAnswer) {
        document.getElementById("result").textContent = "Correct!";
        document.getElementById("result").classList.add("correct");
        document.getElementById("result").classList.remove("wrong");
    } else {
        document.getElementById("result").textContent = `Wrong! The correct answer is ${correctAnswer}.`;
        document.getElementById("result").classList.add("wrong");
        document.getElementById("result").classList.remove("correct");
    }

    setTimeout(() => {
        currentFlagIndex = (currentFlagIndex + 1) % flags.length;
        loadFlag();
    }, 2000);
}

// Speech synthesis function to speak the country name
function speakCountryName() {
    const flag = flags[currentFlagIndex];
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(flag.country);

    // You can set additional options such as pitch, rate, and voice
    utterance.pitch = 1;
    utterance.rate = 1;
    synth.speak(utterance);
}

// Load the first flag when the page loads
window.onload = loadFlag;

