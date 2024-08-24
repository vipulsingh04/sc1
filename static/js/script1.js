let generatedQuestion = ''; // Variable to store the generated question

// Function to generate questions based on content
document.getElementById('generateQuestionsBtn').addEventListener('click', function() {
    let content = document.getElementById('contentInput').value;
    let questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // Clear previous questions

    if (content.trim() === '') {
        alert('Please enter some content to generate questions.');
        return;
    }

    fetch('/generate-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.question) {
            generatedQuestion = data.question; // Store the generated question
            let questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>1. ${generatedQuestion}</p>
                <input type="text" id="answer0" placeholder="Your answer...">
            `;
            questionsContainer.appendChild(questionDiv);
            document.getElementById('actionButtons').style.display = 'flex'; // Show action buttons
        } else {
            alert('Error generating question: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to check answers
document.getElementById('checkAnswersBtn').addEventListener('click', function() {
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    let userAnswer = document.getElementById('answer0').value.trim();
    let content = document.getElementById('contentInput').value.trim();

    if (!userAnswer) {
        alert('Please provide an answer.');
        return;
    }

    if (!generatedQuestion) {
        alert('Please generate a question first.');
        return;
    }

    fetch('/check-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            answer: userAnswer, 
            content: content,
            question: generatedQuestion // Include the generated question in the request
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            let resultDiv = document.createElement('div');
            resultDiv.classList.add('result');
            resultDiv.innerHTML = `<p>${data.result}</p>`;
            resultsContainer.appendChild(resultDiv);
        } else {
            alert('Error checking answer: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to handle generating more questions
document.getElementById('generateMoreQuestionsBtn').addEventListener('click', function() {
    let content = document.getElementById('contentInput').value;
    let questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = ''; // Clear previous questions

    if (content.trim() === '') {
        alert('Please enter some content to generate questions.');
        return;
    }

    fetch('/generate-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.question) {
            generatedQuestion = data.question; // Update the stored question
            let questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>${generatedQuestion}</p>
                <input type="text" id="answer0" placeholder="Your answer...">
            `;
            questionsContainer.appendChild(questionDiv);
        } else {
            alert('Error generating question: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to handle closing the Q&A window
document.getElementById('closeBtn').addEventListener('click', function() {
    let questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    document.getElementById('contentInput').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('actionButtons').style.display = 'none'; // Hide action buttons
    generatedQuestion = ''; // Reset the generated question
});
