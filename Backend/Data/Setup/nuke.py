import sys
sys.path.append('../')

from Backend.Data.Helpers import connector

conn = connector.create_connection()

cur = conn.cursor()

cur.execute('''
    DROP TABLE IF EXISTS users CASCADE;
''')
cur.execute('''
    DROP TABLE IF EXISTS reviews CASCADE;
''')
cur.execute('''
    DROP TABLE IF EXISTS restaurants CASCADE;
''')

print("Tables Dropped")

conn.commit()

cur.close()
conn.close()