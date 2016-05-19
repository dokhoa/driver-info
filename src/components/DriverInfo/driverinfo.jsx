import React from "react";
import { render } from "react-dom";
import layout from "../layout.css";
import Actions from "../../core/actions.js";
import Store from "../../core/store.js";
import DriverForm from "../forms/DriverForm.jsx";



class DriverInfo extends React.Component {


  render() {
    return (
      <DriverForm data={Store.getDriver()} _unmountSelf={() => {}} />
    );
  }
}
export default DriverInfo;
