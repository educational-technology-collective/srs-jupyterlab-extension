import openai
import json
from flask import Flask, request
from flask_cors import CORS
import requests, threading

app = Flask(__name__)
CORS(app, origins=['http://api.openai.com/v1/chat/completions', 'http://127.0.0.1:8888', 'http://localhost:8888'])


class OpenAIFlashCard:
    def __init__(self):
        openai.api_key = "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"
        self.flashcards = []

    def run(self, notebook):
        print("Running OpenAI Flashcard")

        # notebook is a json, convert to string
        notebook = json.dumps(notebook)

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo-0613",
                messages=[{"role": "user",
                           "content": "The following is a list of cells from a Jupyter notebook assignment from a data science course on the topic of regex expression. Please generate a list of flashcards in question answer format in an array of JSON. Focus on conceptual knowledge like regex basic knowledge. "+notebook}],
            )
        except Exception as e:
            print("Error in OpenAI", e)
            return str(e)

        if response['choices'][0]['finish_reason'] == 'stop':
            message = response['choices'][0]['message']['content']
            print(message)
            return message

        print("Finished generating flashcards")

        message = response["choices"][0]["message"]

        # Ensure that the message is an array of JSON
        if message[0] != '[':
            message = '[' + message
        if message[-1] != ']':
            message = message + ']'

        return message

@app.route("/data", methods=["POST"])
def insert_data():
    try:
        data = request.json
        print("Getting data from client", data)
        result = oai.run(data)
        print("Message from OpenAI", result)
        return result

    except Exception as e:
        return str(e)

if __name__ == "__main__":
    threading.Thread(target=app.run).start()
    oai = OpenAIFlashCard()
