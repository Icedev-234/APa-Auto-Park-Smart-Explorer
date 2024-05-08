from flask import Flask

import sqlite3
import csv

#stergem Begin transcation
#scris id INTEGER PRIMARY KEY AUTO_INCREMENT, in loc de autoincrement
#in loc de "Data" e `Data`
#avem tabela users la final de script

app = Flask(__name__)

@app.route('/')
def hello():
    

    # Conectiune la baza de date SQLite sau cream una noua daca nu exista   
    conn = sqlite3.connect('apa.db')

    # Funcție pentru a executa interogări SQL
    def run_sql(cursor, sql, values=None):
        try:
            if values:
                cursor.execute(sql, values)
            else:
                cursor.execute(sql)
            print("Query executed successfully")
        except sqlite3.Error as err:
            print(f"Error while executing query: {err}")

    # Functie pentru a parsa si insera datele din fisierul CSV in tabelul `Data`
    def parse_csv(cursor, path):
        try:
            with open(path, newline='') as csvfile:
                csvreader = csv.reader(csvfile)
                next(csvreader)  # Skip header row
                for row in csvreader:
                    sql = "INSERT INTO Data (JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, DESCRIERE_COMERCIALA, TOTAL) VALUES (?, ?, ?, ?, ?, ?)"
                    cursor.execute(sql, row)
            print("CSV data inserted successfully")
        except Exception as e:
            print(f"Error while parsing CSV and inserting data: {e}")

    # Creare cursor pentru executia comenzilor SQL
    cursor = conn.cursor()

    # Creare tabel Users
    sql_create_users_table = """
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT
    )
    """
    run_sql(cursor, sql_create_users_table)

    # Inserare date in tabel Users
    usernames = ["victor", "alex"]
    for username in usernames:
        sql_insert_user = "INSERT INTO Users (username, password) VALUES (?, ?)"
        values = (username, username)
        run_sql(cursor, sql_insert_user, values)

    # Creare tabel Data
    sql_create_data_table = """
    CREATE TABLE IF NOT EXISTS Data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        JUDET TEXT NOT NULL,
        CATEGORIE_NATIONALA TEXT NOT NULL,
        CATEGORIA_COMUNITARA TEXT NOT NULL,
        MARCA TEXT NOT NULL,
        DESCRIERE_COMERCIALA TEXT NOT NULL,
        TOTAL TEXT NOT NULL
    )
    """
    run_sql(cursor, sql_create_data_table)

    # Parsare si inserare date din fisierul CSV in tabelul Data
    csv_path = 'C:\\Users\\rosca\\Documents\\APa-Auto-Park-Smart-Explorer-main\\resources\\data\\parc-auto-2013.csv'

    parse_csv(cursor, csv_path)

    # Commit pentru a aplica schimbarile in baza de date
    conn.commit()

    # Inchidere conexiune si cursor
    cursor.close()
    conn.close()

    return "Hello, World!"

def export_sqlite_to_sql(sqlite_db_file, output_sql_file, limit = 7000):
    conn = sqlite3.connect(sqlite_db_file)
    with open(output_sql_file, 'w') as f:
        f.write('BEGIN;\n')


        # Adaugati comanda de creare a tabelului Users
        f.write('CREATE TABLE IF NOT EXISTS Users (\n')
        f.write('    id INTEGER PRIMARY KEY AUTO_INCREMENT,\n')
        f.write('    username TEXT NOT NULL,\n')
        f.write('    password TEXT NOT NULL,\n')
        f.write('    email TEXT\n')
        f.write(');\n\n')
        
        # Adaugati insertiile pentru tabela Users
        users_inserts = [
            "INSERT INTO `Users` VALUES(1,'victor','victor',NULL);\n",
            "INSERT INTO `Users` VALUES(2,'alex','alex',NULL);\n",
            "INSERT INTO `Users` VALUES(3,'victor','alex',NULL);\n"
            "INSERT INTO `Users` VALUES(4,'alex','alex',NULL);\n"
            "INSERT INTO `Users` VALUES(5,'victor','alex',NULL);\n"
            "INSERT INTO `Users` VALUES(6,'alex','alex',NULL);\n"
        ]

        for user_insert in users_inserts:
            f.write(user_insert)

        # Adaugati instructiunea DELETE pentru a sterge toate inregistrarile din tabela Users
        f.write('\n')
        f.write('DELETE FROM `Users`;\n')
        f.write('\n')

        # Adaugati insertiile specifice la final pentru tabela Users
        f.write("INSERT INTO `Users` (username, password, email) VALUES ('Users',6,NULL);\n")
        f.write("INSERT INTO `Users` (username, password, email) VALUES ('Data',7000,NULL);\n")
        f.write('\n')

        # Adaugati comanda de creare a tabelului Data
        f.write('CREATE TABLE IF NOT EXISTS Data (\n')
        f.write('    id INTEGER PRIMARY KEY AUTO_INCREMENT,\n')
        f.write('    JUDET TEXT NOT NULL,\n')
        f.write('    CATEGORIE_NATIONALA TEXT NOT NULL,\n')
        f.write('    CATEGORIA_COMUNITARA TEXT NOT NULL,\n')
        f.write('    MARCA TEXT NOT NULL,\n')
        f.write('    DESCRIERE_COMERCIALA TEXT NOT NULL,\n')
        f.write('    TOTAL TEXT NOT NULL\n')
        f.write(');\n\n')


        # Iterati prin datele din fișierul CSV si adaugati inserarile in fisierul SQL
        with open('C:\\Users\\rosca\\Documents\\APa-Auto-Park-Smart-Explorer-main\\resources\\data\\parc-auto-2013.csv', newline='') as csvfile:
            csvreader = csv.reader(csvfile)
            next(csvreader)  # Skip header row
            for i,row in enumerate(csvreader):
                # Modificarea pentru adaugarea spatiului inainte de 'D' în coloana 'DESCRIERE_COMERCIALA'
                if row[4] == 'CEE`D':
                    row[4] = 'CEE D'

                if row[4] == "CEE'D":
                    row[4] = "CEE D"

                # Verificam daca valoarea din coloana "DESCRIERE_COMERCIALA" este "LION'S COACH" si înlocuim apostroful cu un spatiu
                if row[4] == "LION'S COACH":
                    row[4] = "LION S COACH"

                # Construim comanda de inserare manual
                insert_query = f"INSERT INTO `Data` (JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, DESCRIERE_COMERCIALA, TOTAL) VALUES ('{row[0]}', '{row[1]}', '{row[2]}', '{row[3]}', '{row[4]}', '{row[5]}');\n"
                
                # Scriem comanda de inserare in fisierul SQL
                f.write(insert_query)

                if i + 1 >= limit:
                    break

        f.write('COMMIT;\n')

    print(f"Exported SQLite database to {output_sql_file}")


sqlite_db_file = 'apa.db'
output_sql_file = 'exported_data.sql'
export_sqlite_to_sql(sqlite_db_file, output_sql_file, limit=7000)

if __name__ == '__main__':
    app.run(debug=True)