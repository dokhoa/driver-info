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
    this.submitMobileNumber = this.submitMobileNumber.bind(this);
  }

  submitMobileNumber(mobileNumber) {
    Actions.getDriverId(mobileNumber).then(response => {
      if (response !== "not found") {
        window.location.href = "#/verify";
      } else {
        this.setState({
          errors: "Not found"
        });
      }
    });
  }

  render() {
    return (
      <Authenticate title="Please input Your Mobile Number" placeHolder="Mobile Number" action={this.submitMobileNumber} errors={this.state.errors} />
    );
  }
}
export default TokenValidation;
