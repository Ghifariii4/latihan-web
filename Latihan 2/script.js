// Pertanyaan
const questions = [
    // 1
    { question: "Siapa pembalap dengan gelar juara dunia terbanyak dalam sejarah F1?", 
        options: ["Mick Schumacher", "Lewis Hamilton", "Juan Manuel Fangio", "Ayrton Senna"], 
        correct: 1 },
    // 2
    { question: "Tim mana yang memiliki jumlah gelar konstruktor terbanyak dalam sejarah F1?", 
        options: ["McLaren", "Ferrari", "Mercedes", "Williams"], 
        correct: 1 },
    // 3
    { question: "Di musim F1 2021, Grand Prix Abu Dhabi yang kontroversial menentukan juara dunia antara?", 
        options: ["Max Verstappen dan Lewis Hamilton", "Sebastian Vettel dan Fernando Alonso", "Charles Leclerc dan Sergio Pérez", "VenuNico Rosberg dan Lewis Hamiltons"], 
        correct: 0 },
    // 4
    { question: "Sirkuit manakah yang memiliki tikungan ikonik bernama “Eau Rouge” dan “Raidillon”?", 
        options: ["Monza", "Silverstone", "Mandalika", "Spa-Francorchamps"],
        correct: 3 },
    // 5
    { question: "Apa regulasi utama yang diperkenalkan di musim F1 2022 untuk meningkatkan overtaking?", 
        options: ["Ground effect", "Halo", "DRS", "V6 Turbo Hybrid"],
        correct: 0 },
    // 6
    { question: "Tim F1 mana yang pertama kali memenangkan kejuaraan dunia pada era hybrid (2014-sekarang)?", 
        options: ["Mercedes", "Ferrari", "Red Bull", "McLaren"],
        correct: 0 },
    // 7
    { question: "Siapakah pembalap termuda yang pernah memenangkan balapan F1?", 
        options: ["Sebastian Vettel", "Max Verstappen", "Fernando Alonso", "Lewis Hamilton"],
        correct: 1 },
    // 8
    { question: "Siapakah pembalap F1 yang dikenal dengan julukan “The Flying Finn”?", 
        options: ["Kimi Räikkönen", "Valtteri Bottas", "Mika Häkkinen", "Keke Rosberg"],
        correct: 2 },
    // 9
    { question: "Sirkuit mana yang dikenal sebagai The Temple of Speed karena kecepatan rata-ratanya yang sangat tinggi?", 
        options: ["Circuit de Monaco", "Circuit de Barcelona-Catalunya", "Autodromo Nazionale Monza", "Bahrain International Circuit"],
        correct: 2 },
    // 10
    { question: "Tim mana yang mengembangkan sistem kontroversial DAS (Dual-Axis Steering) yang digunakan pada musim 2020?", 
        options: ["Red Bull", "Ferrari", "Mercedes", "Mclaren"],
        correct: 2 }
];

// variabel
let currentQuestionIndex = -1;
let score = 0;
let totalQuestions = questions.length;
let timer;
let timeLeft = 20;


// fungsi 
function showScreen(screenId) {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('quiz-screen').classList.add('d-none');
    document.getElementById('result-screen').classList.add('d-none');
    document.getElementById(screenId).classList.remove('d-none');
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = -1;
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex + 1 >= totalQuestions) {
        showResults();
        return;
    }
    currentQuestionIndex++;
    timeLeft = 20;
    startTimer();

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('question-counter').innerText = `${currentQuestionIndex + 1} dari ${totalQuestions}`;
    document.getElementById('progress-bar').style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    document.getElementById('next-question').disabled = true;

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-light', 'btn-option');
        button.innerText = option;
        button.onclick = () => checkAnswer(index, questionData.correct, button);
        optionsContainer.appendChild(button);
    });
}

function startTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('timer').classList.remove('text-danger', 'text-warning', 'text-success');
    document.getElementById('timer').classList.add('text-success');

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 5) {
            document.getElementById('timer').classList.remove('text-success', 'text-warning');
            document.getElementById('timer').classList.add('text-danger');
        } else if (timeLeft <= 10) {
            document.getElementById('timer').classList.remove('text-success');
            document.getElementById('timer').classList.add('text-warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            loadQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex, correctIndex, button) {
    clearInterval(timer);
    document.querySelectorAll('.btn-option').forEach(btn => btn.disabled = true);
    document.getElementById('next-question').disabled = false;

    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
    }
}

function showResults() {
    clearInterval(timer);
    document.getElementById('final-score').innerText = `Skor Anda: ${score} / ${totalQuestions}`;
    showScreen('result-screen');
}

document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('next-question').addEventListener('click', loadQuestion);
document.getElementById('retry-quiz').addEventListener('click', () => showScreen('start-screen'));