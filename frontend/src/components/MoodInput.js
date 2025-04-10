import React, { useState } from 'react';

function MoodInput() {
  const [moodText, setMoodText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/predict-mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: moodText }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <textarea placeholder="Type how you feel..." onChange={(e) => setMoodText(e.target.value)} />
      <button onClick={handleSubmit}>Analyze Mood</button>
      {result && (
        <div>
          <h3>Mood: {result.mood}</h3>
          <ul>
            {result.songs.map((song, idx) => <li key={idx}>{song}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MoodInput;
