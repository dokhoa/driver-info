import React from "react";
import { unmountComponentAtNode, findDOMNode } from "react-dom";

import styles from "../styles.css";
import { dispatch } from "../../core/utils";
import _ from "lodash";
import moment from "moment";

class Datepicker extends React.Component {
  static propTypes = {
    field: React.PropTypes.object,
    defaultDate: React.PropTypes.string,
    _onSelect: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this._unmountSelf = this._unmountSelf.bind(this);
  }

  componentWillMount() {
    document.getElementsByTagName("body")[0].classList.add(styles.noscroll);
  }

  componentDidMount() {
    dispatch(document, null, null, "render");
    const input = document.getElementById("datepicker-el-input");
    const datePickerEl = document.getElementById("datepicker-el");
    const datePickerHandler = (e) => {
      switch (e.detail.action) {
      case "BLUR":
        return this._unmountSelf();
      case "DATE_SELECTED":
        const date = JSON.parse(e.detail.payload).date;
        return this.props._onSelect(this.props.field, date);
      default:
        return false;
      }
    };

    input.style.display = "none";
    input.click();
    datePickerEl.addEventListener("event", datePickerHandler);
  }

  _unmountSelf() {
    const node = findDOMNode(this).parentNode;
    unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
    document.getElementsByTagName("body")[0].classList.remove(styles.noscroll);
  }

  render() {
    return (
      <react-datepicker
        id="datepicker-el"
        data-close-on-select="true"
        data-selected-date={this.props.defaultDate}>
      </react-datepicker>
    );
  }
}

export default Datepicker;
