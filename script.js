const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Roma"
        },
        correct: "Paris",
    },
    {
        question: "How many time zones are there in Russia?",
        answers: {
            a: "11",
            b: "15",
            c: "9",
            d: "6"
        },
        correct: "11",
    },
    {
        question: "What’s the national flower of Japan?",
        answers: {
            a: "Daffodil",
            b: "Lilac",
            c: "Tulip",
            d: "Cherry blossom"
        },
        correct: "Cherry blossom",
    },
    {
        question: "How many stripes are there on the US flag?",
        answers: {
            a: "12",
            b: "13",
            c: "14",
            d: "15"
        },
        correct: "13",
    },
    {
        question: "What’s the national animal of Australia?",
        answers: {
            a: "Grey Kangaroo",
            b: "Red Kangaroo",
            c: "Bear",
            d: "Giraffe"
        },
        correct: "Red Kangaroo",
    },
    {
        question: "How many days does it take for the Earth to orbit the Sun?",
        answers: {
            a: "360",
            b: "7",
            c: "365",
            d: "30"
        },
        correct: "365",
    },
    {
        question: "Which of the following empires had no written language?",
        answers: {
            a: "Incan",
            b: "Aztec",
            c: "Egyptian",
            d: "Roman"
        },
        correct: "Incan",
    },
    {
        question: "Until 1923, what was the Turkish city of Istanbul called?",
        answers: {
            a: "Izmir",
            b: "Ottoman",
            c: "Bizans",
            d: "Constantinople"
        },
        correct: "Constantinople",
    },
    {
        question: "What’s the smallest country in the world?",
        answers: {
            a: "Monaco",
            b: "The Vatican",
            c: "Nauru",
            d: "Tuvalu"
        },
        correct: "The Vatican",
    },
    {
        question: "What’s the capital of Canada?",
        answers: {
            a: "Berlin",
            b: "Ottawa",
            c: "Paris",
            d: "Roma"
        },
        correct: "Ottawa",
    },
]

const totalQuestions = document.getElementById("total");
const currentQuestions = document.getElementById("current");

const questionContainer = document.getElementById("questionContainer");

const count = document.getElementById("count");

const question = document.getElementById("question");

const answerBtns = document.querySelectorAll(".answerBtn");

let index = localStorage.getItem("currentIndex")
? JSON.parse(localStorage.getItem("currentIndex"))
: 0;

totalQuestions.textContent = questions.length;
currentQuestions.textContent = index + 1;

const getRandomColor = () =>{
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r}, ${g}, ${b})`;

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const textColor = luminance > 186 ? "black" : "white";

    return { backgroundColor: color, textColor: textColor };
}

const displayQuestion = () =>{
    question.textContent = questions[index].question;
    const[a, b, c, d] = answerBtns;

    const { backgroundColor, textColor} = getRandomColor();

    questionContainer.style.backgroundColor = backgroundColor;
    questionContainer.style.color = textColor;
    count.style.color = textColor;

    answerBtns.forEach((answerBtn) => {
        answerBtn.classList.remove("bg-red-500", "bg-green-500");
    });

    a.textContent = questions[index].answers.a;
    b.textContent = questions[index].answers.b;
    c.textContent = questions[index].answers.c;
    d.textContent = questions[index].answers.d;

    currentQuestions.textContent = index + 1;
}

answerBtns.forEach((answerBtn) => {
    answerBtn.addEventListener("click", function () {
        const givenAnswer = this.textContent;
        const correctAnswer = questions[index].correct;

        const correctAnswerElement = [...answerBtns].find(
            (answerBtn) => answerBtn.textContent === correctAnswer
        );

        if(correctAnswer === givenAnswer){
            answerBtn.classList.add("bg-green-500");
        } else{
            answerBtn.classList.add("bg-red-500");
            setTimeout(() => {
                correctAnswerElement.classList.add("bg-green-500");
            }, 500);
        }

        if(index < questions.length - 1) {
            index ++;
        }

        localStorage.setItem("currentIndex", index);

        setTimeout(displayQuestion, 2000);
    })
});

displayQuestion();