from flask import Flask, render_template, request, Response
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize the OpenAI client
# The API key is read automatically from the OPENAI_API_KEY environment variable
try:
    client = OpenAI()
    api_key_set = True
except Exception as e:
    # This will happen if the OPENAI_API_KEY is not set
    print(f"Warning: OpenAI API key not found. The app will run but API calls will fail. Error: {e}")
    client = None
    api_key_set = False


@app.route("/")
def home():
    """Renders the main chat page."""
    # Pass a flag to the template to show a warning if the API key is missing
    return render_template("index.html", api_key_set=api_key_set)

@app.route("/ask", methods=["POST"])
def ask():
    """Handles the chatbot question and streams the response."""
    user_question = request.json.get("question")

    if not api_key_set or not client:
        return Response("Error: OpenAI API key not configured on the server.", status=500)

    if not user_question:
        return Response("Please provide a valid question.", status=400)

    # The system message primes the AI to be an expert in this specific domain
    system_message = {
        "role": "system",
        "content": "You are a helpful and knowledgeable assistant specializing in astronomical imaging and deep learning. Provide clear, accurate, and detailed explanations. Format your answers using Markdown."
    }
    user_message = {"role": "user", "content": user_question}

    def generate_responses():
        """A generator function that yields response chunks."""
        try:
            # Create a streaming chat completion
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[system_message, user_message],
                stream=True,  # This is the key to enabling streaming
                max_tokens=1024
            )
            for chunk in stream:
                # A chunk can be a content delta or other control message
                content = chunk.choices[0].delta.content
                if content:
                    yield content
        except Exception as e:
            # In case of an API error, yield an error message
            print(f"OpenAI API Error: {e}")
            yield f"Sorry, an error occurred with the AI service: {str(e)}"

    # Return a streaming response
    return Response(generate_responses(), mimetype='text/event-stream')


if __name__ == "__main__":
    app.run(debug=True)