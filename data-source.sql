 -- Create User Table
CREATE TABLE
  "tb_user" (
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
CREATE TABLE
  tb_orquestrator (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    uuid UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP,
    active boolean NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "tb_user" (id) ON DELETE CASCADE
  );

-- Create Device Table
CREATE TABLE
  tb_device (
    id SERIAL PRIMARY KEY,
    orquestrator_id INTEGER NOT NULL,
    integration_code VARCHAR(100) UNIQUE NOT NULL,
    uuid UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    type
      VARCHAR(100),
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      deleted_at TIMESTAMP,
      active boolean NOT NULL,
      FOREIGN KEY (orquestrator_id) REFERENCES tb_orquestrator (id) ON DELETE CASCADE
  );

-- Create Message Table
CREATE TABLE
  tb_message (
    id SERIAL PRIMARY KEY,
    device_id INTEGER NOT NULL,
    data JSONB NOT NULL,
    local_reading_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP,
    active boolean NOT NULL,
    FOREIGN KEY (device_id) REFERENCES tb_device (id) ON DELETE CASCADE
  );

INSERT INTO
  "tb_user" (
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

  INSERT INTO tb_device (
    orquestrator_id,
    integration_code,
    uuid,
    name,
    type,
    created_at,
    updated_at,
    deleted_at,
    active
) VALUES (
    1, 
    'INTG-001',
    gen_random_uuid(), 
    'Device Name',
    'Sensor',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    NULL, 
    TRUE 
);


select
  *
from
  public.tb_user as u
where
  u.active = true;

-- Delete Table
drop table
  "tb_user";

drop table
  "tb_orquestrator";

drop table
  "tb_device";

drop table
  "tb_message";

