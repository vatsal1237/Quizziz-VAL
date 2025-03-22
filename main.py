'''
from google import genai

client = genai.Client(api_key="AIzaSyBvuucFZYGrCMN4a0SDHnHcXcl_aIc4Y-c")

response = client.models.generate_content_stream(
    model="gemini-2.0-flash",
    contents=["Explain how AI works"]
)
for chunk in response:
    print(chunk.text, end="")
'''
import os
from google import genai
from google.genai import types
import pathlib
import requests

import pathlib
import httpx
from google import genai
from google.genai import types
from IPython.display import Markdown
MODEL_ID = "gemini-2.0-flash"
GOOGLE_API_KEY = "AIzaSyBvuucFZYGrCMN4a0SDHnHcXcl_aIc4Y-c"

client = genai.Client(api_key=GOOGLE_API_KEY)

text_path = pathlib.Path('a11.txt')

file_upload = client.files.upload(file=text_path)

response = client.models.generate_content(
    model=MODEL_ID,
    contents=[
        file_upload,
        "Give me a point wise analysis of the below questions asked:For student 1 what is the relation between higher attendace and marks, For watching more lectures time how does it impact quiz scores?, did student 1 who attempted practice questions perform better in exams?, Display averages and predicted grades based on relative grading at an average give C(D,C-,C,B-,B,A-,A),Should  student1  focus more on quizzes, lectures, or practice questions to improve?",
        
    ]
)

a=response.text

from http.server import SimpleHTTPRequestHandler, HTTPServer
import json

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            response = {"message": a}  
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode("utf-8"))
        else:
            super().do_GET()

PORT = 5000
server = HTTPServer(("localhost", PORT), MyHandler)
print(f"Server running on http://localhost:{PORT}")
server.serve_forever()


