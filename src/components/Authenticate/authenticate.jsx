import React from "react";
import { render } from "react-dom";
import styles from "./authenticate.css";
import layout from "../layout.css";
import Actions from "../../core/actions.js";
import Store from "../../core/store.js";

class Authenticate extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    errors: React.PropTypes.string.isRequired,
    placeHolder: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired,
    submitText: React.PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.changeInputValue = this.changeInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeInputValue(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit(e) {
    const inputValue = this.state.inputValue;
    this.props.action(inputValue);
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
                              <input type="text" placeholder={this.props.placeHolder} name="mobile" id="mobile" size="10" value={this.state.inputValue} onChange={this.changeInputValue} />
                          </li>
                              <li className={styles.loginButtonContainer}><input id="submitButton" className={styles.loginbutton} value={this.props.submitText} readOnly onClick={this.handleSubmit}/></li>
                          </ul>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
export default Authenticate;
