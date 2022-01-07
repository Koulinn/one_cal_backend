CREATE TABLE IF NOT EXISTS meal(
    _id SERIAL,
    name varchar(80) not null,
    calories INTEGER not null,
    CONSTRAINT meal_PK PRIMARY KEY (_id),
    CONSTRAINT unique_name UNIQUE (name)
);

ALTER TABLE
    meal
ADD
    CONSTRAINT positive_calories CHECK (calories > 0);