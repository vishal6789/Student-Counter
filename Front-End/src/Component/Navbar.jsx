import React, { useState } from "react";
import Logo from "../Image/Logo.jpg";
import "../Component/Card.css";
import axios from "axios";
const Navbar = ({ updateCount }) => {
  const [load, setLoad] = useState(false)
  const fetchallclasscount = async () => {
    setLoad(true)
    await axios.get("http://192.168.29.59:3001/getCounts/all").then((response) => {
      setLoad(false)
      updateCount(response.data)
    })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="Navbar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {load &&
          <div style={{ top: "0px", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", width: "100%", height: "100vh", backgroundColor: "#808080a8" }}>
            <p style={{ fontSize: "3rem" }}>Processing...</p>
          </div>}
        <img
          className="Logo"
          style={{ width: "16%", height: "16%" }}
          src={Logo}
          alt="Logo"
          srcset=""
        />
        <p className="CollegeName">
          Shri Shankaracharya Institute of Professional Management and
          Technology
        </p>
      </div>
      <button className="button" onClick={fetchallclasscount} style={{}}>
        Refresh All
      </button>
    </div>
  );
};

export default Navbar;
