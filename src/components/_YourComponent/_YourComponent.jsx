import React from "react";
import { render } from "react-dom";
import layout from "../layout.css";
import styles from "./_yourcomponent.css";
import Actions from "../../core/actions.js";

class _YourComponent extends React.Component {
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
      <div className={layout.item}>
        <span className={styles.hey}>Hey</span>
      </div>
    );
  }
}
export default _YourComponent;
