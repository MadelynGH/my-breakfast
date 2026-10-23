"use client";
import Form from "next/form";
import {state, useState } from "react";
import { montserrat } from "../layout.js";

const stages = [<h2 style={{
                marginTop: "0"
            }}>Select all the ingredients you <span className="red">hate</span>.</h2>, <h2>Select all the ingredients that you DO <span className="greenTedt">have</span>.</h2>];
const foods = ["Eggs", "Milk", "Cheddar Cheese", "Pepper Jack Cheese", "American Cheese", "Almonds", "Peanuts", "Cashews", "Walnuts", "Strawberries"];
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
    const [info, updateInfo] = useState([]);
    const [formState, updateFormState] = useState(foods.map(() => false));

    function addInfo(stageInfo) {
        info.push(stageInfo);
        updateInfo(info);
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
            <Form action={addInfo} style={{
                marginLeft: "10%"
            }}>
                <InputList formState={formState} updateFormState={updateFormState} />
            </Form>
            <button className={`${buttonAppearance} buttonAppearance`}>Next</button>
        </section>
    );
}