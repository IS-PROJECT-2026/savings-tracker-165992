from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///savings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Goal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0.0)

with app.app_context():
    db.create_all()

@app.route('/api/goals', methods=['GET'])
def get_goals():
    goals = Goal.query.all()
    return jsonify([{
        'id': g.id, 
        'name': g.name, 
        'target_amount': g.target_amount, 
        'current_amount': g.current_amount
    } for g in goals])

@app.route('/api/goals', methods=['POST'])
def add_goal():
    data = request.json
    new_goal = Goal(
        name=data['name'], 
        target_amount=float(data['target_amount'])
    )
    db.session.add(new_goal)
    db.session.commit()
    return jsonify({'message': 'Goal created!'}), 201

# --- NEW: Edit and Delete Route ---
@app.route('/api/goals/<int:goal_id>', methods=['PUT', 'DELETE'])
def manage_goal(goal_id):
    goal = Goal.query.get_or_404(goal_id)

    # Handle Delete
    if request.method == 'DELETE':
        db.session.delete(goal)
        db.session.commit()
        return jsonify({'message': 'Goal deleted!'}), 200

    # Handle Edit/Update
    if request.method == 'PUT':
        data = request.json
        goal.name = data.get('name', goal.name)
        goal.target_amount = float(data.get('target_amount', goal.target_amount))
        db.session.commit()
        return jsonify({'message': 'Goal updated!'}), 200

if __name__ == '__main__':
    # Using 0.0.0.0 to prevent WSL network issues
    app.run(debug=True, host='0.0.0.0', port=5000)