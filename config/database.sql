CREATE TABLE accounts(
    account_id SERIAL PRIMARY KEY, 
    first_name VARCHAR(255)
    last_name VARCHAR(255)
)

CREATE TABLE rooms(
    room_id SERIAL PRIMARY KEY, 
    name VARCHAR(255)
    password VARCHAR(255)
)