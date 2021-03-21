import React from "react";
import Jumbotron from "typewriter-effect";

const Jumbotron = ({ text }) => (
  <TypeWriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
