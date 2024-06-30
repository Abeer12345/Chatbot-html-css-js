document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('chat-input').value;
    sendMessage(userInput);
});

document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let userInput = document.getElementById('chat-input').value;
        sendMessage(userInput);
    }
});

document.getElementById('open-btn').addEventListener('click', function() {
    document.getElementById('chatbox').style.display = 'block';
    this.style.display = 'none';
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('chatbox').style.display = 'none';
    document.getElementById('open-btn').style.display = 'flex';
});

// Gestion de l'envoi des images
document.getElementById('image-btn').addEventListener('click', function() {
    document.getElementById('image-input').click();
});

document.getElementById('image-input').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addImageMessage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Affichage/Masquage de la zone de problème et de questions
document.getElementById('toggle-problem-btn').addEventListener('click', function() {
    let problemSection = document.getElementById('problem-section');
    if (problemSection.style.display === 'none') {
        problemSection.style.display = 'block';
    } else {
        problemSection.style.display = 'none';
    }
});

// Fermeture de la section de problème
document.getElementById('close-problem-btn').addEventListener('click', function() {
    document.getElementById('problem-section').style.display = 'none';
});

// Ajout d'une question à la liste
document.getElementById('add-question-btn').addEventListener('click', function() {
    let questionInput = document.getElementById('question-input');
    let question = questionInput.value.trim();
    if (question !== '') {
        addQuestion(question);
        questionInput.value = '';
    }
});

// Ajout d'une question en cliquant sur un élément de liste prédéfini
document.getElementById('questions-list').addEventListener('click', function(event) {
    let question = event.target.textContent.trim();
    if (question !== '') {
        sendMessage(question); // Envoyer la question au chatbot
    }
});

// Fonction pour ajouter une question à la liste
function addQuestion(question) {
    let questionsList = document.getElementById('questions-list');
    let listItem = document.createElement('li');
    listItem.className = 'list-group-item question-item';
    listItem.textContent = question;
    questionsList.appendChild(listItem);
}

// Gestion de l'envoi de message (avec ou sans question spécifique)
document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('chat-input').value.trim();
    sendMessage(userInput);
});

document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        let userInput = document.getElementById('chat-input').value.trim();
        sendMessage(userInput);
    }
});

// Fonction pour envoyer un message au chatbot
function sendMessage(message) {
    if (message !== '') {
        addMessage(message, 'user-message');
        document.getElementById('chat-input').value = '';

        // Simuler une réponse du chatbot après 1 seconde
        setTimeout(function() {
            let botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot-message');
        }, 1000);
    }
}

// Fonction pour ajouter un message à la zone de discussion
function addMessage(message, className) {
    let chatBody = document.getElementById('chat-body');
    let messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Fonction pour obtenir une réponse du chatbot en fonction de l'entrée utilisateur
function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();

    // Exemples de réponses du chatbot
    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
        return "Hello! How can I assist you with your studies today?";
    }
    if (userInput.includes('how') || userInput.includes('what') || userInput.includes('why')) {
        return "That's a great question! Let me help you with that.";
    }
    if (userInput.includes('thank you') || userInput.includes('thanks')) {
        return "You're welcome! If you have any other questions, feel free to ask.";
    }
    return "I'm an educational bot. How can I assist you today?";
}
