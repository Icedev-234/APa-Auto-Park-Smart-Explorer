import http.server
import socketserver
import urllib.parse
import pymysql.cursors
from http.cookies import SimpleCookie
import os

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
        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/login':
            self.handle_login_post()
        elif parsed_path.path == '/logout':
            self.handle_logout_post()
        else:
            self.send_error(404, "File not found")

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

# Run the server
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving on port http://localhost:{PORT}")
    httpd.serve_forever()
