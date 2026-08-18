import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [goals, setGoals] = useState([]);
  
  // New Goal State
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTarget, setEditTarget] = useState('');
  const [editCurrent, setEditCurrent] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // --- Dashboard Calculations ---
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current_amount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const totalGoals = goals.length;
  const activeGoals = goals.filter(g => g.current_amount < g.target_amount).length;
  
  // Calculate percentage for the progress wheel
  const percentageSaved = totalTarget > 0 ? ((totalSaved / totalTarget) * 100) : 0;
  const percentageRemaining = totalTarget > 0 ? (100 - percentageSaved).toFixed(1) : 0;
  
  // SVG Math for the wheel
  const wheelRadius = 26;
  const wheelCircumference = 2 * Math.PI * wheelRadius;
  const wheelOffset = wheelCircumference - (percentageSaved / 100) * wheelCircumference;

  // --- API Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/api/goals', {
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
      await axios.delete(`http://127.0.0.1:5000/api/goals/${id}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const startEditing = (goal) => {
    setEditingId(goal.id);
    setEditName(goal.name);
    setEditTarget(goal.target_amount);
    setEditCurrent(goal.current_amount);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/goals/${id}`, {
        name: editName,
        target_amount: editTarget,
        current_amount: editCurrent 
      });
      setEditingId(null); 
      fetchGoals(); 
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Savings Overview</h1>
        <p>Manage and track your financial targets</p>
      </header>

      {/* --- DASHBOARD WIDGETS --- */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Saved</h3>
            <p>KES {totalSaved.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Active / Total Goals</h3>
            <p>{activeGoals} / {totalGoals}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Remaining</h3>
            <p>{percentageRemaining}%</p>
          </div>
          <div className="progress-wheel">
            <svg width="60" height="60">
              <circle className="bg" cx="30" cy="30" r={wheelRadius} />
              <circle 
                className="fill" 
                cx="30" cy="30" r={wheelRadius} 
                strokeDasharray={wheelCircumference}
                strokeDashoffset={wheelOffset}
              />
            </svg>
            <div className="progress-text">
              {Math.round(percentageSaved)}%
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD NEW GOAL FORM --- */}
      <div className="card">
        <form onSubmit={handleSubmit} className="form-row">
          <div className="form-group">
            <label>Goal Name</label>
            <input 
              type="text" 
              placeholder="e.g., New Laptop" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Target Amount (KES)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={target} 
              onChange={(e) => setTarget(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Create Goal</button>
        </form>
      </div>

      {/* --- GOALS LIST --- */}
      <div className="card">
        {goals.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>No active savings goals found.</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="goal-item">
              
              {editingId === goal.id ? (
                // Edit Mode
                <div className="form-row">
                  <div className="form-group">
                    <label>Goal Name</label>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Amount Saved</label>
                    <input type="number" value={editCurrent} onChange={(e) => setEditCurrent(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Target</label>
                    <input type="number" value={editTarget} onChange={(e) => setEditTarget(e.target.value)} />
                  </div>
                  <div className="goal-actions" style={{ marginBottom: '4px' }}>
                    <button onClick={() => handleUpdate(goal.id)} className="btn-primary">Save</button>
                    <button onClick={() => setEditingId(null)} className="btn-outline">Cancel</button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="goal-header">
                    <h3>{goal.name}</h3>
                    <div className="goal-actions">
                      <button onClick={() => startEditing(goal)} className="btn-outline">Edit</button>
                      <button onClick={() => handleDelete(goal.id)} className="btn-danger">Delete</button>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                    Saved <strong>KES {goal.current_amount.toLocaleString()}</strong> of KES {goal.target_amount.toLocaleString()}
                  </p>
                </div>
              )}
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}