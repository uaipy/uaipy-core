-- Create User Table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    details JSONB NOT NULL,
    uuid UUID NOT NULL,
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL, 
    deleted_at TIMESTAMP, 
    active boolean NOT NULL
);

-- Create Orquestrator Table
CREATE TABLE orquestrator (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    uuid UUID NOT NULL,
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL, 
    deleted_at TIMESTAMP, 
    active boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Create Device Table
CREATE TABLE device (
    id SERIAL PRIMARY KEY,
    orquestrator_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100),
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL, 
    deleted_at TIMESTAMP, 
    active boolean NOT NULL,
    FOREIGN KEY (orquestrator_id) REFERENCES orquestrator(id) ON DELETE CASCADE
);

-- Create Message Table
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    device_id INTEGER NOT NULL,
    data JSONB NOT NULL,
    local_reading_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL, 
    deleted_at TIMESTAMP, 
    active boolean NOT NULL,
    FOREIGN KEY (device_id) REFERENCES device(id) ON DELETE CASCADE
);

-- Insert User Into User Table
INSERT INTO
  "user" (
    name,
    email,
    password,
    details,
    uuid,
    created_at,
    updated_at,
    deleted_at,
    active
  )
VALUES
  (
    'John Doe',
    'john.doe@example.com',
    'securepassword',
    '{"age": 30, "country": "USA"}',
    gen_random_uuid (),
    NOW(),
    NOW(),
    NULL,
    true
  );

-- Select all Users from User Table

select
  *
from
  "user"