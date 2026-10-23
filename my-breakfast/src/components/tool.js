"use client";
import Form from "next/form";
import { useState, useEffect } from "react";
import { montserrat } from "../app/layout.js";
import "../app/globals.css";

const stages = [<h2 style={{
                marginTop: "0"
            }}>Select all the ingredients you <span className="red">hate</span>.</h2>, <h2>Select all the ingredients that you <span className="greenText">DO</span> have.</h2>];
const foods = ["Eggs", "Milk", "Cheddar Cheese", "Pepper Jack Cheese", "American Cheese", "Almonds", "Peanuts", "Cashews", "Walnuts", "Strawberries", "Flour", "Sugar", "Yogurt"];
const meals = {
    "Scrambled Eggs": ["Eggs"],
    "Pancakes": ["Eggs", "Milk", "Flour", "Sugar"],
    "Cheddar Omelete": ["Eggs", "Cheddar Cheese"]
};
let inputList = [];
let tempFormState;

function InputList({ formState, updateFormState }) {
    inputList = [];
    tempFormState = formState.slice();

    for (let i = 0; i < foods.length; i++) {
        inputList.push(<div key={i} style={{
            margin: "10px"
        }}><input type="checkbox" checked={formState[i]} onChange={(e) => {tempFormState[i]=e.target.checked; updateFormState(tempFormState);}} name={foods[i]} id={foods[i]} />
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
    const [test, updateTest] = useState("hi");

    useEffect(() => {
        if (ownedFoods && noUseFoods) {
            updateAcceptableMeals(Object.keys(meals).map((meal) => {
                for (let i of meals[meal]) {
                    if (noUseFoods.includes(i)) {
                        console.log("exited via noUse");
                        return;
                    }
                    if (! (ownedFoods.includes(i))) {
                        console.log("exited via ownedFoods", i);
                        return;
                    }
                }
                return meal;
            }));
            console.log(acceptableMeals);
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
            <h2>{acceptableMeals}</h2>
            <Form action={mySubmitForm} style={{
                marginLeft: "10%",
                display: currentStage < 2 ? "block" : "none"
            }}>
                <InputList formState={formState} updateFormState={updateFormState} />
                <button className={`${montserrat.className} buttonAppearance`}>Next</button>
            </Form>
        </section>
    );
}