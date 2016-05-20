import React from "react";
import { render } from "react-dom";
import { renderComponent } from "./core/utils";
import moment from "moment";
import Datepicker from "../modal/Datepicker.jsx";
import layout from "../layout.css";
import styles from "./form.css";
import FormActions from "./core/actions";
import _ from "lodash";
import FieldError from "./FieldError.jsx";

class Field extends React.Component {
  static propTypes = {
    data: React.PropTypes.any,
    field: React.PropTypes.object.isRequired,
    index: React.PropTypes.number,
    fieldError: React.PropTypes.any
  }

  constructor(props) {
    super(props);
    this._onFocus = this._onFocus.bind(this);
    this._onDateSelect = this._onDateSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const key = this.props.field.name;
    if (this.props.data !== nextProps.data) {
      return true;
    }
    if (this.props.fieldError !== nextProps.fieldError) {
      return true;
    }
    return false;
  }

  _onDateSelect(field, payload) {
    document.getElementById(`!_${this.props.index}_${field.name}`).value = moment(payload).format("DD MMMM YYYY");
    FormActions.editLicenceForm(this.props.index, field.name, payload);
  }

  _onFocus(field) {
    if (field.type === "date") {
      let defaultDate = moment().toISOString();
      if (this.props.data) {
        defaultDate = this.props.data;
      }
      renderComponent(
        <Datepicker field={field} defaultDate={defaultDate} _onSelect={this._onDateSelect}/>,
        "datepicker"
      );
    }
  }

  render() {
    const classNames = (base, field) => {
      if (field.required) {
        base += ` ${styles.required}`;
      }
      if (this.props.data && this.props.data.length) {
        base += ` ${styles.used}`;
      }
      return base;
    };

    const inputType = (type) => {
      switch (type) {
      case "switch":
        return "checkbox";
      default:
        return "text";
      }
    };

    const inputClassName = (type) => {
      let className = "input-";
      let component;
      switch (type) {
      case "date":
        component = "text";
        break;
      default:
        component = type;
      }
      return styles[className + component];
    };

    let field = this.props.field;

    if (field.showFor && field.showFor.country) {
      if (field.showFor.country !== "New Zealand") {
        return null;
      }
    }

    let name = field.name;
    if (this.props.index !== undefined) {
      name = "!_" + this.props.index + "_" + field.name;
    }

    let defaultValue = this.props.data;
    if (field.type === "date" && defaultValue) {
      defaultValue = moment(defaultValue).format("DD MMMM YYYY");
    }
    let props = {
      id: name,
      className: inputClassName(field.type),
      type: inputType(field.type),
      name: name,
      onFocus: this._onFocus.bind(null, field),
      value: defaultValue,
      defaultChecked: this.props.data,
      required: field.required
    };
    _.extend(props, this.props.field.inputProps);
    let modifiedField = _.cloneDeep(this.props.field);
    modifiedField.name = name;
    return (
      <div className = {classNames(styles.field, field)}>
        <FieldError data={this.props.data} field={modifiedField} fieldError={this.props.fieldError} />
        <input
          {...props}
        />
        <label htmlFor = {name}>{field.label}</label>
        <span className = {styles.bar} />
      </div>
    );
  }
}

export default Field;
