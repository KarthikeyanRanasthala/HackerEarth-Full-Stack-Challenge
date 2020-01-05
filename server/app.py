from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL, MySQLdb
from settings import MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB

app = Flask(__name__)

app.config["MYSQL_USER"] = MYSQL_USER
app.config["MYSQL_PASSWORD"] = MYSQL_PASSWORD
app.config["MYSQL_DB"] = MYSQL_DB
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

db = MySQL(app)

CORS(app)


def db_read(query, params=None):
    # Read from db
    cursor = db.connection.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)

    entries = cursor.fetchall()
    cursor.close()

    content = []

    for entry in entries:
        content.append(entry)

    return content


def search_speaker(query):
    # Search for speakers
    query = "%" + query + "%"
    content = db_read(
        """SELECT * from speakers WHERE speaker_name LIKE %s LIMIT 10""", (query,))
    return content


def search_events(query):
    # Search for events
    query = "%" + query + "%"
    content = db_read(
        """SELECT events_table.id AS id, description, event, name, FROM_UNIXTIME(published_date) as published_date, title, url, views, speaker_name, speaker_occupation from events_table join speakers on events_table.speaker_id = speakers.id  WHERE title LIKE %s LIMIT 10""", (query,))
    return content


@app.route("/speakers")
def get_speakers():
    # GET speakers with pagination
    page_no = request.args.get("page_no") or 1
    offset = (int(page_no) - 1) * 10
    pages = db_read("""SELECT COUNT(id) as total FROM speakers""")
    pages = pages[0]["total"] // 10
    content = db_read("""SELECT * from speakers LIMIT %s, 10""", (offset,))
    return jsonify({"content": content, "total_pages": pages, "comment": "Success"})


@app.route("/speakers/<int:speaker_id>")
def get_speaker(speaker_id):
    # GET individual speaker details
    speaker_content = db_read(
        """SELECT * from speakers WHERE id = %s""", (speaker_id,))
    recent_events = db_read(
        """SELECT id, description, event, name, FROM_UNIXTIME(published_date) as published_date, title, url, views from events_table WHERE speaker_id = %s ORDER BY id DESC LIMIT 5""", (speaker_id,))
    return jsonify({"content": {"speaker": speaker_content, "recent_events": recent_events}, "comment": "Success"})


@app.route("/events")
def get_events():
    # GET events with pagination
    page_no = request.args.get("page_no") or 1
    offset = (int(page_no) - 1) * 10
    pages = db_read("""SELECT COUNT(id) as total FROM speakers""")
    pages = pages[0]["total"] // 10
    content = db_read(
        """SELECT events_table.id AS id, description, event, name, FROM_UNIXTIME(published_date) as published_date, title, url, views, speaker_name, speaker_occupation from events_table join speakers on events_table.speaker_id = speakers.id LIMIT %s, 10""", (offset,))
    return jsonify({"content": content, "total_pages": pages, "comment": "Success"})


@app.route("/events/<int:event_id>")
def get_event(event_id):
    # GET individual event details
    content = db_read(
        """SELECT description, event, name, FROM_UNIXTIME(published_date) as published_date, title, url, views, speaker_name, speaker_occupation, speaker_id from events_table join speakers on events_table.speaker_id = speakers.id WHERE events_table.id = %s""", (event_id,))
    if len(content) == 1:
        return jsonify({"content": content, "comment": "Success"})
    else:
        return jsonify({"content": [], "comment": "Fail"})


@app.route("/search")
def search():
    search_type = request.args.get("type")
    if search_type:
        query = request.args.get("query")
        if query:
            if search_type == "speakers":
                content = search_speaker(query)
                return jsonify({"content": content, "comment": "Success"})

            elif search_type == "events":
                content = search_events(query)
                return jsonify({"content": content, "comment": "Success"})

        else:
            return jsonify({"content": [], "comment": "Did not receive the required search query"})

    else:
        return jsonify({"content": [], "comment": "Did not receive the required search type"})


@app.route("/recent_events")
def get_recent_events():
    # GET recent events on homepage
    content = db_read(
        """SELECT events_table.id AS id, description, event, name, FROM_UNIXTIME(published_date) as published_date, title, url, views, speaker_name, speaker_occupation, speakers.id AS speaker_id from events_table join speakers on events_table.speaker_id = speakers.id ORDER BY id DESC LIMIT 10""")
    return jsonify({"content": content, "comment": "Success"})
