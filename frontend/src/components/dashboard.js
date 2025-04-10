import React, { useState } from 'react';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong');
        return;
      }

      const data = await response.json();
      setPrediction(data.mood);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div>
      <h1>Text Mood Predictor</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text here"
      />
      <button onClick={handleSubmit}>Predict Mood</button>
      {prediction && <p>Predicted Mood: {prediction}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Dashboard;