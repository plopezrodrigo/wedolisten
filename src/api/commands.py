
import click
from api.models import db, User, Customer, Manager, Comercial_Place

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
        Comercial_Place.query.all()
        cp = Comercial_Place.query.first()
        db.session.delete(cp)
        db.session.commit()

        Customer.query.all()
        customer = Customer.query.first()
        db.session.delete(customer)
        db.session.commit()

        Manager.query.all()
        manager = Manager.query.first()
        db.session.delete(manager)
        db.session.commit()

        User.query.all()
        user = User.query.first()
        db.session.delete(user)
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

        print("")
        print("--------------------------------------------------------")
        print("--------------------------------------------------------")
        print("")

        print("Creating test users Manager")
        user = User()
        user.email = "lvicente@hangarxxi.com"
        user.type = "manager",
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
        cp.address = 'address'
        db.session.add(cp)
        db.session.commit()
        print("manager: ", cp.name, " Comercial_Place.")