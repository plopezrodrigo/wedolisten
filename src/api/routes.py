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

# ----------------------------------------------------------------------------
# Lista de Locales
# ----------------------------------------------------------------------------
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

# ----------------------------------------------------------------------------
# Búsqueda de Locales
# ----------------------------------------------------------------------------
@api.route('/comercial-place-search/<buscar>', methods=['GET'])
@jwt_required(optional = True)
def list_Comercial_Places_search(buscar):
    favorits_id = []
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    #comercial_places = Comercial_Place.query.filter(name.ilike(f'%{buscar}%')).all()
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

# ----------------------------------------------------------------------------
# Locales de un Manager
# ----------------------------------------------------------------------------
@api.route('/comercial-place-user', methods=['GET'])
@jwt_required()
def Comercial_Places_user():
    userId = get_jwt_identity()
    comercial_places = Comercial_Place.query.filter_by(user_id = userId)

    if comercial_places:
        data = [comercial_place.serialize()
                for comercial_place in comercial_places]
        return jsonify(data), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

# ----------------------------------------------------------------------------
# Datos de un LOCAL con favoritos y mas datos
# ----------------------------------------------------------------------------
@api.route('/comercial-place/<comercial_place_id>', methods=['GET'])
@jwt_required(optional = True)
def Comercial_Places_Detail(comercial_place_id):
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.filter_by(id=comercial_place_id).first()

    data = comercial_places.serialize_location()

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id, comercial_place_id=comercial_places.id).first()
        data['favorite'] = True if favourits else False
    else:
        data['favorite'] = False

    if comercial_places:
        return jsonify(data), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

# ----------------------------------------------------------------------------
# Datos propios de un LOCAL
# ----------------------------------------------------------------------------
@api.route('/comercial-place-2/<comercial_place_id>', methods=['GET'])
def Comercial_Places_2(comercial_place_id):
    comercial_places = Comercial_Place.query.filter_by(id=comercial_place_id).first()

    data = comercial_places.serialize()
    if comercial_places:
        return jsonify(data), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

# ----------------------------------------------------------------------------
# Comentarios de customers
# ----------------------------------------------------------------------------
@api.route('/comment', methods=['GET'])
def list_Comments():
    datos = Comment.query.order_by(Comment.id.desc()).limit(4).all()
    data = [comentario.serialize() for comentario in datos]
    return jsonify(data), 200

# ----------------------------------------------------------------------------
# Un comentario
# ----------------------------------------------------------------------------
@api.route('/comment/<id>', methods=['GET'])
def get_comment(id):
    datos = Comment.query.get(id)
    return jsonify(datos.serialize()), 200

# ----------------------------------------------------------------------------
# Respuesta a Un comentario
# ----------------------------------------------------------------------------
@api.route('/respuesta/<id>', methods=['GET'])
def respuesta(id):
    datos = Comment.query.filter_by(comment_id=id).first()
    if datos:
        return jsonify(datos.serialize()), 200
    else:
        return jsonify("No existen respuestas a este comentario todavía"), 400

# ----------------------------------------------------------------------------
# Comentarios de un LOCAL
# ----------------------------------------------------------------------------
@api.route('/comment_local/<id_local>', methods=['GET'])
def get_comments_local(id_local):
    #datos = Comment.query.filter_by(comercial_place_id = id_local).filter_by(puntuacion != 0).all()
    datos = Comment.query.filter_by(comercial_place_id = id_local).all()
    data = [comentario.serialize() for comentario in datos]
    return jsonify(data), 200


@api.route('/favourit', methods=['GET'])
@jwt_required()
def list_Favourit():
    user_id=get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first()
    favourit = Favourit.query.filter_by(customer_id=customer.id, state=True )
    data = [element.serialize() for element in favourit]
    return jsonify(data), 200


# ----------------------------------------------------------------------------
# ----------------------------------------------------------------------------
# POST
# ----------------------------------------------------------------------------
# ----------------------------------------------------------------------------

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

# ----------------------------------------------------------------------------
# Alta de Customer y Manager
# ----------------------------------------------------------------------------
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    subs = False

    try:
        user = User.query.filter_by(email=data['user']).first()
        if user:
            return jsonify({"msg": "No se puede crear este usuario porque ya existe"}), 401
        else:
            user = User(email=data['user'], password=data['password'], is_active=False, type=data['tipo'])
            db.session.add(user)
            db.session.commit()

            if data['tipo'] == "customer": # Es un Customer
                if data.get('subscription', "off") == "on":
                    subs = True
                customer = Customer(user_id  = user.id
                            #,user     = user.id 
                            ,name     = data['name']
                            ,birthday = data.get('birthday')
                            ,gender   = data.get('gender')
                            ,subscription = subs
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

# ----------------------------------------------------------------------------
# LOCAL - Alta
# ----------------------------------------------------------------------------
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
            cambiador       = request.json.get('cambiador'),
            trona           = request.json.get('trona'),
            accessible_carrito = request.json.get('accessible_carrito'),
            espacio_carrito    = request.json.get('espacio_carrito'),
            ascensor           = request.json.get('ascensor'),
            productos_higiene  = request.json.get('productos_higiene')

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

# ----------------------------------------------------------------------------
# LOCAL - Modificacion
# ----------------------------------------------------------------------------
@api.route("/Comercial_Place/<idLocal>", methods=["POST"])
@jwt_required()
def Comercial_Place_update(idLocal):
    userId = get_jwt_identity()
    try:
        place = Comercial_Place.query.get(idLocal)
        if place:
            place.name                = request.json.get('name')
            place.address             = request.json.get('address')
            place.url                 = request.json.get('url')
            place.image_url           = request.json.get('image_url')
            place.telf                = request.json.get('telf')
            place.email               = request.json.get('email')
            place.location            = request.json.get('location')
            place.description         = request.json.get('description')
            place.cambiador           = request.json.get('cambiador')
            place.trona               = request.json.get('trona')
            place.accessible_carrito  = request.json.get('accessible_carrito')
            place.espacio_carrito     = request.json.get('espacio_carrito')
            place.ascensor            = request.json.get('ascensor')
            place.productos_higiene   = request.json.get('productos_higiene')

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


# ----------------------------------------------------------------------------
# Rate_Customer - Alta
# ----------------------------------------------------------------------------
@api.route("/Rate_Customer", methods=["POST"])
def Rate_add():
    rate = Rate_Customer(
        # comercial_place_id = request.json['comercial_place_id'],
        comercial_place=request.json['comercial_place'],
        rate=request.json['rate'],
    )
    db.session.add(rate)
    db.session.commit()

# ----------------------------------------------------------------------------
# Rate_Customer FOTO - Alta
# ----------------------------------------------------------------------------
@api.route("/Photo_Comercial_Place", methods=["POST"])
def Photo_add():
    photo = Photo_Comercial_Place(
        comercial_place=request.json['comercial_place'],
        location=request.json['location'],
    )
    db.session.add(photo)
    db.session.commit()

# ----------------------------------------------------------------------------
# Comentario - Alta
# ----------------------------------------------------------------------------
@api.route("/comment/<id_comment>", methods=["POST"])
@jwt_required()
def Comments_add(id_comment):
    data = request.json                                                                                                                                                                                                                                                                         
    data['user_id'] = get_jwt_identity()

    if (data.get('tipo') == "manager" and data.get('comment_id') == 0):
        return jsonify({"msg": "Un manager no puede generar una respuesta que no sea sobre un comentario de cliente"}), 403

    try:
        comments = Comment( user_id             = data['user_id'],
                            comercial_place_id  = data['comercial_place_id'],
                            comment             = data['comment'],
                            comment_id          = null if data.get('comment_id')==0 else data.get('comment_id'),
                            puntuacion          = data.get('puntuacion'),
                            price               = data.get('price'),
                            a_domicilio         = data.get('a_domicilio'),
                            mesa                = data.get('mesa'),
                            alcohol             = data.get('alcohol'),
                            visita              = data.get('visita'))
        if data.get('comment_id') != 0:
             comment_id = data.get('comment_id')

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

# ----------------------------------------------------------------------------
# Favoritos - Alta
# ----------------------------------------------------------------------------
@api.route("/Favourit", methods=["POST"])
def Favourit_add():
    favourite = Favourit(
        customer=request.json['customer'],
        comercial_place=request.json['comercial_place'],
        state=request.json['state'],
    )
    db.session.add(favourite)
    db.session.commit()

# ----------------------------------------------------------------------------
# Login de usuario
# ----------------------------------------------------------------------------
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401

    if user.type == "customer":
        usuario = Customer.query.filter_by(user_id=user.id).first()
    else:
        usuario = Manager.query.filter_by(user_id=user.id).first()

    #type = "customer" if customer else "manager"
    access_token = create_access_token(identity=user.id)

    return jsonify({ "token": access_token, "user_id": user.id, "usertype": user.type, "name": usuario.name })


# ----------------------------------------------------------------------------
# ----------------------------------------------------------------------------
# DELETE
# ----------------------------------------------------------------------------
# ----------------------------------------------------------------------------

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
