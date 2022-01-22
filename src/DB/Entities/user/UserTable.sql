CREATE TABLE IF NOT EXISTS users(
    name varchar(40),
    surname varchar(80),
    birth_date date,
    email varchar(80) NOT NULL,
    uid varchar(130) NOT NULL,
    CONSTRAINT user_PK PRIMARY KEY (uid)
);

ALTER TABLE
    users
ADD
    COLUMN avatar VARCHAR(244);