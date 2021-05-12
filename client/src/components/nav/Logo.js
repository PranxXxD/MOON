import React from 'react'
import MoonLogo from "./MoonLogo1.png"
import "./Logo.scss";
function Logo() {
    // Import result is the URL of your image
    return <img className="logo" src={MoonLogo} alt="Logo" />;
  }
  
  export default Logo;