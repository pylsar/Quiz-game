const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const quizQuestionElements = document.getElementById('quiz__question');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answers');
let shuffledQuestions;
let currentQuestionIndex;



startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0; // так как начинаем с первого вопроса
    quizQuestionElements.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerText = answer.text;
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct);
    })
    
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [
    {
        question: '12/4',
        answers: [
            {text: '3', correct: true},
            {text: '18', correct: false},
            {text: '2', correct: false},
            {text: '4', correct: false}
        ]
    },
    {
        question: '2+2',
        answers: [
            {text: '0', correct: false},
            {text: '1', correct: false},
            {text: '2', correct: false},
            {text: '4', correct: true}
        ]
    }
]