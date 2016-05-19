import React from "react";
import { render } from "react-dom";
import layout from "../layout.css";
import Actions from "../../core/actions.js";
import Store from "../../core/store.js";
import DriverForm from "../forms/DriverForm.jsx";



class DriverInfo extends React.Component {

  goToSuccessPage() {
    window.location.href = '#/success';
  }

  render() {
    return (
      <DriverForm data={Store.getDriver()} _unmountSelf={this.goToSuccessPage} />
    );
  }
}
export default DriverInfo;
