from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    height = db.Column(db.Float, nullable=True)
    weight = db.Column(db.Float, nullable=True)
    
    favorites = db.relationship('Favorite', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'
                
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "height": self.height,
            "weight": self.weight,
            "favorites": [fav.serialize() for fav in self.favorites]
        },
        
class UserMetrics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    weight = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

    def __repr__(self):
        return f'<UserMetrics user_id={self.user_id}, weight={self.weight}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "weight": self.weight,
            "created_at": self.created_at,
        }
        
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # E.g., 'meal', 'exercise'
    name = db.Column(db.String(120), nullable=False)  # Name or description of favorite
    created_at = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

    def __repr__(self):
        return f'<Favorite {self.name} (type={self.type})>'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "created_at": self.created_at,
        }