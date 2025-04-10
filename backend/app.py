from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load full ML pipeline
model = load("model/mood_pipeline.joblib")

@app.route('/')
def home():
    return '✅ Flask ML server is running!'

# GET (optional)
@app.route('/predict_get')
def predict_get():
    text = request.args.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    prediction = model.predict([text])
    return jsonify({'text': text, 'mood': prediction[0]})

# POST (React will use this)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    prediction = model.predict([text])
    return jsonify({'text': text, 'mood': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
