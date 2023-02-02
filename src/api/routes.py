"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Manager, Comment, Comercial_Place, Photos_Comments, Favourit
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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


@api.route('/comercial-place', methods=['GET'])
@jwt_required(optional = True)
def list_Comercial_Places():
    favorits_id = []
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.all()
    data = [comercial_place.serialize()
            for comercial_place in comercial_places]

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id)
        favorits_id = [favorit.comercial_place_id for favorit in favourits]

    for element in data:
        if element['id'] in favorits_id:
            element['favorite'] = True 
        else:
            element['favorite'] = False 

    return jsonify(data), 200

@api.route('/comercial-place-user', methods=['GET'])
@jwt_required()
def Comercial_Places_user():
    userId = get_jwt_identity()

    #comercial_places = Comercial_Place.query.all()
    comercial_places = Comercial_Place.query.filter_by(user_id = userId)

    if comercial_places:
        data = [comercial_place.serialize()
                for comercial_place in comercial_places]
        return jsonify(data), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

@api.route('/comercial-place/<comercial_place_id>', methods=['GET'])
@jwt_required(optional = True)
def Comercial_Places_Detail(comercial_place_id):
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.filter_by(id=comercial_place_id).first()

    data = comercial_places.serialize()

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id, comercial_place_id=comercial_places.id).first()
        data['favorite'] = True if favourits else False
    else:
        data['favorite'] = False

    if comercial_places:
        return jsonify(data), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

@api.route('/Comment', methods=['GET'])
def list_Comments():
    datos = Comment.query.order_by(Comment.id.desc()).all()
    data = [comentario.serialize() for comentario in datos]
    return jsonify(data), 200


@api.route('/favourit', methods=['GET'])
@jwt_required()
def list_Favourit():
    user_id=get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id)
    favourit = Favourit.query.filter_by(customer_id=customer.id)
    return jsonify(favourit), 200

@api.route('/favourit/<id>', methods=['POST'])
@jwt_required()
def add_Favourit(id):
    user_id=get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first()
    favourit = Favourit.query.filter_by(customer_id=customer.id, comercial_place_id=id).first()
    if not favourit :
        favourit = Favourit(customer_id=customer.id, comercial_place_id=id, state=True)
        db.session.add(favourit)
        db.session.commit()
    else :
        favourit.state = not favourit.state
        db.session.commit()
    return jsonify(favourit.serialize()), 200

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

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "No se puede crear este usuario"}), 402

    return jsonify({"msg": "Usuario creado correctamente"}), 200


@api.route("/Comercial_Place", methods=["POST"])
@jwt_required()
def Comercial_Place_add():
    try:
        userId = get_jwt_identity()
        Place = Comercial_Place(
            user_id         = userId,
            name            = request.json.get('name'),
            address         = request.json.get('address'),
            url             = request.json.get('url'),
            image_url       = request.json.get('image_url'),
            telf            = request.json.get('telf'),
            email           = request.json.get('email'),
            location        = request.json.get('location'),
            description     = request.json.get('description'),
            cambiador       = True, # request.json.get('cambiador'),
            trona           = True, # request.json.get('trona'),
            accessible_carrito = True, # request.json.get('accessible_carrito'),
            espacio_carrito    = True, # request.json.get('espacio_carrito'),
            ascensor           = True, # request.json.get('ascensor'),
            productos_higiene  = True, # request.json.get('productos_higiene')

        )
        db.session.add(Place)
        db.session.commit()

        return jsonify({"msg": "Usuario creado correctamente"}), 200

    except Exception as e:
        print('--------------------------------------')
        print('--------------------------------------')
        print(e)
        print('--------------------------------------')
        print('--------------------------------------')
        db.session.rollback()
        return jsonify({"msg": "No se puede crear este Local"}), 402

    return jsonify({"msg": "Comentario creado correctamente"}), 200





@api.route("/Comercial_Place/<comercial_place_id>", methods=["POST"])
@jwt_required()
def Comercial_Place_update(idLocal):
    userId = get_jwt_identity()
    try:
        place = Comercial_Place.query.filter_by(id=idLocal)

        if place:
            place.name                = request.json.get('name'),
            place.address             = request.json.get('address'),
            place.url                 = request.json.get('url'),
            place.image_url           = request.json.get('image_url'),
            place.telf                = request.json.get('telf'),
            place.email               = request.json.get('email'),
            place.location            = request.json.get('location'),
            place.description         = request.json.get('description'),
            place.cambiador           = True, # request.json.get('cambiador'),
            place.trona               = True, # request.json.get('trona'),
            place.accessible_carrito  = True, # request.json.get('accessible_carrito'),
            place.espacio_carrito     = True, # request.json.get('espacio_carrito'),
            place.ascensor            = True, # request.json.get('ascensor'),
            place.productos_higiene   = True, # request.json.get('productos_higiene')

            db.session.commit()
        
            return jsonify({"msg": "Local modificado correctamente"}), 200
        else:
            return jsonify({"msg": "No existen datos"}), 402

    except Exception as e:
        print('--------------------------------------')
        print('--------------------------------------')
        print(e)
        print('--------------------------------------')
        print('--------------------------------------')
        db.session.rollback()
        return jsonify({"msg": "No se puede crear este Local"}), 402



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

    #if (data.get('tipo') == "manager" and data.get('comment_id') == null):
    #    return jsonify({"msg": "Un manager no puede generar una respuesta que no sea sobre un comentario de cliente"}), 403

    print('----------------------------------------------')
    print('----------------------------------------------')
    print('----------------------------------------------') 
    # PDTE:
    #   coger el usuario por token
    #   validar que es un comentario de user y es un usuario o que es un comentario de gestor y es un gestor
    #   validar el comment_id

    user = User.query.filter_by(email='p@p.es').first()
    data['user_id'] = user.id
    comercial = Comercial_Place.query.filter_by(name='Nombre Comercial_Place').first()
    data['comercial_place_id'] = comercial.id

    if (data.get('tipo') == "manager"):
        comment = Comment.query.filter_by(comercial_place_id=comercial.id).first()
        data['comment_id'] = comment.id

    print(data)

    print('----------------------------------------------')
    print('----------------------------------------------')
    print('----------------------------------------------')

    try:
        comments = Comment( user_id             = data['user_id'],
                            comercial_place_id  = data['comercial_place_id'],
                            comment             = data['comment'],
                            comment_id          = data.get('comment_id'),
                            puntuacion          = data.get('puntuacion'),
                            price               = data.get('price'),
                            a_domicilio         = data.get('a_domicilio'),
                            mesa                = data.get('mesa'),
                            alcohol             = data.get('alcohol'),
                            visita              = data.get('visita'))

        db.session.add(comments)
        db.session.commit()

        if data.get('photo_location1'):
            photos = Photos_Comments(comment_id = comments.id,
                                     location   = data['photo_location1'])
            db.session.add(photos)

        if data.get('photo_location2'):
            photos = Photos_Comments(comment_id = comments.id,
                                     location   = data['photo_location2'])
            db.session.add(photos)

        if data.get('photo_location3'):
            photos = Photos_Comments(comment_id = comments.id,
                                     location   = data['photo_location3'])
            db.session.add(photos)

        db.session.commit()
        return jsonify({"msg": "Comentario creado correctamente"}), 200
    
    except Exception as e:
        print('--------------------------------------')
        print('--------------------------------------')
        print(e)
        print('--------------------------------------')
        print('--------------------------------------')
        db.session.rollback()
        return jsonify({"msg": "No se puede crear este comentario"}), 402


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
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    customer = Customer.query.filter_by(user_id=user.id).first()
    type = "customer" if customer else "manager"
    return jsonify({ "token": access_token, "user_id": user.id, "usertype": type })