  
import os
from flask_admin import Admin
from .models import db, User, Customer, Manager, Comercial_Place, Rate_Customer, Photo_Comercial_Place, Comment, Photos_Comments,Favourit
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class CustomerAdmin(ModelView):
        column_list = ("id", "user_id", "user", "name", "telefono", "birthday", "gender", "subscription", "address")
    
    class UserAdmin(ModelView):
        column_list = ("id", "email", "password", "type", "is_active")
    
    class ManagerAdmin(ModelView):
        column_list = ("id", "user_id", "user", "name")

    class ComercialPlaceAdmin(ModelView):
        column_list = ("id", "user_id", "user", "name", "address", "url", "image_url", "telf", "email", "location", "description", "cambiador", "trona", "accessible_carrito", "espacio_carrito", "ascensor", "productos_higiene")

    class RateCustomerAdmin(ModelView):
        column_list = ("id", "customer_id", "customer", "comercial_place_id", "comercial_place", "rate")

    class PhotoComercialPlaceAdmin(ModelView):
        column_list = ("id", "comercial_place_id", "comercial_place", "location")

    class CommentAdmin(ModelView):
        column_list = ("id", "user_id", "user", "comercial_place_id", "comercial_place", "comment_id", "date", "comment", "puntuacion", "price", "a_domicilio", "mesa", "alcohol", "visita")

    class PhotosCommentsAdmin(ModelView):
        column_list = ("id", "comment_id", "location")

    class FavouritAdmin(ModelView):
        column_list = ("id", "customer_id", "customer", "comercial_place_id", "comercial_place", "state", "created_at")

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ComercialPlaceAdmin(Comercial_Place, db.session))
    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(CustomerAdmin(Customer, db.session))
    admin.add_view(ManagerAdmin(Manager, db.session))
    admin.add_view(RateCustomerAdmin(Rate_Customer, db.session))
    admin.add_view(PhotoComercialPlaceAdmin(Photo_Comercial_Place, db.session))
    admin.add_view(CommentAdmin(Comment, db.session))
    admin.add_view(PhotosCommentsAdmin(Photos_Comments, db.session))
    admin.add_view(FavouritAdmin(Favourit, db.session))