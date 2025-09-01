// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements
    const questionInput = document.getElementById('question-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBox = document.getElementById('chat-box');
    const loadingIndicator = document.getElementById('loading-indicator');

    const sendQuestion = async () => {
        const question = questionInput.value.trim();
        if (!question) return;

        // Display user's question and disable the input field
        appendMessage('user', question);
        questionInput.value = '';
        questionInput.disabled = true;
        sendBtn.disabled = true;
        loadingIndicator.classList.remove('hidden');
        
        let botMessageContainer;

        try {
            // Send the question to the Flask backend
            const response = await fetch("/ask", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({question: question})
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${errorText}`);
            }

            loadingIndicator.classList.add('hidden');
            
            // Create the container for the bot's streaming response
            botMessageContainer = appendMessage('bot', '');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            // Read and process the response stream chunk by chunk
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                fullResponse += decoder.decode(value, { stream: true });
                // Use the 'marked' library to render Markdown in real-time
                botMessageContainer.innerHTML = marked.parse(fullResponse);
                chatBox.scrollTop = chatBox.scrollHeight;
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            loadingIndicator.classList.add('hidden');
            // Ensure a message container exists to display the error
            if (!botMessageContainer) {
               botMessageContainer = appendMessage('bot', '');
            }
            botMessageContainer.innerHTML = `<strong>Error:</strong> ${error.message}`;

        } finally {
            // Re-enable the input field and button
            questionInput.disabled = false;
            sendBtn.disabled = false;
            questionInput.focus();
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    };
    
    // Function to add a new message to the chat box
    const appendMessage = (sender, text) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar');
        avatarDiv.textContent = sender === 'user' ? 'You' : 'AI';

        const textDiv = document.createElement('div');
        textDiv.classList.add('text');
        
        // For user messages, set simple text. For bot messages, the content will be HTML from Markdown.
        if (sender === 'user') {
            textDiv.textContent = text;
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(textDiv);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // Return the text container so it can be updated by the stream
        return textDiv;
    };

    // Add event listeners for the send button and the Enter key
    sendBtn.addEventListener('click', sendQuestion);
    questionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendQuestion();
        }
    });
});
