from joblib import load

model = load("model/mood_pipeline.joblib")

def predict_mood(text):
    print(f"Input received: {text}")
    prediction = model.predict([text])
    return prediction[0]
