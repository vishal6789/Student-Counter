import React from "react";
import Logo from "../Image/Logo.jpg";
import "../Component/Card.css";
const Navbar = () => {
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
      <button className="button" style={{}}>
        Refresh All
      </button>
    </div>
  );
};

export default Navbar;
