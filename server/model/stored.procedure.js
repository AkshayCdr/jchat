`CREATE OR REPLACE PROCEDURE create_tables()
LANGUAGE SQL
AS $$
BEGIN
    -- Create USERS table
    CREATE TABLE IF NOT EXISTS USERS(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    -- Create SESSIONS table
    CREATE TABLE IF NOT EXISTS SESSIONS(
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES USERS(id)
    );

    -- Create CHATS table
    CREATE TABLE IF NOT EXISTS CHATS(
        id SERIAL PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (receiver_id) REFERENCES users(id)
    );

    -- Create ROOMS table
    CREATE TABLE IF NOT EXISTS rooms(
        id SERIAL PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL
    );

    -- Create GROUPS table
    CREATE TABLE IF NOT EXISTS groups(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        room_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
    );

    -- Create ROOM_CHATS table
    CREATE TABLE IF NOT EXISTS room_chats(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        room_id INT NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
    );
END;
$$;`;
