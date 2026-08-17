import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  // Fetch goals from Flask
  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  // Load goals when the app starts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Submit a new goal
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/api/goals', {
        name: name,
        target_amount: target
      });
      setName('');
      setTarget('');
      fetchGoals(); // Refresh the list
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Simple Savings Tracker</h2>
      
      {/* Form to add a goal */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Goal Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ flex: 1, padding: '8px' }}
        />
        <input 
          type="number" 
          placeholder="Target" 
          value={target} 
          onChange={(e) => setTarget(e.target.value)} 
          required 
          style={{ width: '100px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add Goal</button>
      </form>

      {/* List of active goals */}
      <div>
        {goals.length === 0 ? (
          <p>No goals yet.</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{goal.name}</h3>
              <p style={{ margin: 0 }}>
                Saved: <strong>KES {goal.current_amount}</strong> / KES {goal.target_amount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}