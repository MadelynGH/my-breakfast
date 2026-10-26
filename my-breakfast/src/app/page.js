import { montserrat } from "./layout.js";
import Link from "next/link";

export default function Page() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h2 style={{
        width: "50vw"
      }}>A tool to help you decide what to eat for breakfast, taking into account what you <span className="red">hate</span>, what you <span className="greenText">actually have</span>, and how much time you have to prep.</h2>
      <Link className={`${montserrat.className} buttonAppearance`} href="/tool">Let's Get Started!</Link>
      <Link className={`${montserrat.className}`} href="/meals" style={{
        color: "#070C33",
        margin: "40px",
        fontSize: "1.3em"
      }}>View Non-Personalized Meal List</Link>
    </div>
  );
};