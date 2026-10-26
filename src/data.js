export const meals = {
    "Scrambled Eggs": [["Eggs", "Butter"], 10],
    "Pancakes": [["Eggs", "Milk", "Flour", "Baking Powder", "Butter"], 20],
    "Cheddar Omelette": [["Eggs", "Cheddar Cheese", "Butter"], 10],
    "Pepper Jack Omelette": [["Eggs", "Pepper Jack Cheese", "Butter"], 10],
    "American Cheese Omelette": [["Eggs", "American Cheese", "Butter"], 10],
    "Plain Yogurt": [["Yogurt"], 2],
    "Toast": [["Bread", "Butter"], 5],
    "Yogurt Parfait": [["Yogurt", "Strawberries", "Blueberries", "Raspberries", "Granola"], 5]
};

let tempFoods = [];
Object.values(meals).forEach((info) => {
    for (let i of info[0]) {
        if (! tempFoods.includes(i)) {
            tempFoods.push(i);
        }
    }
});

export const foods = tempFoods;