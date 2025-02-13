CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    
    gender TEXT,
    age INTEGER
);

CREATE TABLE IF NOT EXISTS session (
   session_id INTEGER PRIMARY KEY AUTOINCREMENT,
   user_id INTEGER,
   session_token TEXT,
   FOREIGN KEY (user_id) REFERENCES Users(user_id)
)
CREATE TABLE IF NOT EXISTS Questions (
    question_id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Responses (
    response_id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    response TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Response_History (
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    response TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);

INSERT  OR IGNORE INTO Questions (question) VALUES 
('Do you have any known allergies?'),
('Do you smoke/consume alcohol?'),
('Do you have any chronic diseases?'),
('Have you had a surgery or any major medical procedures?'),
('Are you currently taking any medicines? If so, which ones?'),
('Do you have a family history of any serious illness?'),
('Are you experiencing any pain or discomfort?'),
('Do you have a fever?'),
('Have you had any unexplained weight loss/gain recently?'),
('Are you experiencing any breathing difficulties?'),
('Do you often feel fatigue or weak?'),
('How often do you exercise?'),
('Do you follow any specific diet?'),
('How many hours of sleep do you get usually?'),
('Do you experience high levels of stress/anxiety?');