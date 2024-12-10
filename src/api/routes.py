"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserMetrics
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

@api.route('/update_user', methods=['PUT'])
@jwt_required()
def update_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    body = request.get_json()

    user.email = body['email']
    user.name = body['name']
    user.last_name = body['last_name']
    user.height = body['height']
    user.weight = body['weight']
    user.pic = body['pic']

    db.session.commit()

    updated_user = User.query.filter_by(email=email).first()

    return jsonify({"message": "User updated successfully", "user" : updated_user.serialize()}), 200
    


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

    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    # user = User.query.filter_by(email=email).first()
    
    # if user is not None:
    #     return jsonify(user.serialize()), 200

    # return jsonify(email), 400
    print(f"JWT email: {email}")  # Log the email from the JWT token
    user = User.query.filter_by(email=email).first()

    if user:
        print(f"User found: {user}")  # Log the found user
        return jsonify(user.serialize()[0]), 200  # Ensure to return the user data (not a tuple)
    
    print("User not found")
    return jsonify({"error": "User not found"}), 404

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


@api.route('/userMetrics', methods=['GET'])
@jwt_required()
def get_user_metrics():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # body = request.get_json()
    # weight = body.get('weight')
    
    # if not weight:
    #     return jsonify({"error": "Weight is required"}), 400

    # user_metric = UserMetrics(user_id=user.id, weight=weight)
    # db.session.add(user_metric)

    # # Update user's weight
    # user.weight = weight
    # db.session.commit()

    user_metrics = UserMetrics.query.filter_by(user_id=user.id).order_by(UserMetrics.created_at.desc()).all()
    return jsonify([metric.serialize() for metric in user_metrics]), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200