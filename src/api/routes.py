"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Manager, Comment, Comercial_Place, Photos_Comments, Favourit, Rate_Customer, Photo_Comercial_Place
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from sqlalchemy.sql import func

api = Blueprint('api', __name__)


# ----------------------------------------------------------------------------
# Listasdo de Customers
# ----------------------------------------------------------------------------
@api.route('/Customer', methods=['GET'])
def list_customers():
    customers = Customer.query.all()
    data = [customer.serialize() for customer in customers]
    return jsonify(data), 200

# ----------------------------------------------------------------------------
# Un Customer
# ----------------------------------------------------------------------------
@api.route('/GetCustomer/<id>', methods=['GET'])
def get_customer(id):
    datos = Customer.query.filter_by(user_id=id).first()
    return jsonify(datos.serialize()), 200

# ----------------------------------------------------------------------------
# Lsitado de Managers
# ----------------------------------------------------------------------------
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

    comercials = []
    for comercial in comercial_places:
        q = db.session.query(
            Rate_Customer.comercial_place_id, 
            Rate_Customer.rate, 
            func.count(
                '*').label(
                'total_count')).filter_by(
                comercial_place_id=comercial.id).group_by(
                    Rate_Customer.comercial_place_id,  
                    Rate_Customer.rate).subquery()
        result = db.session.query(
            Comercial_Place, q.c.total_count, q.c.rate).filter_by(
                id=comercial.id).outerjoin(
                    q, 
                    Comercial_Place.id==q.c.comercial_place_id).all()
        total = 0
        count = 0
        for data in result:
            total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
            count += data[1] if data[1] else 0
        
        info = data[0].serialize()
        count = count if count > 0 else 1
        info['raking'] = int(total * 100 / count)
        comercials.append(info)
    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id)
        favorits_id = [favorit.comercial_place_id for favorit in favourits]
        
    for element in comercials:
        if element['id'] in favorits_id:
            element['favorite'] = True 
        else:
            element['favorite'] = False 

    return jsonify(comercials), 200

@api.route('/comercial-place-home', methods=['GET'])
@jwt_required(optional = True)
def list_Comercial_Places_home():
    favorits_id = []
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.limit(4).all()
    comercials = []
    for comercial in comercial_places:
        q = db.session.query(Rate_Customer.comercial_place_id, Rate_Customer.rate, func.count('*').label('total_count')).filter_by(comercial_place_id=comercial.id).group_by(Rate_Customer.comercial_place_id,  Rate_Customer.rate).subquery()
        result = db.session.query(Comercial_Place, q.c.total_count, q.c.rate).filter_by(id=comercial.id).outerjoin(q, Comercial_Place.id==q.c.comercial_place_id).all()
        total = 0
        count = 0

        for data in result:
            total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
            count += data[1] if data[1] else 0
        
        info = data[0].serialize()
        count = count if count > 0 else 1
        info['raking'] = int(total * 100 / count)
        comercials.append(info)

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id)
        favorits_id = [favorit.comercial_place_id for favorit in favourits]

    result = []
    for element in comercials:
        print(element['id'] in favorits_id)
        if element['id'] in favorits_id:
            element['favorite'] = True 
        else:
            element['favorite'] = False 
        result.append(element)
    return jsonify(result), 200

# ----------------------------------------------------------------------------
# Búsqueda de Locales
# ----------------------------------------------------------------------------
@api.route('/comercial-place-search/<buscar>/', methods=['GET'])
@jwt_required(optional = True)
def list_Comercial_Places_search(buscar):
    favorits_id = []
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.filter(func.lower(Comercial_Place.name) == func.lower(buscar)).all()
    
    comercials = []
    for comercial in comercial_places:
        q = db.session.query(Rate_Customer.comercial_place_id, Rate_Customer.rate, func.count('*').label('total_count')).filter_by(comercial_place_id=comercial.id).group_by(Rate_Customer.comercial_place_id,  Rate_Customer.rate).subquery()
        result = db.session.query(Comercial_Place, q.c.total_count, q.c.rate).filter_by(id=comercial.id).outerjoin(q, Comercial_Place.id==q.c.comercial_place_id).all()
        total = 0
        count = 0

        for data in result:
            total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
        count += data[1] if data[1] else 0
        
        info = data[0].serialize()
        count = count if count > 0 else 1
        info['raking'] = int(total * 100 / count)
        comercials.append(info)
        
    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id)
        favorits_id = [favorit.comercial_place_id for favorit in favourits]

    result = []
    for element in comercials:
        print(element['id'] in favorits_id)
        if element['id'] in favorits_id:
            element['favorite'] = True 
        else:
            element['favorite'] = False 
        result.append(element)

    return jsonify(result), 200

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


    comercial = None
    q = db.session.query(Rate_Customer.comercial_place_id, Rate_Customer.rate, func.count('*').label('total_count')).filter_by(comercial_place_id=comercial_places.id).group_by(Rate_Customer.comercial_place_id,  Rate_Customer.rate).subquery()
    result = db.session.query(Comercial_Place, q.c.total_count, q.c.rate).filter_by(id=comercial_places.id).outerjoin(q, Comercial_Place.id==q.c.comercial_place_id).all()
    total = 0
    count = 0

    for data in result:
        total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
        count += data[1] if data[1] else 0
    
    comercial = data[0].serialize_location()
    count = count if count > 0 else 1
    comercial['raking'] = int(total * 100 / count)

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id, comercial_place_id=comercial_places.id).first()
        comercial['favorite'] = True if favourits else False
    else:
        comercial['favorite'] = False

    if comercial_places:
        return jsonify(comercial), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

# ----------------------------------------------------------------------------
# Datos propios de un LOCAL
# ----------------------------------------------------------------------------
@api.route('/comercial-place-2/<comercial_place_id>', methods=['GET'])
def Comercial_Places_2(comercial_place_id):
    comercial_places = Comercial_Place.query.filter_by(id=comercial_place_id).first()


    comercial = None
    q = db.session.query(Rate_Customer.comercial_place_id, Rate_Customer.rate, func.count('*').label('total_count')).filter_by(comercial_place_id=comercial_places.id).group_by(Rate_Customer.comercial_place_id,  Rate_Customer.rate).subquery()
    
    result = db.session.query(Comercial_Place, q.c.total_count, q.c.rate).filter_by(id=comercial_places.id).outerjoin(q, Comercial_Place.id==q.c.comercial_place_id).all()
    total = 0
    count = 0
    for data in result:
        total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
        count += data[1] if data[1] else 0
    
    comercial = data[0].serialize()
    count = count if count > 0 else 1
    comercial['raking'] = int(total * 100 / count) 

    if comercial_places:
        return jsonify(comercial), 200
    else:
        return jsonify({"msg": "No existen datos"}), 402

# ----------------------------------------------------------------------------
# Fotos de Un Local
# ----------------------------------------------------------------------------
@api.route('/Photo_Comercial_Place/<id>', methods=['GET'])
def get_photos_comercial_place(id):
    fotos = Photo_Comercial_Place.query.filter_by(comercial_place_id = id).all()
    datos = [una.serialize() for una in fotos]
    return jsonify(datos), 200

# ----------------------------------------------------------------------------
# Comentarios de customers
# ----------------------------------------------------------------------------
@api.route('/comment', methods=['GET'])
def list_Comments():
    datos = Comment.query.order_by(Comment.id.desc()).limit(3).all()
    data = [comentario.serialize() for comentario in datos]
    return jsonify(data), 200

# ----------------------------------------------------------------------------
# Búsqueda de comentarios
# ----------------------------------------------------------------------------
@api.route('/search/<search>', methods=['GET'])
def list_search(search):
    datos = Comment.query.filter_by(Comment.id.desc()).limit(4).all()
    data = [comentario.serialize() for comentario in datos]
    return jsonify(data), 200

# ----------------------------------------------------------------------------
# Un comentario
# ----------------------------------------------------------------------------
@api.route('/comment/<int:id>', methods=['GET'])
def get_comment(id):
    datos = Comment.query.get(id)
    return jsonify(datos.serialize()), 200

# ----------------------------------------------------------------------------
# Fotos de Un comentario
# ----------------------------------------------------------------------------
@api.route('/photos_comment/<id>', methods=['GET'])
def get_photos_comment(id):
    fotos = Photos_Comments.query.filter_by(comment_id = id).all()
    datos = [una.serialize() for una in fotos]
    return jsonify(datos), 200

# ----------------------------------------------------------------------------
# Respuesta a Un comentario
# ----------------------------------------------------------------------------
@api.route('/respuesta/<id>', methods=['GET'])
def respuesta(id):
    datos = Comment.query.filter_by(comment_id=id).first()
    if datos:
        return jsonify(datos.serialize()), 200
    else:
        return jsonify("No existen respuestas a este comentario todavía"), 201

# ----------------------------------------------------------------------------
# Comentarios de un LOCAL
# ----------------------------------------------------------------------------
@api.route('/comment_local/<id_local>', methods=['GET'])
def get_comments_local(id_local):
    #datos = Comment.query.filter_by(comercial_place_id = id_local).filter_by(puntuacion is null).all()
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
    try:
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
    except Exception as e :
        return jsonify({"error": str(e)}), 400
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

        print("-----------------------------------------------");
        print(request.json.get('image_url1'));
        print(request.json.get('image_url2'));
        print("-----------------------------------------------");

        if request.json.get('image_url1'):
            photos = Photo_Comercial_Place(comercial_place_id = Place.id,
                                           location   = request.json.get('image_url1'))
            db.session.add(photos)

        if request.json.get('image_url2'):
            photos = Photo_Comercial_Place(comercial_place_id = Place.id,
                                           location   = request.json.get('image_url2'))
            db.session.add(photos)

        db.session.commit();

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

            db.session.commit();

            if request.json.get('image_url1'):
                place = Photo_Comercial_Place.query.get(idLocal)
                photos = Photo_Comercial_Place(comercial_place_id = place.id,
                                               location   = request.json['image_url1'])
                db.session.add(photos)

            if request.json.get('image_url2'):
                photos = Photo_Comercial_Place(comercial_place_id = place.id,
                                               location   = request.json['image_url2'])
                db.session.add(photos)

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
# Comentario Usuario- Alta
# ----------------------------------------------------------------------------
@api.route("/comment/<id_comment>", methods=["POST"])
@jwt_required()
def Comments_user_add(id_comment):
    data = request.json                                                                                                                                                                                                                                                                         
    data['user_id'] = get_jwt_identity()

    if (data.get('tipo') == "manager" and id_comment == "0"):
        return jsonify({"msg": "Un manager no puede generar una respuesta que no sea sobre un comentario de cliente"}), 403

    try:
        comments = Comment( user_id             = data['user_id'],
                            comercial_place_id  = data['comercial_place_id'],
                            comment             = data['comment'],
                            comment_id          = None if id_comment == "0" else id_comment,
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
# Favoritos 
# ----------------------------------------------------------------------------

@api.route('/deletefavourit/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_Favourit(id):
    try:
        favourit = Favourit.query.filter_by(id=id).first()
        db.session.delete(favourit)
        db.session.commit()
    except Exception as e:
        return jsonify({"mensaje": str(e)}), 400
    return jsonify({"mensaje":"ok"}), 200

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

    print('--------------------------------------')
    print('--------------------------------------')
    print(usuario.name)
    print('--------------------------------------')
    print('--------------------------------------')

    return jsonify({    "token": access_token, 
                        "user_id": user.id, 
                        "usertype": user.type, 
                        #"name": usuario.name,
                        #"email": user.email,
                        "user": user.serialize(),
                        "usuario": usuario.serialize()
                    })


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
'''
# ----------------------------------------------------------------------------
# Lista de Locales ultimos añadidos
# ----------------------------------------------------------------------------
@api.route('/last-comercial-place', methods=['GET'])
@jwt_required(optional = True)
def list_Last_Comercial_Places():
    favorits_id = []
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.order_by(Comercial_Place.id.desc()).limit(4).all()

    comercials = []
    for comercial in comercial_places:
        q = db.session.query(
            Rate_Customer.comercial_place_id, 
            Rate_Customer.rate, 
            func.count(
                '*').label(
                'total_count')).filter_by(
                comercial_place_id=comercial.id).group_by(
                    Rate_Customer.comercial_place_id,  
                    Rate_Customer.rate).subquery()
        result = db.session.query(
            Comercial_Place, q.c.total_count, q.c.rate).filter_by(
                id=comercial.id).outerjoin(
                    q, 
                    Comercial_Place.id==q.c.comercial_place_id).all()
        total = 0
        count = 0

        for data in result:
            total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
            count += data[1] if data[1] else 0
        
        info = data[0].serialize()
        count = count if count > 0 else 1
        info['raking'] = int(total * 100 / count)
        comercials.append(info)

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id)
        favorits_id = [favorit.comercial_place_id for favorit in favourits]

    result = []
    for element in comercials:
        print(element['id'] in favorits_id)
        if element['id'] in favorits_id:
            element['favorite'] = True 
        else:
            element['favorite'] = False 
        result.append(element)

    return jsonify(result), 200

# ----------------------------------------------------------------------------
# Lista de Locales Random
# ----------------------------------------------------------------------------
@api.route('/random-comercial-place', methods=['GET'])
@jwt_required(optional = True)
def list_Random_Comercial_Places():
    favorits_id = []
    user_id = get_jwt_identity()
    customer = Customer.query.filter_by(user_id=user_id).first() if user_id else None

    comercial_places = Comercial_Place.query.order_by(func.random()).limit(4).all()

    comercials = []
    for comercial in comercial_places:
        q = db.session.query(
            Rate_Customer.comercial_place_id, 
            Rate_Customer.rate, 
            func.count(
                '*').label(
                'total_count')).filter_by(
                comercial_place_id=comercial.id).group_by(
                    Rate_Customer.comercial_place_id,  
                    Rate_Customer.rate).subquery()
        result = db.session.query(
            Comercial_Place, q.c.total_count, q.c.rate).filter_by(
                id=comercial.id).outerjoin(
                    q, 
                    Comercial_Place.id==q.c.comercial_place_id).all()
        total = 0
        count = 0

        for data in result:
            total += data[1] * (int(data[2]) / 100) if data[2] and data[1] else 0
            count += data[1] if data[1] else 0
        
        info = data[0].serialize()
        count = count if count > 0 else 1
        info['raking'] = int(total * 100 / count)
        comercials.append(info)

    if customer:
        favourits = Favourit.query.filter_by(customer_id=customer.id)
        favorits_id = [favorit.comercial_place_id for favorit in favourits]

    
    result = []
    for element in comercials:
        print(element['id'] in favorits_id)
        if element['id'] in favorits_id:
            element['favorite'] = True 
        else:
            element['favorite'] = False 
        result.append(element) 

    return jsonify(result), 200