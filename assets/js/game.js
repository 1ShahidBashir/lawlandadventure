const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What is the minimum age for working??",
    choice1: "14",
    choice2: "16",
    choice3: "10",
    choice4: "18",
    answer: 1
  },
  {
    question:
      "What is the maximum amount of time a child can work legally?",
    choice1: "12 hours",
    choice2: "8 hours",
    choice3: "3 hours",
    choice4: "10 hours",
    answer: 3
  },
  {
    question: "What is the child helpline number in India?",
    choice1: "1010",
    choice2: "100",
    choice3: "102",
    choice4: "1098",
    answer: 4
  },
  {
    question: "Which of the follwoing is not a right of children?",
    choice1: "Getting driving license",
    choice2: "Getting education",
    choice3: "Getting adequate food",
    choice4: "Living in a healthy manner",
    answer: 1
  },
  {
    question: "What can we do to stop child labor?",
    choice1: "a) Encourage children to work long hours",
    choice2: "b) Provide education and opportunities for families in poverty",
    choice3: "c) Ignore child labor practices",
    choice4: "d) Celebrate child labor as a valuable tradition",
    answer: 2
  },
  {
    question: "Which of the following is considered a basic right for children?",
    choice1: "a) The right to have unlimited screen time",
    choice2: "b) The right to play with any toy they want",
    choice3: "c) The right to education and learning",
    choice4: "d) The right to stay up as late as they want",
    answer: 3
  }, 
  {
    question: "Which of the following is a basic right of every child?",
    choice1: "a) Right to vote",
    choice2: "b) Right to education",
    choice3: "c) Right to own property",
    choice4: "d) Right to drive a car",
    answer: 2
  }, 
  {
    question: "How can we ensure all children have access to education?",
    choice1: "a) By only letting rich children go to school",
    choice2: "b) By providing free and quality education for all children",
    choice3: "c) By closing down schools",
    choice4: "d) By letting children decide if they want to go to school or not",
    answer: 2
  }, 
  {
    question: "What does 'Child Rights' mean?",
    choice1: "a) Rules for adults",
    choice2: "b) Rules for children",
    choice3: "c) Rules for pets",
    choice4: "d) Rules for toys",
    answer: 2
  }, 
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 10;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
