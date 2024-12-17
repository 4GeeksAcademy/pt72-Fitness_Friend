"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserMetrics, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import datetime, timedelta
import hashlib
import os
from flask import request
from werkzeug.utils import secure_filename

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


#Get User
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    print(f"JWT email: {email}")  # Log the email from the JWT token
    user = User.query.filter_by(email=email).first()

    if user:
        print(f"User found: {user}")  # Log the found user
        return jsonify(user.serialize()[0]), 200  # Ensure to return the user data (not a tuple)
    
    print("User not found")
    return jsonify({"error": "User not found"}), 404

#UserMetrics
@api.route('/userMetrics', methods=['GET'])
@jwt_required()
def get_user_metrics():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    user_metrics = UserMetrics.query.filter_by(user_id=user.id).order_by(UserMetrics.created_at.desc()).all()
    return jsonify([metric.serialize() for metric in user_metrics]), 200

#PostUserMetrics
@api.route('/userMetrics', methods=['POST'])
@jwt_required()
def add_user_metric():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()
    weight = body.get('weight')
    
    if not weight:
        return jsonify({"error": "Weight is required"}), 400

    user_metric = UserMetrics(user_id=user.id, weight=weight)
    db.session.add(user_metric)

    # Update user's weight
    user.weight = weight
    db.session.commit()

    return jsonify({"message": "Weight added successfully", "user_metric": user_metric.serialize()}), 201

#Sign Up User
@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user_name = body['name']
    user_last_name = body['last_name']
    user_height = float(body['height'])
    user_weight = float(body['weight'])
    user = User(
        email = user_email, 
        password = user_password,
        name=user_name,
        last_name=user_last_name,
        height=user_height,
        weight=user_weight
        )
    db.session.add(user)
    db.session.commit()
    
    return jsonify("User successfully created!")

#LogIn User
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User.query.filter_by(email = user_email, password = user_password).first()
    if user and user.password == user_password:
        expiration = timedelta(days=1)
        access_token = create_access_token(identity = user.email, expires_delta = expiration)
        return jsonify(access_token=access_token, user=user.serialize()[0])

    else:
        return jsonify("user does not exist")

#Update User
@api.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()

    user.email = body.get('email', user.email)
    user.height = body.get('height', user.height)
    user.last_name = body.get('last_name', user.last_name)
    user.name = body.get('name', user.name)
    user.weight = body.get('weight', user.weight)
    user.pic = body.get('pic', user.pic)

    db.session.commit()

    updated_user = User.query.filter_by(email=email).first()

    return jsonify({"message": "User updated successfully", "user" : updated_user.serialize()}), 200
    
#Post Update User
@api.route('/update', methods=['POST'])
@jwt_required()
def post_update_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()

    user.email = body.get('email', user.email)
    user.name = body.get('name', user.name)
    user.last_name = body.get('last_name', user.last_name)
    user.height = body.get('height', user.height)
    user.pic = body.get('pic', user.pic)


    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200

#UploadPicture
@api.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)  # Define a folder for uploads
        file.save(file_path)

        user.pic = file_path
        db.session.commit()
        return jsonify({"message": "Image uploaded successfully", "pic": user.pic}), 200

# Add Favorite
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify([fav.serialize() for fav in user.favorites]), 200
@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()
    favorite_name = body.get('name')
    favorite_type = body.get('type')

    if not favorite_name or not favorite_type:
        return jsonify({"error": "Name and type are required"}), 400

    favorite = Favorite(user_id=user.id, name=favorite_name, type=favorite_type)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({"message": "Favorite added successfully", "favorite": favorite.serialize()}), 201

# Delete Favorite
@api.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(favorite_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    favorite = Favorite.query.filter_by(id=favorite_id, user_id=user.id).first()

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"message": "Favorite deleted successfully"}), 200

















@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200