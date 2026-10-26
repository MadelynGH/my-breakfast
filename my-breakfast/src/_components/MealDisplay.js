import { meals } from "../data.js";

function OneMeal({ name, ingredients, time }) {
    console.log(name, ingredients)
    return (
        <div style={{
            border: "1.5px solid #070C33",
            borderRadius: "8px",
            padding: "10px",
            width: "26%",
            boxSizing: "border-box",
            marginBottom: "5.5%",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <h2>{name}</h2>
            <h3 style={{
                textAlign: "center",
                margin: "0"
            }}>{ingredients.map((i,n) => n < (ingredients.length - 1) ? `${i}, ` : i)}</h3>
            <h3><i>{time} minutes</i></h3>
        </div>
    );
}

export default function MealDisplay({ displayMeals }) {
    return (
        <div style={{
            display: "flex",
            flexFlow: "row wrap",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "space-evenly",
            marginTop: "5.5%"
        }}>
            {displayMeals.map(mealName => <OneMeal name={mealName} ingredients={meals[mealName][0]} time={meals[mealName][1]} key={mealName} />)}
        </div>
    );
}