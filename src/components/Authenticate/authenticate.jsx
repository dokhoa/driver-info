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
    Actions.get().then((payload) => {
      console.log("Do things with the data you got");
    }).fail((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <div id="container">
          <div id="alertsListWrapper">
          </div>
          <div id="wrapper">
              <div id="content">
                  <div id="loginPanel" className={styles.logp}>
                      <h2>Please input your mobile number</h2>
                      <form method="post" id="authenticateForm" action="">
                          <ul className={styles.loginInstruction}>
                              <li>
                                  <input type="text" placeholder="Mobile Number" name="mobile" id="mobile" size="10" value=""/>
                              </li>
                                  <li className={styles.loginButtonContainer}><input id="submitButton" name="submit" className={styles.button} type="submit" value="SUBMIT" /></li>
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
