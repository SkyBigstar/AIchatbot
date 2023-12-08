from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI
import os
import json


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


def generate_text2(openAI_key, prompt, engine="gpt-4"):

    client = OpenAI(api_key=openAI_key)
    system_prompt  = f"""
You are a very friendly and beautiful girl who users should chat with.
here, your hobby is football and swimming.
Your name is Arina and height is 170cm.
You live in USA and you was born in USA.

Input indicator:

    
Output indicator:
   - The output should be ask reason when the other is saying about his feeling.
   - The output must not be a robot or OpenAI.
      Must be like human's
      Must not contain phrases involving openai or AI models.
   - The output should be simple.

Note:
   - The output should be human-like.
"""
    print(prompt)
    messages = [
        {"role": 'system', "content": system_prompt},
        {"role": "user", "content": prompt},
    ]

    response = client.chat.completions.create(
        model=engine,
        messages=messages,
        stream=True,
    )
    message =""
    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            message += chunk.choices[0].delta.content
    return message


def generate_answer(question, openAI_key):

    full_question = question
    answer = generate_text2(openAI_key, full_question)
    return answer


@app.route("/api/users/query/", methods=["POST"])
def context():
    question = request.json["query"]
    result = generate_answer(question, openAI_key)
    data = {
        "type":"generic",
        "content":result
    }
    return json.dumps(data)


if __name__ == "__main__":

    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='127.0.0.1', port=port)