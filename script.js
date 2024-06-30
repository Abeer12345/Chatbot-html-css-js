document.getElementById('send-btn').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
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

 // demande comme image  //
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

 // Pour l'envoi d'un msg pour des differents type (soit texte, image ou equation mathematique)  // 
function sendMessage() {
    let userInput = document.getElementById('chat-input').value;
    if (userInput.trim() !== '') {
        if (userInput.includes('$')) {
            addEquationMessage(userInput, 'user-message');
        } else {
            addMessage(userInput, 'user-message');
        }
        document.getElementById('chat-input').value = '';
        
        setTimeout(function() {
            let botResponse = getBotResponse(userInput);
            if (botResponse.includes('$')) {
                addEquationMessage(botResponse, 'bot-message');
            } else {
                addMessage(botResponse, 'bot-message');
            }
        }, 1000);
    }
}

function addMessage(message, className) {
    let chatBody = document.getElementById('chat-body');
    let messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addImageMessage(imageSrc) {
    let chatBody = document.getElementById('chat-body');
    let messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    let imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.style.maxWidth = '100%';
    imageElement.style.borderRadius = '10px';
    messageElement.appendChild(imageElement);
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(function() {
        let botResponse = "Nice picture!";
        addMessage(botResponse, 'bot-message');
    }, 1000);
}

function addEquationMessage(equation, className) {
    let chatBody = document.getElementById('chat-body');
    let messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    let equationElement = document.createElement('span');
    equationElement.innerHTML = equation;
    messageElement.appendChild(equationElement);
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
    MathJax.typeset();
}



// Les reponses du chatbot //
function getBotResponse(userInput) {
    userInput = userInput.toLowerCase();

    // Greetings //
    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
        return "Hello! How can I assist you with your studies today?";
    }

    // questions //
    if (userInput.includes('how') || userInput.includes('what') || userInput.includes('why')) {
        return "That's a great question! Let me help you with that.";
    }

    // Thank you //
    if (userInput.includes('thank you') || userInput.includes('thanks')) {
        return "You're welcome! If you have any other questions, feel free to ask.";
    }

    // response par default //
    return "I'm an educational bot. How can I assist you today?";
}
