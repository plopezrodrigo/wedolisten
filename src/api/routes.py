"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


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
    data = [Comercial_Place.serialize()
            for Comercial_Places in Comercial_Place]
    return jsonify(data), 200


@api.route('/Comment', methods=['GET'])
def list_Comments():
    Comments = Comment.query.all()
    data = [Comment.serialize() for Comments in Comment]
    return jsonify(data), 200


@api.route('/Favourit/<customer>', methods=['GET'])
def list_Favourit():
    Favourits = Favourit.query.get(customer)
    data = [Favourit.serialize() for Favourits in Favourit]
    return jsonify(data), 200


''' 
@api.route("/User/<id>", methods=["DELETE"])
def Users_delete(id):
    User = User.query.get(id)
    db.session.delete(User)
    db.session.commit()

@api.route("/Comercial_Place/<id>", methods=["DELETE"])
def Places_delete(id):
    Place = Comercial_Place.query.get(id)
    db.session.delete(Place)
    db.session.commit()

@api.route("/Comment/<id>", methods=["DELETE"])
def Comments_delete(id):
    Comment = Comment.query.get(id)
    db.session.delete(Comment)
    db.session.commit()

@api.route("/Favourit/<id>", methods=["DELETE"])
def Favourits_delete(id):
    Favourit = Favourit.query.get(id)
    db.session.delete(Favourit)
    db.session.commit()
'''


@api.route("/User", methods=["POST"])
def Users_add():
    user = User(
        email=request.json['email'],
        password=request.json['password'],
        type=request.json['type'],
    )
    db.session.add(user)
    db.session.commit()
    if request.json['type'] == 'customer':
        customer = Customer(
            name=request.json['name'],
            birthday=request.json['birthday'],
            gender=request.json['gender'],
            subscription=request.json['subscription'],
            address=request.json['address']
        )
        db.session.add(customer)
        db.session.commit()
    else:
        manager = Manager(
            user_id=user.id,
            name=request.json['name'],
        )
        db.session.add(manager)
        db.session.commit()


@api.route("/Comercial_Place", methods=["POST"])
def Comercial_Place_add():
    Place = Comercial_Place(
        user_id=request.json['user_id'],
        user=request.json['user'],
        name=request.json['name'],
        address=request.json['address'],
        url=request.json['url'],
        telf=request.json['telf'],
        email=request.json['email'],
        location=request.json['location'],
        description=request.json['description'],
        cambiador=request.json['cambiador'],
        trono=request.json['trono'],
        childs=request.json['childs'],
    )
    db.session.add(Place)
    db.session.commit()


@api.route("/Rate_Customer", methods=["POST"])
def Rate_add():
    rate = Rate_Customer(
        # comercial_place_id = request.json['comercial_place_id'],
        comercial_place=request.json['comercial_place'],
        rate=request.json['rate'],
    )
    db.session.add(rate)
    db.session.commit()


@api.route("/Photo_Comercial_Place", methods=["POST"])
def Photo_add():
    photo = Photo_Comercial_Place(
        comercial_place=request.json['comercial_place'],
        location=request.json['location'],
    )
    db.session.add(photo)
    db.session.commit()


@api.route("/Comment", methods=["POST"])
def Comments_add():
    comments = Comment(
        user=request.json['user'],
        comercial_place=request.json['comercial_place'],
        comment=request.json['comment']
    )
    db.session.add(comments)
    db.session.commit()
    photo = Photos_Comments(
        comment_id=comments.id,
        location=request.json['location'],
    )
    db.session.add(photo)
    db.session.commit()


@api.route("/Favourit", methods=["POST"])
def Favourit_add():
    favourite = Favourit(
        customer=request.json['customer'],
        comercial_place=request.json['comercial_place'],
        state=request.json['state'],
    )
    db.session.add(favourite)
    db.session.commit()


''' @app.route("/Customer/<id>", methods=["PUT"])
def Customer_update(id):
    customer = Customer.query.get(id)
    name = request.json['name']
    birthday = request.json['birthday']
    gender = request.json['gender']
    subscription = request.json['subscription']
    address = request.json['address']

    customer.name = name
    customer.birthday = birthday
    customer.gender = gender
    customer.subscription = subscription
    customer.address = address

    db.session.commit() '''
