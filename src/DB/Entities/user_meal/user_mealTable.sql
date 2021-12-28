CREATE TABLE IF NOT EXISTS user_meal(
    user_meal_id SERIAL not null,
    user_id varchar(130) not null,
    meal_id INTEGER not null,
    time_eaten TIMESTAMP not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP not null,
    CONSTRAINT user_meal_PK PRIMARY KEY (user_meal_id),
    CONSTRAINT user_FK FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE,
    CONSTRAINT meal_FK FOREIGN KEY (meal_id) REFERENCES meal
);