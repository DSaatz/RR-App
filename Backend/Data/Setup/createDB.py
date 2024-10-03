import sys
sys.path.append('../')

from Backend.Data.Helpers import connector

conn = connector.create_connection()

cur = conn.cursor()


cur.execute('''
    CREATE TABLE IF NOT EXISTS users (
            userID SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL
        );
''')

cur.execute('''
    CREATE TABLE IF NOT EXISTS reviews (
            reviewID SERIAL PRIMARY KEY,
            userID INT NOT NULL,
            restaurantName VARCHAR(100) NOT NULL,
            ambient INT NOT NULL,
            service INT NOT NULL,
            taste INT NOT NULL,
            plating INT NOT NULL,
            location INT NOT NULL,
            priceToValue INT NOT NULL,
            reviewDate DATE NOT NULL,
            score NUMERIC NOT NULL,
            review TEXT,
            FOREIGN KEY (userID) REFERENCES users(userID)
        );
''')

cur.execute('''
    CREATE TABLE IF NOT EXISTS restaurants (
            restaurantID SERIAL PRIMARY KEY,
            avg_rating NUMERIC NOT NULL,
            restaurantName VARCHAR(100) NOT NULL,
            review_amount INT NOT NULL,
            pictures TEXT);
''')

print("Tables Created")

conn.commit()

cur.close()
conn.close()