import React from "react";
import { render } from "react-dom";
import styles from "./authenticate.css";
import layout from "../layout.css";
import Actions from "../../core/actions.js";
import Store from "../../core/store.js";


class Authenticate extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    errors: React.PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: "",
    };
    this.changeMobileNumber = this.changeMobileNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeMobileNumber(e) {
    this.setState({mobileNumber : e.target.value});
  }

  handleSubmit(e) {
    const mobileNumber = this.state.mobileNumber;
    this.props.action(mobileNumber);    
  }
  
  render() {
    return (
      <div className={styles.container}>
          <div id="alertsListWrapper">
          </div>
          <div id="wrapper">
              <div className={styles.content}>
                  <div className={styles.loginPanel}>
                      <h2>{this.props.title}</h2>
                          {
                            this.props.errors ? (
                            <p className={styles.errors} >
                              {this.props.errors}
                            </p>
                            ) : null
                          }
                          <ul className={styles.loginInstruction}>
                          <li>
                              <input type="text" placeholder={this.props.placeHolder} name="mobile" id="mobile" size="10" value={this.state.mobileNumber} onChange={this.changeMobileNumber} />
                          </li>
                              <li className={styles.loginButtonContainer}><input id="submitButton" className={styles.loginbutton} defaultValue="SUBMIT" onClick={this.handleSubmit}/></li>
                          </ul>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
export default Authenticate;
