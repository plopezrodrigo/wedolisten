from flask_sqlalchemy import SQLAlchemy
import datetime
import enum, datetime
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="my-app")

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    type = db.Column(db.Enum("customer","manager", name='type_types'), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Customer(db.Model):
    __tablename__ = "customers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False)
    user = db.relationship(User, backref="customer")
    # user = db.Column(db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    telefono = db.Column(db.String(9), unique=False, nullable=True)
    birthday = db.Column(db.Date(), unique=False, nullable=True)
    gender = db.Column(db.Enum("female","male", name='gender_types'), unique=False, nullable=True)
    subscription = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
    address = db.Column(db.String(150), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "user_email": self.user.email,
                    "name": self.name,
                    "telefono": self.telefono,
                    "birthday": self.birthday,
                    "gender": self.gender,
                    "subscription": self.subscription,
                    "address": self.address
               }

class Manager(db.Model):
    __tablename__ = "managers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False)
    user = db.relationship(User, backref="manager")
    #user = db.Column(db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "user_email": self.user.email,
                    "name": self.name
               }

class Comercial_Place(db.Model):
    __tablename__ = "comercial_places"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False)
    user = db.relationship(User, backref="comercial_place")
    name = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(150), unique=False, nullable=False)
    url = db.Column(db.String(150), unique=False, nullable=True)
    image_url = db.Column(db.String(250), unique=False, nullable=True)
    telf = db.Column(db.String(15), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    location = db.Column(db.String(120), unique=False, nullable=True)
    description = db.Column(db.String(700), unique=False, nullable=False)
    cambiador = db.Column(db.Boolean(), unique=False, default=False)
    trona = db.Column(db.Boolean(), unique=False, default=False)
    accessible_carrito = db.Column(db.Boolean(), unique=False, default=False)
    espacio_carrito = db.Column(db.Boolean(), unique=False, default=False)
    ascensor = db.Column(db.Boolean(), unique=False, default=False)
    productos_higiene = db.Column(db.Boolean(), unique=False, default=False)

    def __repr__(self):
        return f'<Comercial_Place {self.name}>'

    def serialize(self):
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "name": self.name,
                    "address": self.address,
                    "url": self.url,
                    "image_url": self.image_url,
                    "telf": self.telf,
                    "email": self.email,
                    "location": self.location,
                    "description": self.description,
                    "cambiador": self.cambiador,
                    "trona": self.trona,
                    "accessible": self.accessible_carrito,
                    "espacio_carrito": self.espacio_carrito,
                    "ascensor": self.ascensor,
                    "productos_higiene": self.productos_higiene,
               }
    def serialize_location(self):
        print(self.address)
        location = geolocator.geocode(self.address)
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "name": self.name,
                    "address": self.address,
                    "google_address": self.address.replace(" ", "+"),
                    # "latitude": location.latitude,
                    # "longitude": location.longitude,
                    "url": self.url,
                    "image_url": self.image_url,
                    "telf": self.telf,
                    "email": self.email,
                    "location": self.location,
                    "description": self.description,
                    "cambiador": self.cambiador,
                    "trona": self.trona,
                    "accessible_carrito": self.accessible_carrito,
                    "espacio_carrito": self.espacio_carrito,
                    "ascensor": self.ascensor,
                    "productos_higiene": self.productos_higiene,
               }

class Rate_Customer(db.Model):
    __tablename__ = "rates_customers"
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.ForeignKey("customers.id"), nullable=False)
    customer = db.relationship('Customer', backref='rates_customers', lazy=True)
    comercial_place_id = db.Column(db.ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('Comercial_Place', backref='rates_customers', lazy=True)
    rate = db.Column(db.Enum("1","2","3","4","5", name='rate_types'), unique=False, nullable=False)

    def __repr__(self):
        return f'<Rate_Customer {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "customer_id": self.customer_id,
                    "customer_name": self.customer.name,
                    "comercial_Place_id": self.comercial_Place_id,
                    "comercial_place_name": self.comercial_place.name,
                    "rate": self.rate
               }

class Photo_Comercial_Place(db.Model):
    __tablename__ = "photos_comercial_place"
    id = db.Column(db.Integer, primary_key=True)
    comercial_place_id = db.Column(db.ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('Comercial_Place', backref='photos_comercial_place', lazy=True)
    location = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<User {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "comercial_Place_id": self.comercial_place_id,
                    "comercial_Place_name": self.comercial_place.name,
                    "location": self.location
               }

class Puntuaciones(enum.Enum):
    cero="0"
    uno="1"
    dos="2"
    tres="3"
    cuatro="4"
    cinco="5"

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), nullable=False)
    user = db.relationship('User', backref='comments', lazy=True)
    comercial_place_id = db.Column(db.ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('Comercial_Place', backref='comments', lazy=True)
    comment_id = db.Column(db.ForeignKey("comments.id"), nullable=True)
    date = db.Column(db.DateTime(), unique=False, nullable=False,default=datetime.datetime.now())
    comment = db.Column(db.String(1000), unique=False, nullable=False)
    puntuacion = db.Column(db.Enum(Puntuaciones), unique=False, nullable=True)
    price = db.Column(db.Enum("Barato","Normal", "Caro", name='price_types'), unique=False, nullable=True)
    a_domicilio = db.Column(db.Enum("Si","No", name='a_domicilio_types'), unique=False, nullable=True) 
    mesa = db.Column(db.Enum("Si","No", name='mesa_types'), unique=False, nullable=True)
    alcohol = db.Column(db.Enum("Si","No", name='alcohol_types'), unique=False, nullable=True)
    visita = db.Column(db.Enum("Pareja","Familia","Solo","Amigos","Negocios", name='visita_types'), unique=False, nullable=True)
    
    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        if self.user.type == "customer":
            nombre = self.user.customer[0].name
        else:
            nombre = self.user.manager[0].name
        
        if self.puntuacion is not None:
            puntos = int(self.puntuacion.value)
        else:
            puntos = 0

        return {    "id": self.id,
                    "user_id": self.user_id,
                    "user_name": nombre,
                    "user_type": self.user.type,
                    "comercial_place_id": self.comercial_place_id,
                    "comercial_place_name": self.comercial_place.name,
                    "comment_id": self.comment_id,
                    "comment" : self.comment,
                    "datetime": self.date,
                    "date": self.date.date().strftime("%d/%m/%Y"),
                    "puntuacion": puntos,
                    "price": self.price,
                    "a_domicilio": self.a_domicilio,
                    "mesa": self.mesa,
                    "alcohol": self.alcohol,
                    "visita": self.visita
               }

class Photos_Comments(db.Model):
    __tablename__ = "photos_comments"
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.ForeignKey("comments.id"), nullable=False)
    location = db.Column(db.String(1000), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<User {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "comment_id": self.comment_id,
                    "location": self.location
               }

class Favourit(db.Model):
    __tablename__ = "favorits"
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.ForeignKey("customers.id"), nullable=False)
    customer = db.relationship('Customer', backref='favorits', lazy=True)
    comercial_place_id = db.Column(db.ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('Comercial_Place', backref='favorits', lazy=True)
    state = db.Column(db.Boolean(), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(), unique=False, nullable=False,default=datetime.datetime.now())
    
    def __repr__(self):
        return f'<User {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "customer_id": self.customer_id,
                    "comercial" : self.comercial_place.serialize(),
                    "customer_name": self.customer.name,
                    "comercial_place_id": self.comercial_place_id,
                    "comercial_place_name": self.comercial_place.name,
                    "state": self.state,
                    "created_at": self.created_at
               }