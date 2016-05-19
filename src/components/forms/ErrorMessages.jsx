import React from "react";
import { render } from "react-dom";
import styles from "./form.css";
import Store from "./core/store";
import _ from "lodash";

class ErrorMessages extends React.Component {
  state = {
    errors: _.cloneDeep(Store.getErrors())
  }

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.state.errors, nextState.errors)) {
      return false;
    }
    return true;
  }
  _onChange() {
    this.setState({
      errors: _.cloneDeep(Store.getErrors())
    });
  }

  render() {
    let errors = this.state.errors;
    if (_.isEmpty(errors)) {
      return null;
    }

    const renderGlobalErrorMessages = () => {
      if (errors.globalErrorMessages) {
        return errors.globalErrorMessages.map((error, i) => {
          return (
            <p key={i}>{error.value}</p>
          );
        });
      }
      return null;
    };
    const parseFieldErrorMessages = () => {
      if (!errors.fieldErrorMessages) {
        return [];
      }
      let fieldErrorMessages = _.keys(errors.fieldErrorMessages);
      return _.map(fieldErrorMessages, (key, i) => {
        return {
          key: key,
          data: errors.fieldErrorMessages[key][0]
        };
      });
    };
    let fieldErrors = parseFieldErrorMessages();
    let msg = !_.isEmpty(fieldErrors) ? "Correct the following errors: " : "";
    return (
        <div className = {styles["error-messages"]}>
          { renderGlobalErrorMessages() }
          <p>{msg}</p>
          <ul>
            { fieldErrors.map((error, i) => {
              return (
                <li key={i}>{error.data.value}</li>
              );
            }) }
          </ul>
        </div>
    );
  }
}

export default ErrorMessages;
