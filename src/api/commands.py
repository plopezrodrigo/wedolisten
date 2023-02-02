
import click
from api.models import db, User, Customer, Manager, Comercial_Place, Comment

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "1111"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

        ### Insert the code to populate others tables if needed

    @app.cli.command("insert-test-inicial")
    def insert_test_data():
        print("Borrando datos")
        Comment.query.all()
        c = Comment.query.all()
        for x in c:
            db.session.delete(x)
        db.session.commit()

        Comercial_Place.query.all()
        cp = Comercial_Place.query.all()
        for x in cp:
            db.session.delete(x)
        db.session.commit()

        Customer.query.all()
        customer = Customer.query.all()
        for x in customer:
            db.session.delete(x)
        db.session.commit()

        Manager.query.all()
        manager = Manager.query.all()
        for x in manager:
            db.session.delete(x)
        db.session.commit()

        User.query.all()
        user = User.query.all()
        for x in user:
            db.session.delete(x)
        db.session.commit()
        print("--------------------------------------------------------")
        print("")

        print("Creating test users customer")
        user = User()
        user.email = "p@p.es"
        user.type = "customer"
        user.password = "1111"
        user.is_active = True
        db.session.add(user)
        db.session.commit()
        print("User: ", user.email, " created.")
        print("--------------------------------------------------------")
        print("")
        print("Creating test customer")
        customer = Customer()
        customer.user_id = user.id
        customer.name = 'Nombre cliente'
        db.session.add(customer)
        db.session.commit()
        print("customer: ", customer.name, " created.")
        cliente = customer.user_id

        print("")
        print("--------------------------------------------------------")
        print("--------------------------------------------------------")
        print("")

        print("Creating test users Manager")
        user = User()
        user.email = "manager@manager.com"
        user.type = "manager"
        user.password = "1111"
        user.is_active = True
        db.session.add(user)
        db.session.commit()
        print("User: ", user.email, " created.")
        print("--------------------------------------------------------")
        print("")
        print("Creating test Manager")
        manager = Manager()
        manager.user_id = user.id
        manager.name = 'Nombre Manager'
        db.session.add(manager)
        db.session.commit()
        print("manager: ", manager.name, " manager.")

        print("--------------------------------------------------------")
        print("")
        print("Creating test Local")
        
        cp = Comercial_Place()
        cp.user_id = user.id
        cp.name = 'Nombre Comercial_Place'
        cp.description = 'Descripción Comercial_Place'
        cp.address = 'address'
        cp.image_url = "https://previews.123rf.com/images/kovalnadiya/kovalnadiya2203/kovalnadiya220300248/192887626-patatas-fritas-calientes-frescas-con-sal-y-especias-en-la-tabla-de-cortar-sobre-fondo-de-mesa-de-mad.jpg"
        cp.cambiador = True
        cp.trona = False
        cp.accessible_carrito = False
        cp.espacio_carrito = False
        cp.ascensor = False
        cp.productos_higiene = True
        db.session.add(cp)
        print("manager: ", cp.name, " Comercial_Place.")        
        
        cp = Comercial_Place()
        cp.user_id = user.id
        cp.name = 'Nombre Comercial_Place 2'
        cp.description = 'Descripción Comercial_Place 2'
        cp.address = 'address 2'
        cp.image_url = "https://previews.123rf.com/images/pilat666/pilat6661808/pilat666180800178/106988422-vista-panor%C3%A1mica-del-famoso-lago-hallstatter-amanecer-de-oto%C3%B1o-brumoso-en-el-peque%C3%B1o-restaurante-chi.jpg"
        cp.cambiador = False
        cp.trona = False
        cp.accessible_carrito = False
        cp.espacio_carrito = True
        cp.ascensor = False
        cp.productos_higiene = False
        db.session.add(cp)
        print("manager: ", cp.name, " Comercial_Place.")

        cp = Comercial_Place()
        cp.user_id = cliente
        cp.name = 'Prueba a no visualizar'
        cp.description = 'Prueba a no visualizar como local del manager 2'
        cp.address = 'address 3'
        cp.image_url = "https://previews.123rf.com/images/cc0collection/cc0collection2205/cc0collection220548639/186125686-tienda-carne-tienda-restaurante-personas-hombres-chef-noche-abierto-se%C3%B1alizaci%C3%B3n.jpg"
        cp.cambiador = True
        cp.trona = False
        cp.accessible_carrito = False
        cp.espacio_carrito = True
        cp.ascensor = False
        cp.productos_higiene = True
        db.session.add(cp)
        db.session.commit()
        print("Comercial_Place: ", cp.name, " Comercial_Place.")
        local = cp.id
        print("--------------------------------------------------------")
        print("")
        print("Creating test Comentarios")
 
        print("--------------------------------------------------------")
        print(local)
        print("--------------------------------------------------------")
        comment = Comment()
        comment.user_id = cliente
        comment.comercial_place_id = local
        comment.comment = "1. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        comment.puntuacion = "uno"
        comment.price = "Caro"
        comment.a_domicilio = "Si"
        comment.mesa = "Si"
        comment.alcohol = "No"
        comment.visita = "Amigos"
        db.session.add(comment)
        db.session.commit()

        comment = Comment()
        comment.user_id = cliente
        comment.comercial_place_id = local
        comment.comment = "2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        comment.puntuacion = "cuatro"
        comment.price = "Barato"
        comment.a_domicilio = "Si"
        comment.mesa = "Si"
        comment.alcohol = "No"
        comment.visita = "Familia"
        db.session.add(comment)
        db.session.commit()

        comment = Comment()
        comment.user_id = cliente
        comment.comercial_place_id = local
        comment.comment = "3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        comment.puntuacion = "dos"
        comment.price = "Barato"
        comment.a_domicilio = "Si"
        comment.mesa = "Si"
        comment.alcohol = "No"
        comment.visita = "Solo"
        db.session.add(comment)
        db.session.commit()

        comment = Comment()
        comment.user_id = cliente
        comment.comercial_place_id = local
        comment.comment = "Comentario que estoy metiendo por inicializar 4"
        comment.puntuacion = "tres"
        comment.price = "Normal"
        comment.a_domicilio = "Si"
        comment.mesa = "Si"
        comment.alcohol = "No"
        comment.visita = "Amigos"
        db.session.add(comment)
        db.session.commit()

        comment = Comment()
        comment.user_id = cliente
        comment.comercial_place_id = local
        comment.comment = "Comentario que estoy metiendo por inicializar 5"
        comment.puntuacion = "cinco"
        comment.price = "Normal"
        comment.a_domicilio = "Si"
        comment.mesa = "Si"
        comment.alcohol = "No"
        comment.visita = "Pareja"
        db.session.add(comment)
        db.session.commit()

        print("Comentarios: ", comment.comment, " Comentario.")
        print("--------------------------------------------------------")
        print("")       