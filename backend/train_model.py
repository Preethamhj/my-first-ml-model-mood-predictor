# training_script.py

from datasets import load_dataset
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from joblib import dump
import os

# Load the GoEmotions dataset
dataset = load_dataset("go_emotions", split="train")

# Prepare data (only single-label entries)
label_names = dataset.features['labels'].feature.names
texts = []
labels = []

for item in dataset:
    if len(item['labels']) == 1:
        texts.append(item['text'])
        labels.append(label_names[item['labels'][0]])

# Train the model using pipeline
model = make_pipeline(
    TfidfVectorizer(stop_words="english", lowercase=True),
    LogisticRegression(max_iter=1000)
)

model.fit(texts, labels)

# Save model pipeline
os.makedirs("model", exist_ok=True)
dump(model, "model/mood_pipeline.joblib")

print("✅ Model trained with GoEmotions and saved!")
