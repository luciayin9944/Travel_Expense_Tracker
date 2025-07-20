# server/app.py

from flask import Flask
from flask_restful import Api
from config import app, db, api, jwt
from models import User, Trip, Expense, UserSchema, TripSchema, ExpenseSchema
from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime


class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User(username=username)
        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=str(user.id))
            response = make_response(jsonify(token=access_token, user=UserSchema().dump(user)), 200)
            return response
        except IntegrityError:
            return {'errors': ['422 Unprocessable Entity']}, 422
        

class WhoAmI(Resource):
    @jwt_required() # Ensure the user is authenticated using JWT
    def get(self):
        user_id = get_jwt_identity() ## Get the user's ID from the JWT token
        user = User.query.filter(User.id==user_id).first()

        return UserSchema().dump(user), 200
    

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username==username).first()

        if user and user.authenticate(password):
            access_token = create_access_token(identity=str(user.id))
            response = make_response(jsonify(token=access_token, user=UserSchema().dump(user)), 200)
            return response
        
        return {'errors': ['401 Unauthorized']}, 401



class TripsIndex(Resource):
    @jwt_required()
    def get(self):
        curr_user_id = get_jwt_identity()
        trips = Trip.query.filter_by(user_id=curr_user_id).all()

        result = [
            {
                "id": t.id,
                "destination": t.destination,
                "budget": t.budget,
                "start_date": t.start_date,
                "end_date": t.end_date
            }
            for t in trips
        ]

        return jsonify({"trips": result})
    
    @jwt_required()
    def post(self):
        data = request.get_json()

        try:
            start_date = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
            end_date = datetime.strptime(data["end_date"], "%Y-%m-%d").date()
        except (KeyError, ValueError):
            return {"errors": ["Invalid or missing date format. Use YYYY-MM-DD."]}, 400

        new_trip = Trip(
            destination = data.get("destination"),
            budget = data.get("budget"),
            start_date = start_date,
            end_date = end_date,
            user_id = get_jwt_identity()
        )

        try:
            db.session.add(new_trip)
            db.session.commit()
            return TripSchema().dump(new_trip), 201
        except IntegrityError:

            return {'errors': ['Trip creation failed.']}, 422
        
        




# Register resources
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(WhoAmI, '/me', endpoint='me')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(TripsIndex, '/trips', endpoint='trips')


if __name__ == '__main__':
    app.run(port=5000, debug=True)