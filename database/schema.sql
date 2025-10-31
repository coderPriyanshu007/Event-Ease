-- users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

--create admin
INSERT INTO users (name,email,password,role) VALUES (admin,adminateventease@gmail.com,admin123,admin);

-- events
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(100),
  category VARCHAR(50),
  location VARCHAR(50),
  description TEXT,
  date DATE,
  capacity INT,
  seats_booked INT DEFAULT 0
);

-- bookings
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  event_id INT REFERENCES events(id),
  seats INT CHECK (seats <= 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


