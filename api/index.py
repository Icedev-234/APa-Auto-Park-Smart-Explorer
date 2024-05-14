from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs

from dataController import dataController

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_path = urlparse(self.path)
        controller = dataController()
        
        if parsed_path.path == '/APa-Auto-Park-Smart-Explorer-main/api/MARCA-data':
            query_components = parse_qs(parsed_path.query)
            pageNumber = int(query_components.get('pageNumber', [1])[0])
            pageSize = int(query_components.get('pageSize', [10])[0])
            response = controller.getPaginatedData(pageNumber, pageSize)
            self.send_response(response['status_code_header'])
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response['body']).encode())

        else:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        entry = json.loads(post_data.decode())
        
        controller = dataController()
        response = controller.addData(entry)

        if response['status_code'] == 201:
            self.send_response(response['status_code'])
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response['body']).encode())
        else:
            self.send_error(405, 'Method Not Allowed: %s' % self.command)

    def do_DELETE(self):
        parsed_path = urlparse(self.path)
        endpoint = parsed_path.path

        if endpoint.startswith('/APa-Auto-Park-Smart-Explorer-main/api/MARCA-data'):
            entryId = endpoint.split('/')[-1]
            controller = dataController()
            response = controller.deleteData(entryId)

            self.send_response(response['status_code_header'])
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response['body']).encode())
        else:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def do_PUT(self):
        content_length = int(self.headers['Content-Length'])
        put_data = self.rfile.read(content_length)
        entry = json.loads(put_data.decode())

        parsed_path = urlparse(self.path)
        endpoint = parsed_path.path

        if endpoint.startswith('/APa-Auto-Park-Smart-Explorer-main/api/MARCA-data'):
            entryId = endpoint.split('/')[-1]
            controller = dataController()
            response = controller.editData(entryId, entry)

            self.send_response(response['status_code_header'])
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response['body']).encode())
        else:
            self.send_error(404, 'File Not Found: %s' % self.path)

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting httpd on port %d...' % port)
    httpd.serve_forever()

if __name__ == "__main__":
    run()