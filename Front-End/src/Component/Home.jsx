import { useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

function Home() {
  const [classescount, setClassesCount] = useState([{ class: "1", count: "0" }, { class: "2", count: "0" }, { class: "3", count: "0" }, { class: "4", count: "0" }])
  return (
    <div>
      <Navbar updateCount={(data) => setClassesCount(data)} />
      <div
        className="App"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card {...classescount[0]} />
        <Card {...classescount[1]} />
        <Card {...classescount[2]} />
        <Card {...classescount[3]} />
      </div>
    </div>
  );
}

export default Home;
