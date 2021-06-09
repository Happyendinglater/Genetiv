const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Der Mann wurde _____ Mordes beschuldigt.",
        choice1: "der",
        choice2: 'des',
        choice3: 'den',
        choice4: 'dem',
        answer: 2,
    },
    {
        question: "Sissi nahm sich _____ _____Hundes an.",
        choice1: "den, armen",
        choice2: "des, armen",
        choice3: "den, Armen",
        choice4: "des, Armen",
        answer: 2,
    },
    {
        question: "Frank rühmte sich _____ _____ .",
        choice1: "seinem, taten",
        choice2: "seinem, Taten",
        choice3: "seiner, taten",
        choice4: "seiner, Taten",
        answer: 4,
    },
    {
        question: "Die Gruppe wurde gestern _____ _____ verwiesen.",
        choice1: "das, Restaurants",
        choice2: "des, Restaurants",
        choice3: "der, Restaurants",
        choice4: "das, Restaurant",
        answer: 2,
    },
    {
        question: "Peter ist _____ _____ mächtig.",
        choice1: "das, Klavierspielens",
        choice2: "des, Klavierspielens",
        choice3: "der, Klavierspielen",
        choice4: "das, Klavierspielens ",
        answer: 2,
    },
    {
        question: "Meine Mutter ist die älteste Tochter _____ _____.",
        choice1: "ihrem, Mutter",
        choice2: "ihren, Mutter",
        choice3: "ihrer, Mutter",
        choice4: "ihres, Mutter",
        answer: 3,
    },
    {
        question: "Ich gedenke all der Opfer _____ _____.",
        choice1: "das, Überfalls",
        choice2: "des, Überfalls",
        choice3: "der, Überfalls",
        choice4: "das, Überfall",
        answer: 2,  
    },
    {
        question: "Mein Handy ist das neueste Produkt _____ _____.",
        choice1: "das, Firma",
        choice2: "der, Firma",
        choice3: "den, Firma",
        choice4: "die, Firma",
        answer: 2,
    },
    {
        question: "Die graue Katze ist die alte Katze _____ _____.",
        choice1: "der, Nachbarn",
        choice2: "das, Nachbarn",
        choice3: "die, Nachbarn",
        choice4: "den, Nachbarn",
        answer: 1,
    },
    {
        question: "Der Hund bemächtigt sich heimlich _____ _____.",
        choice1: "der, Steaks",
        choice2: "des, Steaks",
        choice3: "das, Steaks",
        choice4: "des, Steak",
        answer: 2,
    },
    {
        question: "Tereza ist die eifrigste Schülerin _____ _____.",
        choice1: "die, Klasse",
        choice2: "das, Klasse",
        choice3: "der, Klasse",
        choice4: "den, Klasse",
        answer: 3,
    },
    {
        question: "Die roten Rosen sind die schönsten Blumen _____ _____.",
        choice1: "das, Gartens",
        choice2: "der, Gartens",
        choice3: "des, Gartens",
        choice4: "die, Gartens",
        answer: 3,
    },
    {
        question: "Meine Oma erfreut sich _____ _____.",
        choice1: "Besten, Gesundheit",
        choice2: "Bestes, Gesundheit",
        choice3: "Bester, Gesundheit",
        choice4: "Beste, Gesundheit",
        answer: 3,
    },
    {
        question: "Das ist das neue Hemd _____ _____ Mannes.",
        choice1: "die, jungen",
        choice2: "des, junges",
        choice3: "des, jungen ",
        choice4: "die, junger",
        answer: 3,
    },
    {
        question: "Der Verletzte bedarf schnell_____ _____ .",
        choice1: "ersten, Hilfe",
        choice2: "erstem, Hilfe",
        choice3: "erster, Hilfe",
        choice4: "erster, Hilfen",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
