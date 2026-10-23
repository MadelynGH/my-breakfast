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
      }}>A tool to help you decide what to eat for breakfast, taking into account what you <span className="red">hate</span> and what you <span className="red">don't have.</span></h2>
      <Link className={`${montserrat.className} buttonAppearance`} href="/tool">Let's Get Started!</Link>
    </div>
  );
};