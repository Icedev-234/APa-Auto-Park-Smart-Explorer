import http.server
import socketserver
import urllib.parse
import pymysql.cursors
from http.cookies import SimpleCookie
import os
import json
from api.dataController import dataController
from urllib.parse import urlparse

#sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Global settings
PORT = 8000
SECRET_KEY = 'super_secret_key'

# Helper functions
def validate(data):
    return data.strip()

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='apa',
        cursorclass=pymysql.cursors.DictCursor
    )

def render_template(template_name, **context):
    template_path = os.path.join('templates', template_name)
    with open(template_path, 'r', encoding='utf-8') as file:
        html = file.read()
    for key, value in context.items():
        html = html.replace(f'{{{{ {key} }}}}', str(value))
    return html

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/':
            self.handle_index()
        elif parsed_path.path == '/login':
            self.handle_login()
        elif parsed_path.path == '/logout':
            self.handle_logout()
        elif parsed_path.path == '/statistics':
            self.handle_statistics()
        elif parsed_path.path == '/admin':
            self.handle_admin()
        elif parsed_path.path == '/security_and_policy':
            self.handle_security_and_policy()
        elif parsed_path.path == '/about':
            self.handle_about()
        elif parsed_path.path == '/contact':
            self.handle_contact()
        elif parsed_path.path.startswith('/static/'):
            self.handle_static(parsed_path.path)
        elif parsed_path.path == '/api/bmi-data':
            self.handle_get_data()
        elif parsed_path.path == '/api/data':
            self.handle_get_data_from_db()
        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/login':
            self.handle_login_post()
        elif parsed_path.path == '/logout':
            self.handle_logout_post()
        elif parsed_path.path == '/api/bmi-data':
            self.handle_create_data_post()
        else:
            self.send_error(404, "File not found")

    def do_PUT(self):
        parsed_path = urlparse(self.path)
        endpoint = parsed_path.path

        if endpoint.startswith('/api/bmi-data/'):
            entry_id = endpoint.split('/')[-1]
            self.handle_edit_data(entry_id)
        else:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def handle_index(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(render_template('statistics.html').encode())

    def handle_login(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(render_template('login.html').encode())

    def handle_login_post(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_params = urllib.parse.parse_qs(post_data.decode())

        username = validate(post_params['username'][0])
        password = validate(post_params['password'][0])

        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE username = %s AND password = %s"
            cursor.execute(sql, (username, password))
            result = cursor.fetchone()
        connection.close()

        if result:
            self.send_response(302)
            self.send_header('Location', '/statistics')

            # Set cookies
            self.send_header('Set-Cookie', f'logged_in=True; Domain=localhost; Path=/')
            self.send_header('Set-Cookie', f'username={username}; Domain=localhost; Path=/')

            self.end_headers()
        else:
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write("Invalid username or password.".encode())

    def handle_logout_post(self):
        cookie = SimpleCookie(self.headers.get('Cookie'))
        cookie['logged_in'] = ''
        cookie['username'] = ''
        cookie['logged_in']['path'] = '/'
        cookie['username']['path'] = '/'
        cookie['logged_in']['expires'] = 'Thu, 01 Jan 1970 00:00:00 GMT'
        cookie['username']['expires'] = 'Thu, 01 Jan 1970 00:00:00 GMT'
        next_page = self.headers.get('Referer', '/')
        self.send_response(302)
        self.send_header('Location', next_page)
        self.send_header('Set-Cookie', cookie.output(header='', sep=''))
        self.end_headers()

    def handle_statistics(self):
        cookie = SimpleCookie(self.headers.get('Cookie'))
        if 'logged_in' in cookie and cookie['logged_in'].value == 'True':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(render_template('statistics.html', logged_in=True).encode())
        else:
            self.send_response(302)
            self.send_header('Location', '/')
            self.end_headers()

    def handle_admin(self):
        cookie = SimpleCookie(self.headers.get('Cookie'))
        print("Cookies: ", cookie)  # Debugging statement
        for key, morsel in cookie.items():
            print(f"Cookie {key}: {morsel.value}")  # Additional debugging
        if ('logged_in' in cookie and cookie['logged_in'].value == 'True' and 
                'username' in cookie and cookie['username'].value == 'admin'):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(render_template('admin.html', logged_in=True).encode())
        else:
            self.send_response(302)
            self.send_header('Location', '/')
            self.end_headers()

    def handle_security_and_policy(self):
        cookie = SimpleCookie(self.headers.get('Cookie'))
        if 'logged_in' in cookie and cookie['logged_in'].value == 'True':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(render_template('security_and_policy.html', logged_in=True).encode())
        else:
            self.send_response(302)
            self.send_header('Location', '/')
            self.end_headers()

    def handle_about(self):
        cookie = SimpleCookie(self.headers.get('Cookie'))
        logged_in = 'logged_in' in cookie and cookie['logged_in'].value == 'True'
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(render_template('about.html', logged_in=logged_in).encode())

    def handle_contact(self):
        cookie = SimpleCookie(self.headers.get('Cookie'))
        logged_in = 'logged_in' in cookie and cookie['logged_in'].value == 'True'
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(render_template('contact.html', logged_in=logged_in).encode())

    def handle_static(self, path):
        try:
            file_path = os.path.join('.', urllib.parse.unquote(path.lstrip('/')))
            if os.path.isfile(file_path):
                self.send_response(200)
                self.send_header('Content-type', self.guess_type(file_path))
                self.end_headers()
                with open(file_path, 'rb') as file:
                    self.wfile.write(file.read())
            else:
                self.send_error(404, "File not found")
        except Exception as e:
            self.send_error(500, f"Internal server error: {e}")

    def handle_create_data_post(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode())
    
        print(data) 

        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO data (JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (data['judet'], data['categorie_nationala'], data['categorie_comunitara'], data['marca']))
            connection.commit()
        connection.close()
    
        self.send_response(201)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"status": "success"}).encode())

    def do_DELETE(self):
        #am utilizat controllerul de stergere
        parsed_path = urlparse(self.path)
        endpoint = parsed_path.path

        if endpoint.startswith('/api/bmi-data'):
            entryId = endpoint.split('/')[-1]
            controller = dataController()
            response = controller.deleteData(entryId)

            self.send_response(response['status_code_header'])
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            if response['body']:
                self.wfile.write(response['body'].encode())
        else:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def handle_edit_data(self, entry_id):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        try:
            data = json.loads(post_data.decode())
        except json.JSONDecodeError as e:
            self.send_error(400, f"Invalid JSON data: {str(e)}")
            return
    
        expected_keys = ['JUDET', 'CATEGORIE_NATIONALA', 'CATEGORIA_COMUNITARA', 'MARCA']
        for key in expected_keys:
            if key not in data:
                self.send_error(400, f"Missing required field: {key}")
                return
    
        # Assuming dataController has an editData method
        controller = dataController()
        response = controller.editData(entry_id, data)

        self.send_response(response['status_code_header'])
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        if response['body']:
            self.wfile.write(response['body'].encode())

    def handle_get_data(self):
        parsed_path = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_path.query)

        # Extragem parametrii de filtrare
        judet = query_params.get('judet', [None])[0]
        categorie_nationala = query_params.get('categorie_nationala', [None])[0]
        marca = query_params.get('marca', [None])[0]
        page_number = int(query_params.get('pageNumber', [1])[0])

        # Calculăm offset-ul pentru paginare
        limit = 10  # Numărul de înregistrări pe pagină
        offset = (page_number - 1) * limit

        # Construim query-ul SQL în funcție de filtrele aplicate
        sql = "SELECT * FROM data"
        where_clauses = []
        params = []

        if judet:
            where_clauses.append("judet = %s")
            params.append(judet)
        if categorie_nationala:
            where_clauses.append("categorie_nationala = %s")
            params.append(categorie_nationala)
        if marca:
            where_clauses.append("marca = %s")
            params.append(marca)

        if where_clauses:
            sql += " WHERE " + " AND ".join(where_clauses)

        sql_count = sql.replace("*", "COUNT(*)")

        # Executăm query-ul pentru numărul total de înregistrări (pentru paginare)
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute(sql_count, tuple(params))
            total_count = cursor.fetchone()['COUNT(*)']

        # Adăugăm limita și offset-ul pentru paginare la query-ul principal
        sql += f" LIMIT {limit} OFFSET {offset}"

        # Executăm query-ul principal pentru a obține datele
        with connection.cursor() as cursor:
            cursor.execute(sql, tuple(params))
            data = cursor.fetchall()

        connection.close()

        # Construim răspunsul în format JSON
        response_data = {
            "totalPages": (total_count // limit) + 1,
            "data": data
        }

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode())


    def handle_get_data_from_db(self):
        # Funcție pentru a obține toate datele din baza de date și a le returna ca răspuns JSON
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM data"
            cursor.execute(sql)
            data = cursor.fetchall()

        connection.close()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())


# Run the server
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving on port http://localhost:{PORT}")
    httpd.serve_forever()
