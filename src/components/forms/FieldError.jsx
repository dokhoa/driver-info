import React from "react";
import { render } from "react-dom";
import styles from "./form.css";
import Store from "./core/store";
import FormActions from "./core/actions";
import _ from "lodash";

class FieldError extends React.Component {
  static propTypes = {
    field: React.PropTypes.object.isRequired,
    data: React.PropTypes.any,
    fieldError: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this._validate = this._validate.bind(this);
  }

  componentDidMount() {
    this._timer = 0;
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  _validate(currentP, newP) {
    if (newP.data === undefined) {
      return;
    }
    const key = this.props.field.name;
    if (currentP.data === newP.data) {
      return;
    }
    let fieldError = false;
    if (currentP.field.required) {
      if (!newP.data) {
        fieldError = `${this.props.field.label} is required`;
      }
    }
    if (currentP.field.validation) {
      if (!_.isEmpty(newP.data)) {
        if (!currentP.field.validation.regex.exec(newP.data)) {
          fieldError = currentP.field.validation.message;
        }
      }
    }
    if (!fieldError) {
      FormActions.deleteFieldError(key);
      return;
    }
    let err = { key: `errors.${key}.format`, value: fieldError };
    FormActions.setFieldError(key, [ err ]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.props.data, nextProps.data) && _.isEqual(this.props.fieldError, nextProps.fieldError)) {
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._timer = setTimeout(this._validate.bind(this, this.props, nextProps), 500);
  }

  render() {
    let fieldError = this.props.fieldError;
    if (_.isEmpty(fieldError)) {
      return null;
    }
    return (
        <div className = {styles["field-error"]}>
          <span>{fieldError}</span>
        </div>
    );
  }
}

export default FieldError;
