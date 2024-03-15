let currentQuestionIndex = 0;
const results = { Classical: 0, Jazz: 0, Pop: 0 };
const questions = [
    {
        question: "What mood of music do you prefer?",
        answers: {
            "Uplifting": "Classical",
            "Energetic": "Jazz",
            "Relaxed": "Pop"
        }
    },
    {
        question: "What part of the day do you prefer to listen to music?",
        answers: {
            "Morning": "Classical",
            "Afternoon": "Jazz",
            "Evening": "Pop"
        }
    }
    // Add more questions as needed
];

document.getElementById('startQuiz').addEventListener('click', function() {
    this.classList.add('hidden');
    document.getElementById('quizContainer').classList.remove('hidden');
    showQuestion();
});

document.getElementById('nextButton').addEventListener('click', function() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;

    const category = selectedOption.value;
    results[category]++;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(true);
    }
});

function showQuestion(isBack = false) {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `<p>${question.question}</p>`;

    for (const [answer, category] of Object.entries(question.answers)) {
        const isChecked = results[category] > 0 && isBack;
        questionContainer.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${category}" ${isChecked ? 'checked' : ''}/>
                ${answer}
            </label><br/>
        `;
    }

    document.getElementById('nextButton').classList.remove('hidden');
    document.getElementById('backButton').classList[currentQuestionIndex > 0 ? 'remove' : 'add']('hidden');
}

function showResults() {
    document.getElementById('quizContainer').classList.add('hidden');

    const resultContainer = document.getElementById('resultContainer');
    const highestScoreCategory = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);

    resultContainer.innerHTML = `<p>We recommend you check out the Seattle Symphony's ${highestScoreCategory} shows!</p>`;
    resultContainer.classList.remove('hidden');
}