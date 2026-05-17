from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import uuid
import os
import sys

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['POST'])
def run_code():

    code = request.json['code']

    filename = f"{uuid.uuid4()}.py"

    with open(filename, "w") as file:
        file.write(code)

    try:

        result = subprocess.run(
            [sys.executable, filename],
            capture_output=True,
            text=True,
            timeout=5
        )

        output = result.stdout + result.stderr

    except Exception as e:

        output = str(e)

    os.remove(filename)

    return jsonify({
        "output": output
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=False)