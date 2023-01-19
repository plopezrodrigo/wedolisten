  
import os
from flask_admin import Admin
from .models import db, User, Customer, Manager, Comercial_Place, Rate_Customer, Photo_Comercial_Place, Comment, Photos_Comments,Favourit
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Customer, db.session))
    admin.add_view(ModelView(Manager, db.session))
    admin.add_view(ModelView(Comercial_Place, db.session))
    admin.add_view(ModelView(Rate_Customer, db.session))
    admin.add_view(ModelView(Photo_Comercial_Place, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Photos_Comments, db.session))
    admin.add_view(ModelView(Favourit, db.session))
    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))