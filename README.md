# Astro DL Chat: A Flask and OpenAI Chatbot

This is a web-based chatbot designed for enthusiasts and researchers interested in the intersection of astronomical imaging and deep learning. The application provides a clean, real-time chat interface powered by Flask and the OpenAI API.

This project serves as a portfolio piece demonstrating modern web development practices, including API integration, real-time data streaming, and containerization with Docker.

# Key Features
- Real-time Streaming: AI responses are streamed token-by-token for a fast, interactive user experience.

- Markdown Support: Chatbot responses are rendered as Markdown, allowing for rich formatting like lists, code blocks, and bold text.

- Modern UI: A responsive and clean user interface with a dark theme, consistent with a professional developer aesthetic.

- Dockerized: Comes with a Dockerfile for easy, reproducible deployment.

# Built With

- [Flask](https://flask.palletsprojects.com/)

- [OpenAI Python API](https://github.com/openai/openai-python)

- [python-dotenv](https://github.com/theskumar/python-dotenv)

- [Docker](https://www.docker.com/)

# Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

**Prerequisites**

Python 3.8+

pip

An [OpenAI API Key](https://platform.openai.com/account/api-keys)

**Local Installation**

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/astro-chat.git
   cd astro-chat
   ```
   
2. Create a virtual environment and install dependencies:
   ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
   ```


3. Set up your environment variables

   - Create a file named .env in the project root.

   - Add your OpenAI API key to this file:
    ```
    OPENAI_API_KEY="sk-YourSecretKeyHere"
   ```

4. Run the app:
    ```bash
   python app.py
    ```

5. Open in browser: http://127.0.0.1:5000

# Running with Docker

1. Build the Docker image
    ```bash
    docker build -t astro-chat .
    ```
   
2. Run the container

Make sure you pass your OpenAI API key as an environment variable:

   ````bash
       docker run -d \
       -p 5000:5000 \
       -e OPENAI_API_KEY="your_api_key_here" \
       --name astro_chat_container \
       astro-chat
   ````

3. Access the app

Open your browser at: http://127.0.0.1:5000

4. docker stop astro_chat_container
    ````bash
    docker stop astro_chat_container
    ````
   
5. Remove the container
    ````bash
    docker rm astro_chat_container
    ````
