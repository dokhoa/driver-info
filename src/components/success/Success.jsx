import React from "react";
import { render } from "react-dom";
import styles from "./success.css";

class Success extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Thank You!</h1>
        <p>Your details have now been updated</p>
      </div>
    );
  }
}
export default Success;

