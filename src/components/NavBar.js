import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav">
      <ul>
        <Link to={`/`}>
          <li id="listCom">Home</li>
        </Link>
        <a id="listCom" href="https://www.youtube.com/watch?v=WIrWyr3HgXI">
          Are you silly?
        </a>
      </ul>
    </div>
  );
};

export default NavBar;
