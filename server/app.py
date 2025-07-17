# server/app.py

from flask import Flask
from flask_restful import Api
from config import app, db, api, jwt
from models import User, Trip, Expense, UserSchema, TripSchema, ExpenseSchema


# Register resources
# api.add_resource(Signup, '/signup')


if __name__ == '__main__':
    app.run(port=5555, debug=True)