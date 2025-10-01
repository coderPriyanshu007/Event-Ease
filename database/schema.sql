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

INSERT INTO events (event_id, title, category, location, description, date, capacity, seats_booked) VALUES
-- Technology & Business
('EVT-OCT2025-A1B', 'AI & Machine Learning Summit', 'Technology', 'online', 'A deep dive into AI, ML, and data-driven solutions with top industry experts.', '2025-10-15', 500, 0),
('EVT-NOV2025-Z4P', 'Remote Work Strategies', 'Business', 'online', 'Learn effective strategies for managing remote teams and boosting productivity.', '2025-11-10', 300, 0),
('EVT-DEC2025-T2K', 'Blockchain for Beginners', 'Technology', 'online', 'Introduction to blockchain concepts, smart contracts, and decentralized applications.', '2025-12-12', 400, 0),
('EVT-JAN2026-K8S', 'Cloud Computing Essentials', 'Technology', 'online', 'Learn the basics of AWS, Azure, and Google Cloud for developers and IT professionals.', '2026-01-22', 350, 0),

-- Art & Culture
('EVT-NOV2025-J7Q', 'Street Art Festival', 'Art', 'in-person', 'An open-air festival showcasing murals, graffiti, and live painting.', '2025-11-18', 200, 0),
('EVT-MAR2026-N6W', 'Photography Masterclass', 'Art', 'in-person', 'Learn professional techniques for photography, lighting, and editing.', '2025-03-15', 90, 0),
('EVT-MAY2026-L5N', 'Digital Art & Design Workshop', 'Art', 'online', 'Learn digital painting, 3D design, and animation with expert artists.', '2026-05-25', 200, 0),
('EVT-JUL2026-K9D', 'World Cinema Appreciation', 'Culture', 'online', 'Explore international cinema, film history, and director masterclasses.', '2026-07-12', 180, 0),

-- Food & Lifestyle
('EVT-DEC2025-H6M', 'Yoga & Mindfulness Retreat', 'Health', 'in-person', 'A full-day retreat focusing on yoga, breathing techniques, and mental well-being.', '2025-12-02', 60, 0),
('EVT-MAR2026-F8L', 'Global Street Food Carnival', 'Food', 'in-person', 'Taste cuisines from around the world with live cooking demos.', '2025-03-28', 500, 0),
('EVT-APR2026-C7X', 'Wine & Cheese Tasting Night', 'Food', 'in-person', 'Exclusive gourmet experience with sommeliers and expert chefs.', '2025-04-08', 70, 0),
('EVT-JUN2026-V5P', 'Vegan Cooking Workshop', 'Food', 'online', 'Hands-on plant-based cooking session with recipes you can make at home.', '2025-06-14', 150, 0),

-- Music & Performance
('EVT-JAN2026-B5L', 'Local Bands Night', 'Music', 'in-person', 'Live performances by upcoming indie and rock bands.', '2025-08', 120, 0),
('EVT-JUN2026-T3B', 'Music Production Basics', 'Music', 'in-person', 'A workshop covering sound engineering, mixing, and beat production.', '2025-06-08', 100, 0),
('EVT-APR2026-D3M', 'Jazz & Blues Evening', 'Music', 'in-person', 'A cozy evening of jazz, blues, and fusion performances.', '2025-04-22', 80, 0),
('EVT-JUL2026-X2K', 'Global Music Festival Online', 'Music', 'online', 'Virtual performances from artists across the world.', '2025-07-05', 600, 0),

-- Education & Career
('EVT-OCT2025-C9X', 'Full-Stack Bootcamp', 'Education', 'in-person', 'An intensive bootcamp covering React, Node.js, PostgreSQL, and deployment.', '2025-11-05', 100, 0),
('EVT-FEB2026-P1R', 'Personal Finance Mastery', 'Education', 'online', 'Manage your money better with lessons on budgeting, investing, and retirement planning.', '2025-02-15', 250, 0),
('EVT-MAY2026-W9L', 'Career Growth & Leadership', 'Business', 'in-person', 'Interactive leadership training and career advancement strategies.', '2025-05-10', 140, 0),
('EVT-JUL2026-Y8J', 'Startup Pitch Night', 'Business', 'in-person', 'Entrepreneurs present startup ideas to investors and receive feedback.', '2025-07-22', 80, 0);
