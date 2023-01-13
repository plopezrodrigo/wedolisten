from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    type = db.Column(db.Enum("customer","manager"), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

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
    user_id = db.Column(ForeignKey("users.id"), nullable=False)
    user = db.Column(ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    birthday = db.Column(db.date(), unique=False, nullable=True)
    gender = db.Column(db.Enum("female","male"), unique=False, nullable=True)
    subscription = db.Column(db.Boolean(), unique=False, nullable=True)
    address = db.Column(db.String(150), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "user_email": self.user.email,
                    "name": self.name,
                    "birthday": self.birthday,
                    "gender": self.gender,
                    "subscription": self.subscription,
                    "address": self.address
               }

class Manager(db.Model):
    __tablename__ = "managers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(ForeignKey("users.id"), nullable=False)
    user = db.Column(ForeignKey("users.id"), nullable=False)
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
    user_id = db.Column(ForeignKey("users.id"), nullable=False)
    user = db.Column(ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(150), unique=False, nullable=False)
    url = db.Column(db.String(150), unique=False, nullable=True)
    telf = db.Column(db.String(15), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    location = db.Column(db.String(120), unique=True, nullable=True)
    description = db.Column(db.description(120), unique=True, nullable=False)
    cambiador = db.Column(db.Boolean(), unique=False, nullable=False)
    trono = db.Column(db.Boolean(), unique=False, nullable=False)
    childs = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "user_name": self.user.name,
                    "name": self.name,
                    "address": self.address,
                    "url": self.url,
                    "telf": self.telf,
                    "email": self.email,
                    "location": self.location,
                    "description": self.description,
                    "cambiador": self.cambiador,
                    "trono": self.trono,
                    "childs": self.childs
               }

class Rate_Customer(db.Model):
    __tablename__ = "rates_customers"
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(ForeignKey("customers.id"), nullable=False)
    customer = db.Column(ForeignKey("customers.id"), nullable=False)
    comercial_place_id = db.Column(ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('comercial_places', backref='id', lazy=true)
    rate = db.Column(db.Enum("1","2","3","4","5"), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.customer_id}>'

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
    comercial_place_id = db.Column(ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('comercial_places', backref='id', lazy=true)
    location = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<User {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "comercial_Place_id": self.comercial_Place_id,
                    "comercial_Place_name": self.comercial_Place.name,
                    "location": self.location
               }

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(ForeignKey("users.id"), nullable=False)
    user = db.relationship('users', backref='id', lazy=true)
    comercial_place_id = db.Column(ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('comercial_places', backref='id', lazy=true)
    comment_id = db.Column(ForeignKey("comments.id"), nullable=False)
    date = db.Column(db.DateTime(), unique=false, nullable=False)
    comment = db.Column(db.String(1000), unique=false, nullable=False)
    
    def __repr__(self):
        return f'<User {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "user_id": self.user_id,
                    "user_name": self.user.name,
                    "comercial_Place_id": self.comercial_Place_id,
                    "comercial_Place_name": self.comercial_Place.name,
                    "comment_id": self.comment_id,
                    "date": self.date,
                    "comment": self.comment
               }

class Photos_Comments(db.Model):
    __tablename__ = "photos_comments"
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(ForeignKey("comments.id"), nullable=False)
    location = db.Column(db.String(1000), unique=false, nullable=False)
    
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
    customer_id = db.Column(ForeignKey("customers.id"), nullable=False)
    customer = db.relationship('customers', backref='id', lazy=true)
    comercial_place_id = db.Column(ForeignKey("comercial_places.id"), nullable=False)
    comercial_place = db.relationship('comercial_places', backref='id', lazy=true)
    state = db.Column(db.Boolean(), unique=false, nullable=False)
    created_at = db.Column(db.DateTime(), unique=false, nullable=False,default=datetime.datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.customer_id}>'

    def serialize(self):
        return {    "id": self.id,
                    "customer_id": self.customer_id,
                    "customer_name": self.customer.name,
                    "comercial_place_id": self.comercial_place_id,
                    "comercial_place_name": self.comercial_place.name,
                    "state": self.state,
                    "created_at": self.created_at
               }