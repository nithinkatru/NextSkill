import React, { useState, useEffect } from 'react';

function GamificationComponent({ userId }) {
  const [data, setData] = useState({ points: 0, badges: [] });

  useEffect(() => {
    fetch(`/api/gamification/${userId}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching gamification data:', error));
  }, [userId]);

  return (
    <div>
      <h1>Gamification Stats</h1>
      <p>Points: {data.points}</p>
      <h3>Badges:</h3>
      <ul>
        {data.badges.map((badge, index) => (
          <li key={index}>{badge.title} - Awarded on: {new Date(badge.awardedDate).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default GamificationComponent;
