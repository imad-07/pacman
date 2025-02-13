from flask import Flask, render_template, request
import time
import os

# Initialize Flask app and set template_folder to current directory
app = Flask(__name__, template_folder=os.path.dirname(__file__))

@app.route("/", methods=["GET", "POST"])
def handler():
    # Simulate delay
    time.sleep(0.2)  # 200 milliseconds

    input_text = request.form.get("input", "")  # Get input from form
    print(input_text)  # Print input to console
    input_text = f"Hello: {input_text}"  # Modify input

    return render_template("tpl.html", input=input_text)  # Render template with modified input

if __name__ == "__main__":
    app.run(port=8080)
