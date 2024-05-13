import mysql.connector

def connect():
    servername = "localhost"
    username = "root"
    password = ""
    dbname = "apa"

    # Creare conexiune
    conn = mysql.connector.connect(
        host=servername,
        user=username,
        password=password,
        database=dbname
    )
    
    # Verificare conexiune
    if conn.is_connected():
        print("Connected to MySQL database")
    else:
        print("Connection failed")
    return conn

def runSQL(conn, sql):
    cursor = conn.cursor(dictionary=True)
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    return result