import React from "react";
import { render } from "react-dom";
import layout from "../layout.css";
import Actions from "../../core/actions.js";
import Store from "../../core/store.js";
import Authenticate from "../Authenticate/authenticate.jsx";

class TokenValidation extends React.Component {
  state = {
    errors: ""
  }

  constructor(props) {
    super(props);
    this.getParameterFromUrl = this.getParameterFromUrl.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  verifyToken(token) {
    let driverId = Store.getDriverId();

    if (!driverId) {
      driverId = this.getParameterFromUrl("t");
      Actions.setDriverId(driverId);
    }
    Actions.verify(driverId, Number(token)).then(response => {
      console.log(response);
      if (response.success) {
        Actions.getDriver(driverId).then(resp => {
          window.location.href = '#/driver';
        });
      } else {
        this.setState({
          errors: response.message
        });
      }
    });
  }

  getParameterFromUrl(paramName) {
    var url = window.location.href;
    var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    var value = decodeURIComponent(results[2].replace(/\+/g, " "));
    return value
  }
  render() {
    return (
      <Authenticate title="Please input token" placeHolder="Token Number" action={this.verifyToken} errors={this.state.errors} />
    );
  }
}
export default TokenValidation;
