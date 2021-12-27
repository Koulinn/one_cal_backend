CREATE TABLE IF NOT EXISTS users(
    name varchar(40),
    surname varchar(80),
    birth_date date,
    email varchar(80) not null,
    uid varchar(130) not null,
    CONSTRAINT user_PK PRIMARY KEY (uid)
);