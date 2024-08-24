// Predefined correct answers for demonstration
const correctAnswers = [
    "The main idea is to demonstrate how to generate questions from content.",
    "1. Demonstrate question generation\n2. Provide content input\n3. Check answers",
    "The author is presenting a method to generate questions based on text input.",
    "The content explains how to create a system that generates questions from user-provided content."
];

// Function to generate questions based on content
document.getElementById('generateQuestionsBtn').addEventListener('click', function() {
    let content = document.getElementById('contentInput').value;
    let questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    if (content.trim() === '') {
        alert('Please enter some content to generate questions.');
        return;
    }

    // Simulating question generation using placeholder questions
    let questions = [
        "What is the main idea of the content?",
        "List three important points mentioned in the content.",
        "What is the author's perspective on the topic?",
        "Provide a brief summary of the content."
    ];

    questions.forEach((question, index) => {
        let questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${question}</p>
            <input type="text" id="answer${index}" placeholder="Your answer...">
        `;
        questionsContainer.appendChild(questionDiv);
    });
    
    document.getElementById('actionButtons').style.display = 'flex'; // Show action buttons
});

// Function to check answers
document.getElementById('checkAnswersBtn').addEventListener('click', function() {
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    correctAnswers.forEach((answer, index) => {
        let userAnswer = document.getElementById(`answer${index}`).value.trim();
        let isCorrect = userAnswer.toLowerCase() === answer.toLowerCase();
        
        let resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
            <p>Question ${index + 1}: ${isCorrect ? 'Correct!' : 'Incorrect.'}</p>
            <p>Correct Answer: ${answer}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
});

// Function to handle generating more questions
document.getElementById('generateMoreQuestionsBtn').addEventListener('click', function() {
    // Logic for generating more questions can be implemented here
    alert('Generating more questions...');
});

// Function to handle closing the Q&A window
document.getElementById('closeBtn').addEventListener('click', function() {
    let questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    document.getElementById('contentInput').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('actionButtons').style.display = 'none'; // Hide action buttons
});