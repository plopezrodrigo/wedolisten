"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/User', methods=['GET'])
def list_users():
    Users = User.query.all()
    data = [User.serialize() for Users in User]
    return jsonify(data), 200

@api.route('/Customer', methods=['GET'])
def list_customers():
    Customers = Customer.query.all()
    data = [Customer.serialize() for Customers in Customer]
    return jsonify(data), 200

@api.route('/Manager', methods=['GET'])
def list_Managers():
    Managers = Manager.query.all()
    data = [Manager.serialize() for Managers in Manager]
    return jsonify(data), 200

@api.route('/Comercial_Place', methods=['GET'])
def list_Comercial_Places():
    Comercial_Places = Comercial_Place.query.all()
    data = [Comercial_Place.serialize() for Comercial_Places in Comercial_Place]
    return jsonify(data), 200

@api.route('/Rate_Customer', methods=['GET'])
def list_Rate_Customers():
    Rate_Customers = Rate_Customer.query.all()
    data = [Rate_Customer.serialize() for Rate_Customers in Rate_Customer]
    return jsonify(data), 200