import React from "react";
import "./Footer.css";
import GitHubLogo from "../images/github-logo.png";
function Footer() {
  const date = new Date();
  return (
    <footer>
      <div className="copyright">Copyright © {date.getFullYear()}
      <br/>
     This project is part of the CHECK24 GenDev Holiday Challenge
     </div>
      <div className="links">
        <a href="https://github.com/riggggo/project"><img src={GitHubLogo} alt="Github Logo" className="github-logo"></img></a>
      </div>
      
    </footer>
  );
}

export default Footer;