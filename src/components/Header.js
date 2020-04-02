import React from "react";

const Header = () => {
  return (
    <div class="ui small blue menu" style={{ backgroundColor: "#337ab7"}}>
      <a class="active item" style={{ color: "white"}}> Logo here</a> <a class="item" style={{ color: "white"}}>WYNDD HOME</a>
      <a class="item" style={{ color: "white"}}>FIND DATA & INFO </a>
      <a class="item" style={{ color: "white"}}>COLLECT & SUBMIT DATA </a>
      <a class="item" style={{ color: "white"}}>ABOUT</a>
      <div class="right menu">
        <div class="item">
          <div class="ui secondary basic button"> Feedback </div>
        </div>
        <div class="item">
          <div class="ui basic button"  style={{ color: "black"}}> Sign Up </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
