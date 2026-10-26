export const meals = {
    "Scrambled Eggs": ["Eggs", "Butter"],
    "Pancakes": ["Eggs", "Milk", "Flour", "Baking Powder", "Butter"],
    "Cheddar Omelette": ["Eggs", "Cheddar Cheese", "Butter"],
    "Pepper Jack Omelette": ["Eggs", "Pepper Jack Cheese", "Butter"],
    "American Cheese Omelette": ["Eggs", "American Cheese", "Butter"],
    "Plain Yogurt": ["Yogurt"],
    "Toast": ["Bread", "Butter"],
    "Yogurt Parfait": ["Yogurt", "Strawberries", "Blueberries", "Raspberries", "Granola"]
};

let tempFoods = [];
Object.values(meals).forEach((ingredients) => {
    for (let i of ingredients) {
        if (! tempFoods.includes(i)) {
            tempFoods.push(i);
        }
    }
});

export const foods = tempFoods;