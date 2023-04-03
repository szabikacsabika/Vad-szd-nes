//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Mikor született Neumann János?",
        options: ["1906", "1903", "1895", "1910"],
        correct: "1903",
    },
    {
        id: "1",
        question: "Mely területen alkotott és ért el sikert Semmelweis Ignác",
        options: ["Fizika", "Matematika", "Biológia", "Orvostudomány"],
        correct: "Orvostudomány",
    },
    {
        id: "2",
        question: "Jedlik Ányos mit talált fel?",
        options: ["Dinamó", "Számítógép", "Fertőtlenítés", "Motor"],
        correct: "Dinamó",
    },
    {
        id: "3",
        question: "Neumann János mit talált fel?",
        options: ["Számítógép", "Dinamó", "Motor", "Fertőtlenítés"],
        correct: "Számítógép",
    },
    {
        id: "4",
        question: "Mit talált fel Tihanyi Kálmán",
        options: ["Fertőtlenítés", "Ikonoszkóp", "Számítógép", "Dinamó"],
        correct: "Ikonoszkóp",
    },
    {
        id: "5",
        question: "Melyik évben nyújtotta be Tihanyi Kálmán a szabadalmi bejelentését:",
        options: ["1921", "1930", "1924", "1926"],
        correct: "1926",
    }, {
        id: "6",
        question: "Hogy nevezzük az elektronikus számítógépek belső szervezésének elméletét?",
        options: ["Neumann-elv", "Számítógép-elmélet", "Számítógép-elv", "Neumann-elmélet"],
        correct: "Neumann-elv",
    },
    {
        id: "7",
        question: "Mi lett Semmelweis Ignác beceneve miután kutatásai sikeresnek bizonyosultak",
        options: ["Orvosok hőse", "A Jani", "Anyák megmentője", "Kórhházi megmentő"],
        correct: "Anyák megmentője",
    },
    {
        id: "8",
        question: "Milyen származású volt Neumann János",
        options: ["Lengyel", "Amerikai", "Magyar", ""],
        correct: "Magyar",
    },
    {
        id: "9",
        question: "Ki találta fel az ikonoszkópot a felsorolt feltalálók közül?",
        options: ["Semmelweis Ignác", "Tihanyi Kálmán", "Jedlik Ányos", "Neumann János"],
        correct: "Tihanyi Kálmán",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Elért pontszámod " + scoreCount + " / " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " / " + quizArray.length + " Kérdés";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " / " + quizArray.length + " Kérdés";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("kérdés");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};