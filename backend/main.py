from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI
import os
import numpy as np


app = Flask(__name__)
CORS(app)


openAI_key = "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"


# def generate_text(openAI_key, prompt, engine="text-davinci-003"):
#     openai.api_key = openAI_key
#     completions = openai.Completion.create(
#         engine=engine,
#         prompt=prompt,
#         max_tokens=512,
#         n=1,
#         stop=None,
#         temperature=0.7,
#         seed=123
#     )
#     message = completions.choices[0].text
#     return message


def generate_text2(openAI_key, prompt, engine="gpt-3.5-turbo"):

    client = OpenAI(api_key=openAI_key)

    messages = [
        {"role": "system", "content": "You are a helpful chatbot about sports"},
        {"role": "user", "content": prompt},
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        stream=True,
    )
    print(response.choices[0].message.content)
    # return message


def generate_answer(question, openAI_key):

    full_question = f"Please answer the questions which is related to sports. If the question is not related to sports, then answer I don't know"
    answer = generate_text2(openAI_key, full_question)
    return answer


@app.route("/api/users/query/", methods=["POST"])
def context():
    question = request.json["query"]
    result = generate_answer(question, openAI_key)
    return result


if __name__ == "__main__":

    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='127.0.0.1', port=port)