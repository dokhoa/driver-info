import React from "react";
import { render } from "react-dom";
import styles from "./header.css";
import layout from "../layout.css";
import Actions from "../../core/actions.js";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  
  render() {
    return (
      <div className={styles.header}>
          <a href="https://devdepot.eroad.com/">
                  <img src="header_logo.png" className={styles.eroadLogoLoginImage} width="50" alt="EROAD"></img>
              </a>
      </div>
    );
  }
}
export default Header;
