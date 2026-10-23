import { Montserrat } from "next/font/google";
import "./globals.css";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

const metadata = {
  title: "My Breakfast",
  description: "Get breakfast suggestions, accounting for what you hate and what you don't have.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <h1 style={{
        fontSize: "3em"
      }}>My Breakfast</h1>
        {children}
      </body>
    </html>
  );
}
