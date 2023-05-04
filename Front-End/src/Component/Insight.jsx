import React from "react";
import NaughtyVishal from "../Image/NaughtyVishal.jpg";
import Navbar from "./Navbar";
const Insight = () => {
  return (
    <>
      <Navbar />
      <img
        src={NaughtyVishal}
        alt=""
        srcset=""
        style={{ height: "30%", width: "30%" }}
      />
      <h1>KAAM WAAM TOH HOTA RHEGA PEHLE LADKIBAAZI KARLU THODA</h1>
    </>
  );
};
export default Insight;
