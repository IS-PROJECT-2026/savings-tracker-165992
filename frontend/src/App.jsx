import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  // Editing state variables
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTarget, setEditTarget] = useState('');
  // NEW: State to track the current saved amount during edits
  const [editCurrent, setEditCurrent] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await axios.get('https://savings-tracker-backend-s8gw.onrender.com/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://savings-tracker-backend-s8gw.onrender.com/api/goals', {
        name: name,
        target_amount: target
      });
      setName('');
      setTarget('');
      fetchGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://savings-tracker-backend-s8gw.onrender.com/api/goals/${id}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const startEditing = (goal) => {
    setEditingId(goal.id);
    setEditName(goal.name);
    setEditTarget(goal.target_amount);
    // NEW: Load the current saved amount into the form
    setEditCurrent(goal.current_amount);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://savings-tracker-backend-s8gw.onrender.com/api/goals/${id}`, {
        name: editName,
        target_amount: editTarget,
        // NEW: Send the updated saved amount to the backend
        current_amount: editCurrent 
      });
      setEditingId(null); 
      fetchGoals(); 
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Simple Savings Tracker</h2>
      
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

      <div>
        {goals.length === 0 ? (
          <p>No goals yet.</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
              
              {editingId === goal.id ? (
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '12px', color: '#666' }}>Goal Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    style={{ padding: '8px', marginTop: '-5px' }}
                  />
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', color: '#666' }}>Amount Saved</label>
                      <input 
                        type="number" 
                        value={editCurrent} 
                        onChange={(e) => setEditCurrent(e.target.value)} 
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', color: '#666' }}>Target Amount</label>
                      <input 
                        type="number" 
                        value={editTarget} 
                        onChange={(e) => setEditTarget(e.target.value)} 
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <button onClick={() => handleUpdate(goal.id)} style={{ padding: '6px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>

              ) : (
                
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>{goal.name}</h3>
                  <p style={{ margin: '0 0 15px 0' }}>
                    Saved: <strong>KES {goal.current_amount}</strong> / KES {goal.target_amount}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => startEditing(goal)} style={{ padding: '6px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(goal.id)} style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>

              )}
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}