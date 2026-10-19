import { montserrat } from "./layout.js";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{
        fontSize: "3em"
      }}>My Breakfast</h1>
      <h2>A tool to help you decide what to eat for breakfast, taking into account what you <span className="red">hate</span> and what you <span className="red">don't have.</span></h2>
      <button style={{
        backgroundColor: "#74C758",
        marginTop: "20px"
      }} className={montserrat.className}>Let's Get Started!</button>
    </div>
  );
};