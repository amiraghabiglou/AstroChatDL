from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Load your OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    user_question = request.json.get("question")

    if not user_question:
        return jsonify({"answer": "Please provide a valid question."})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # or gpt-4.1-mini for cost-efficient
            messages=[
                {"role": "system", "content": "You are an expert in astronomical imaging and deep learning."},
                {"role": "user", "content": user_question}
            ],
            max_tokens=300
        )

        answer = response.choices[0].message["content"].strip()
        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"})


if __name__ == "__main__":
    app.run(debug=True)
