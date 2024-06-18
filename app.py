from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from flask_session import Session
import pymysql.cursors

app = Flask(__name__)

app.secret_key = 'super_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

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

@app.route('/')
def index():
    return render_template('statistics.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = validate(request.form['username'])
        password = validate(request.form['password'])

        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE username = %s AND password = %s"
            cursor.execute(sql, (username, password))
            result = cursor.fetchone()

        connection.close()

        if result:
            session['logged_in'] = True
            return redirect(url_for('statistics'))
        else:
            return "Invalid username or password."
        
    return render_template('login.html')

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    next_page = request.form.get('next', '/')
    return redirect(next_page)

@app.route('/statistics')
def statistics():
    logged_in = session.get('logged_in', False)
    if not logged_in:
        return redirect(url_for('index'))
    return render_template('statistics.html', logged_in=logged_in)

@app.route('/about')
def about():
    logged_in = session.get('logged_in', False)
    if not logged_in:
        return redirect(url_for('index'))
    return render_template('about.html', logged_in=logged_in)

@app.route('/contact')
def contact():
    logged_in = session.get('logged_in', False)
    if not logged_in:
        return redirect(url_for('index'))
    return render_template('contact.html', logged_in=logged_in)

@app.route('/security_and_policy')
def security_and_policy():
    logged_in = session.get('logged_in', False)
    if not logged_in:
        return redirect(url_for('index'))
    return render_template('security_and_policy.html', logged_in=logged_in)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
