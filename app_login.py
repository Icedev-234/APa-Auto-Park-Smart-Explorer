from flask import Flask, render_template, request, redirect, session
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
            return redirect('/')
        else:
            return "Invalid username or password."

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/statistics')
def statistics():
    return render_template('statistics.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/security_and_policy')
def security_and_policy():
    return render_template('security_and_policy.html')

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
