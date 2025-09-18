import sqlite3

db_path = 'osij_backend/db.sqlite3'

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    print("Connection to SQLite DB successful")

    cursor.execute("SELECT * FROM education_course;")
    rows = cursor.fetchall()
    for row in rows:
        print(row)

    cursor.close()

except sqlite3.Error as error:
    print("Error while connecting to sqlite", error)
finally:
    if conn:
        conn.close()
        print("The SQLite connection is closed")
