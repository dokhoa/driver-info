import React from "react";
import { render } from "react-dom";
import moment from "moment";
import layout from "../layout.css";

class Form extends React.Component {
  static propTypes = {
    _setDataField: React.PropTypes.func.isRequired,
    _onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.array.isRequired,
    className: React.PropTypes.string,
    id: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e) {
    let { name, value } = e.target;
    if (name && name.charAt(0) !== "!") {
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
      this.props._setDataField(name, value);
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props._onSubmit(e);
  }

  render() {
    return (
      <form
        id={this.props.id}
        onChange = {this._onChange}
        onSubmit = {this._onSubmit}
        className = {this.props.className}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
