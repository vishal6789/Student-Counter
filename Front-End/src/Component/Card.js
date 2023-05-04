import React from "react";
import "../Component/Card.css";
import { NavLink } from "react-router-dom";
import { classroom } from "../data";

const Card = (props) => {
  return (
    <div className="Card">
      <div className="Count">
        <h2 className="ClassName">Class: {props.classroom}</h2>
        <h2 className="Count">Count: {props.count}</h2>
      </div>
      <div className="btn">
        <button className="button">Refresh</button>
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
