import React from "react";
import { render } from "react-dom";
import { renderComponent } from "../../utils";
import styles from "./alert.css";
import stylesheet from "../styles.css";
import Actions from "../../actions";

class Alert extends React.Component {
  static propTypes = {
    message: React.PropTypes.string.isRequired,
    _unmountSelf: React.PropTypes.func,
    _confirmAction: React.PropTypes.func,
    confirm: React.PropTypes.string
  }

  static defaultProps = {
    message: "",
    _unmountSelf: null,
    _confirmAction: null,
    confirm: "Confirm"
  }

  constructor(props) {
    super(props);

    this._onConfirmClick = this._onConfirmClick.bind(this);
  }

  _onConfirmClick() {
    if (this.props._confirmAction) {
      this.props._confirmAction();
    }
    this.props._unmountSelf();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.message}>
          <p>{this.props.message}</p>
        </div>
        <div className={styles.actions}>
          <button
            className={`${stylesheet.button} ${stylesheet.secondary}`}
            type="button" onClick={this.props._unmountSelf}>Cancel
          </button>
          <button
            className={stylesheet.button}
            type="button" onClick={this._onConfirmClick}>{this.props.confirm}
          </button>
        </div>
      </div>
    );
  }
}

export default Alert;
