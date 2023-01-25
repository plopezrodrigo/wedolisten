"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Manager
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/Comment', methods=['GET'])
def list_Comments():
    Comments = Comment.query.all()
    data = [Comment.serialize() for Comments in Comment]
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


@api.route('/comercial-place', methods=['GET'])
def list_Comercial_Places():
    comercial_places = Comercial_Place.query.all()
    data = [comercial_place.serialize()
            for comercial_place in comercial_places]
    return jsonify(data), 200

@api.route('/comercial-place/<id>', methods=['GET'])
def Comercial_Places_Detail(id):
    comercial_place = Comercial_Place.query.filter_by(id=id).first()
    return jsonify(comercial_place.serialize()), 200


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

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json

    try:
        user = User.query.filter_by(email=data['user']).first()

        if user:
            return jsonify({"msg": "No se puede crear este usuario porque ya existe"}), 401
        else:
            user = User(email=data['user'], password=data['password'], is_active=False, type=data['tipo'])
            db.session.add(user)
            db.session.commit()

            if data['tipo'] == "customer": # Es un Customer
                customer = Customer(user_id  = user.id
                                #,user     = user.id 
                                ,name     = data['name']
                                ,birthday = data.get('birthday')
                                ,gender   = data.get('gender')
                                ,subscription = data.get('subscription', False)
                                ,address  = data.get('address'))
                db.session.add(customer)
            else:  # es un manager
                manager = Manager(user_id = user.id
                                ,name    = data['name']
                                )
                db.session.add(manager)
        db.session.commit()

    except Exception:
        db.session.rollback()
        return jsonify({"msg": "No se puede crear este usuario"}), 402

    return jsonify({"msg": "Usuario creado correctamente"}), 200


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
    data = request.json

    try:
        comments = Comment( user            = data['user'],
                            comercial_place = data['comercial_place'],
                            comment         = data['comment'],
                            user_id         = data['user_id'],
                            # user          = data['user'], relationship
                            comercial_place_id = data['comercial_place_id'],
                            #comercial_place = data['comercial_place'], relationship
                            comment_id      = data['comment_id'],
                            comment         = data['comment'],
                            price           = data['price'],
                            a_domicilio     = data['a_domicilio'],
                            mesa            = data['mesa'],
                            alcohol         = data['alcohol'])

        db.session.add(comments)
        db.session.commit()

        if data['Photos_Comments']:
            photos = Photos_Comments(comment_id = coments.id,
                                     location   = data['location'])
            db.session.add(photos)
            db.session.commit()
    
    except Exception:
        db.session.rollback()
        return jsonify({"msg": "No se puede crear este comentario"}), 402

    return jsonify({"msg": "Comentario creado correctamente"}), 200



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


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.filter.query(email=email, password=password).first()
    if user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })