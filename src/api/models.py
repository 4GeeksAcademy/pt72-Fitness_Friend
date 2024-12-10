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
    pic = db.Column(db.String(750), nullable=True)
    
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
            # do not serialize the password, its a security breach
        },
        
class UserMetrics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
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