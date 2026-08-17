from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
# Allow React to talk to Flask
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///savings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Single table for Savings Goals
class Goal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, default=0.0)

# Create the database
with app.app_context():
    db.create_all()

# Get all goals
@app.route('/api/goals', methods=['GET'])
def get_goals():
    goals = Goal.query.all()
    return jsonify([{
        'id': g.id, 
        'name': g.name, 
        'target_amount': g.target_amount, 
        'current_amount': g.current_amount
    } for g in goals])

# Add a new goal
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
