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
  const totalGoals = goals.length;
  const activeGoals = goals.filter(g => g.current_amount < g.target_amount).length;
  const completedGoals = totalGoals - activeGoals;

  // --- Formatter for Currency ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE').format(amount);
  };

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

  const handleUpdate = async () => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/goals/${editingId}`, {
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
        <h1>Savings Portfolio</h1>
        <br></br>
        <p>Financial Target Tracking</p>
      </header>

      {/* --- DASHBOARD WIDGETS --- */}
      <div className="dashboard-grid">
        <div className="stat-card card">
          <div className="stat-info">
            <h3>Total Capital</h3>
            <p>
              {/* This span keeps the symbol small, inline, and prevents line breaks */}
              <span className="currency-symbol">KES</span> 
              {formatCurrency(totalSaved)}
            </p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-info">
            <h3>Active Targets</h3>
            <p>{activeGoals}</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-info">
            <h3>Completed</h3>
            <p>{completedGoals}</p>
          </div>
        </div>
      </div>

      {/* --- ADD NEW GOAL FORM --- */}
      <div className="card">
        <form onSubmit={handleSubmit} className="form-row">
          <div className="form-group">
            <label>Portfolio Goal</label>
            <input 
              type="text" 
              placeholder="e.g., Master's Fund" 
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
          <button type="submit" className="btn-primary">Initialize Goal</button>
        </form>
      </div>

      {/* --- GOALS LIST --- */}
      <div className="card">
        {goals.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', margin: 0, textAlign: 'center', padding: '2rem 0' }}>
            No financial targets established.
          </p>
        ) : (
          goals.map(goal => {
            const isCompleted = goal.current_amount >= goal.target_amount;
            const percentage = goal.target_amount > 0 
              ? Math.min((goal.current_amount / goal.target_amount) * 100, 100).toFixed(1) 
              : 0;

            return (
              <div key={goal.id} className="goal-item">
                <div className="goal-header">
                  <div className="goal-title-area">
                    <h3>{goal.name}</h3>
                    <span className={`badge ${isCompleted ? 'badge-done' : 'badge-active'}`}>
                      {isCompleted ? 'Done' : 'Active'}
                    </span>
                  </div>
                  <div className="goal-actions">
                    <button onClick={() => startEditing(goal)} className="btn-outline">Edit</button>
                    <button onClick={() => handleDelete(goal.id)} className="btn-danger">Remove</button>
                  </div>
                </div>
                
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  Secured <strong>KES {formatCurrency(goal.current_amount)}</strong> of KES {formatCurrency(goal.target_amount)}
                </p>

                {/* Progress Bar */}
                <div className="progress-container">
                  <div className="progress-bar-bg">
                    <div 
                      className={`progress-bar-fill ${isCompleted ? 'completed' : ''}`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span><strong>{percentage}%</strong> complete</span>
                    <span>
                      {isCompleted 
                        ? <strong style={{ color: 'var(--success)' }}>Target Achieved</strong> 
                        : `${formatCurrency(goal.target_amount - goal.current_amount)} KES remaining`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* --- BLURRED MODAL POPUP --- */}
      {editingId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Modify Target</h2>
            </div>
            
            <div className="modal-form-group">
              <label>Goal Designation</label>
              <input 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
              />
            </div>
            
            <div className="modal-form-group">
              <label>Secured Capital (KES)</label>
              <input 
                type="number" 
                value={editCurrent} 
                onChange={(e) => setEditCurrent(e.target.value)} 
              />
            </div>
            
            <div className="modal-form-group">
              <label>Target Valuation (KES)</label>
              <input 
                type="number" 
                value={editTarget} 
                onChange={(e) => setEditTarget(e.target.value)} 
              />
            </div>

            <div className="modal-actions">
              <button onClick={() => setEditingId(null)} className="btn-outline">Discard</button>
              <button onClick={handleUpdate} className="btn-primary">Confirm Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}