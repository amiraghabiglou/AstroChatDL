# Astronomical Imaging Chatbot (Flask + OpenAI)

A minimal Flask-based web app that allows users to ask questions about astronomical imaging and deep learning.  
The app uses the OpenAI Chat API for responses.

## Setup

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


3. Export your OpenAI API key:
   ```bash
   export OPENAI_API_KEY="your_api_key_here"
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
