import React from "react";
import { render } from "react-dom";
import styles from "./authenticate.css";
import layout from "../layout.css";
import Actions from "../../core/actions.js";

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.container}>
          <div id="alertsListWrapper">
          </div>
          <div id="wrapper">
              <div className={styles.content}>
                  <div className={styles.loginPanel}>
                      <h2>Please input your mobile number</h2>
                      <form method="post" id="authenticateForm" action="">
                          <ul className={styles.loginInstruction}>
                              <li>
                                  <input type="text" placeholder="Mobile Number" name="mobile" id="mobile" size="10" value=""/>
                              </li>
                                  <li className={styles.loginButtonContainer}><input id="submitButton" name="submit" className={styles.loginbutton} type="submit" value="SUBMIT" /></li>
                              </ul>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
export default Authenticate;
