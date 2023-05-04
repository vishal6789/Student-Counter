import React, { useEffect, useState } from "react";
import "../Component/Card.css";
import { NavLink } from "react-router-dom";
import { classroom } from "../data";
import axios from "axios"

const Card = (props) => {
  const [count, setCount] = useState(0)
  const [load, setLoad] = useState(false)
  const fetchcount = async () => {
    setLoad(true)
    await axios.get("http://192.168.29.59:3001/getCount/4").then((response) => {
      setLoad(false)
      console.log(response.data)
      setCount(response.data.count)
    })
  }

  useEffect(() => {
    setCount(props.count)
  }, [props.count])
  return (
    <div className="Card">
      <div className="Count">
        <h2 className="ClassName">Class: {props.class}</h2>
        <h2 className="Count">Count: {count}</h2>
      </div>
      {load &&
        <div style={{ top: "0px", left: "0px", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", width: "100%", height: "100vh", backgroundColor: "#808080a8" }}>
          <p style={{ fontSize: "3rem" }}>Processing...</p>
        </div>}
      <div className="btn">
        <button className="button" onClick={fetchcount}>Refresh</button>
        <button className="button">
          <NavLink className="link" to="/insight">
            View Insight
          </NavLink>
        </button>
      </div>
    </div>
  );
};
export default Card;
