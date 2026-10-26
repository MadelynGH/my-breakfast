import Link from "next/link";

export default function BackButton() {
    return (
        <Link href="/" style={{
            position: "absolute",
            left: "20px",
            top: "20px",
            margin: "0",
            fontSize: "1.8em",
            textDecoration: "none",
            color: "#070C33"
        }} id="backButton">←</Link>
    );
}