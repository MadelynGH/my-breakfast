import { meals } from "../../data.js";
import BackButton from "../../_components/BackButton.js";

export default function Page() {
    return (
        <>
            <BackButton />
            <section style={{
                width: "50vw",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "15px",
                paddingBottom: "5vh",
                paddingTop: "5vh"
            }}>
                <h2>Meal Ideas</h2>
                <ul>{Object.keys(meals).map(meal => <li key={meal} style={{fontSize: "1.2em"}}><b>{meal}</b> ({meals[meal][0].map((i,n) => n < (meals[meal][0].length - 1) ? `${i}, ` : i)}) - {meals[meal][1]} minutes</li>)}</ul>
            </section>
        </>
    );
}