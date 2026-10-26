"use client";
import Form from "next/form";
import { useState, useEffect } from "react";
import "../app/globals.css";
import { Montserrat } from "next/font/google";
import {meals, foods} from "../data.js";
import MealDisplay from "./MealDisplay.js";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

const stages = [<h2 style={{
                marginTop: "0"
            }}>Select all the ingredients you <span className="red">hate</span>.</h2>, <h2 style={{
                marginTop: "0"
            }}>Select all the ingredients that you <span className="greenText">DO</span> have.</h2>, <h2 style={{
                marginTop: "0"
            }}>How much time do you have for prep?</h2>, <h1 style={{
                marginTop: "0",
                fontSize: "1.8em"
            }}>Recommended Meals:</h1>];
let inputList = [];
let tempFormState;
let noOptionsNotes = ["Tough crowd! I've got nothing for you.", "I couldn't find anything that fits the constraints.", "... Bruh. OK, I really don't know at this point.", "Figure it out yourself, if you're going to be so picky!", "My meal ideas must not be comprehensive enough for you, huh?", "You hate so many foods. Or do you not have them? Or is this because of time?", "What should you eat?! The answer: I don't know.", " ... Sigh. The constraints are just too much for me.", "I hate to break it to you, but ... I don't know.", "Be a little less picky and try again."];

function InputList({ formState, updateFormState, currentStage, noUseFoods }) {
    inputList = [];
    tempFormState = formState.slice();
    
    for (let i = 0; i < foods.length; i++) {
        inputList.push(<div key={i} id={`input-div-${foods[i]}`} style={{
            margin: "10px",
            display: (currentStage == 1 && noUseFoods[i]) || (currentStage > 1) ? "none" : "flex",
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
    const [availableTime, updateAvailableTime] = useState(null);
    const [chosenNote, updateChosenNote] = useState("");

    useEffect(() => {
        if (ownedFoods && noUseFoods && availableTime) {
            let tempAcceptableMeals = [];
            Object.keys(meals).forEach((meal) => {
                for (let i of meals[meal][0]) {
                    if (noUseFoods.includes(i)) {
                        return;
                    }
                    if (! (ownedFoods.includes(i))) {
                        return;
                    }
                }
                if (meals[meal][1] > availableTime) {
                    return;
                }
                tempAcceptableMeals.push(meal);
            });
            updateAcceptableMeals(tempAcceptableMeals);
        }
    }, [ownedFoods, noUseFoods, availableTime]);

    function mySubmitForm(e) {
        e.preventDefault();
        window.scrollTo(0, 0);

        if (currentStage === 0) {
            updateNoUseFoods(formState.map((i, n) => {if (i) { return foods[n]; } }));
        } else if (currentStage === 1) {
            updateOwnedFoods(formState.map((i, n) => {if (i) { return foods[n]; } }));
        } else if (currentStage === 2) {
            let formData = new FormData(e.target);
            updateAvailableTime(formData.get("time"));
            updateChosenNote(noOptionsNotes[Date.now() % noOptionsNotes.length]);
        }

        updateFormState(foods.map(() => false));
        updateCurrentStage(currentStage + 1);
    }

    
    return (
        <section style={{
            border: "1.5px solid #070C33",
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
                display: currentStage > 2 ? "block" : "none"
            }}>
                {acceptableMeals.length == 0 ? <p style={{
                    textAlign: "center",
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>{chosenNote}</p> : <MealDisplay displayMeals={acceptableMeals} />}
            </div>
            <Form onSubmit={mySubmitForm} style={{
                marginLeft: "10%",
                display: currentStage < 3 ? "block" : "none"
            }}>
                <InputList formState={formState} updateFormState={updateFormState} currentStage={currentStage} noUseFoods={noUseFoods} />
                <input type="number" style={{
                    display: currentStage == 2 ? "block" : "none"
                }} name="time" />
                <button className={`${montserrat.className} buttonAppearance`}>Next</button>
            </Form>
        </section>
    );
}