CREATE TABLE IF NOT EXISTS user_meal(
    user_id varchar(130) not null,
    meal_id INTEGER,
    CONSTRAINT user_meal_PK PRIMARY KEY ("user_id", "meal_id"),
    CONSTRAINT user_FK FOREIGN KEY (user_id) REFERENCES user ON DELETE CASCADE,
    CONSTRAINT meal_FK FOREIGN KEY (meal_id) REFERENCES meal
);