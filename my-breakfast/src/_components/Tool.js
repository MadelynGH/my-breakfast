"use client";
import Form from "next/form";
import { useState, useEffect } from "react";
import "../app/globals.css";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

const stages = [<h2 style={{
                marginTop: "0"
            }}>Select all the ingredients you <span className="red">hate</span>.</h2>, <h2>Select all the ingredients that you <span className="greenText">DO</span> have.</h2>];
const foods = ["Flour", "Sugar", "Yogurt", "Baking Powder", "Eggs", "Butter", "Milk", "Cheddar Cheese", "Pepper Jack Cheese", "American Cheese", "Almonds", "Peanuts", "Cashews", "Walnuts", "Strawberries", "Raspberries", "Blueberries", "Bananas"];
const meals = {
    "Scrambled Eggs": ["Eggs", "Butter"],
    "Pancakes": ["Eggs", "Milk", "Flour", "Baking Powder", "Butter"],
    "Cheddar Omelette": ["Eggs", "Cheddar Cheese"],
    "Yogurt": ["Yogurt"],
};
let inputList = [];
let tempFormState;

function InputList({ formState, updateFormState, currentStage, noUseFoods }) {
    inputList = [];
    tempFormState = formState.slice();
    
    for (let i = 0; i < foods.length; i++) {
        inputList.push(<div key={i} id={`input-div-${foods[i]}`} style={{
            margin: "10px",
            display: currentStage == 1 && noUseFoods[i] ? "none" : "flex",
            alignItems: "center"
        }}><input type="checkbox" className={currentStage == 0 ? "negativeCheckbox" : ""} checked={formState[i]} onChange={(e) => {tempFormState[i]=e.target.checked; updateFormState(tempFormState);}} name={foods[i]} id={foods[i]} />
        <label htmlFor={foods[i]} style={{
            fontSize: "1.2em",
            margin: "5px"
        }}>{foods[i]}</label></div>);
    }

    return inputList;
}

export default function Tool() {
    const [currentStage, updateCurrentStage] = useState(0);
    const [formState, updateFormState] = useState(foods.map(() => false));
    const [acceptableMeals, updateAcceptableMeals] = useState([]);
    const [noUseFoods, updateNoUseFoods] = useState(null);
    const [ownedFoods, updateOwnedFoods] = useState(null);

    useEffect(() => {
        if (ownedFoods && noUseFoods) {
            updateAcceptableMeals(Object.keys(meals).map((meal) => {
                for (let i of meals[meal]) {
                    if (noUseFoods.includes(i)) {
                        console.log("exited via noUse", i);
                        return;
                    }
                    if (! (ownedFoods.includes(i))) {
                        console.log("exited via ownedFoods", i);
                        return;
                    }
                }
                return meal;
            }));
        }
    }, [ownedFoods, noUseFoods]);

    function mySubmitForm() {
        if (currentStage === 0) {
            updateNoUseFoods(formState.map((i, n) => {if (i) { return foods[n]; } }));
        } else if (currentStage === 1) {
            updateOwnedFoods(formState.map((i, n) => {if (i) { return foods[n]; } }));
        }

        updateFormState(foods.map(() => false));
        updateCurrentStage(currentStage + 1);
    }

    
    return (
        <section style={{
            border: "1.5px solid black",
            width: "50vw",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "15px",
            marginTop: "10vh",
            paddingBottom: "5vh",
            paddingTop: "5vh"
        }}>
            {stages[currentStage]}
            <div style={{
                display: currentStage > 1 ? "block" : "none"
            }}>
                <h2>Recommended Meals:</h2>
                <ul>{acceptableMeals.map(meal => meal ? <li key={meal} style={{fontSize: "1.2em"}}><b>{meal}</b> ({meals[meal].map((i,n) => n < (meals[meal].length - 1) ? `${i}, ` : i)})</li> : null)}</ul>
            </div>
            <Form action={mySubmitForm} style={{
                marginLeft: "10%",
                display: currentStage < 2 ? "block" : "none"
            }}>
                <InputList formState={formState} updateFormState={updateFormState} currentStage={currentStage} noUseFoods={noUseFoods} />
                <button className={`${montserrat.className} buttonAppearance`}>Next</button>
            </Form>
        </section>
    );
}