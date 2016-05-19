import React from "react";
import { render } from "react-dom";
import layout from "../layout.css";
import Actions from "../../core/actions.js";
import Store from "../../core/store.js";
import Authenticate from "../Authenticate/authenticate.jsx";



class TokenValidation extends React.Component {

  constructor(props) {
    super(props);    
  }

  verifyToken(token) {    
    Actions.verify(Store.getDriverId(), token).then(response => {
        console.log(response);
    });
  }
  submitMobileNumber(mobileNumber) {
    Actions.getDriverId(mobileNumber).then(response => {
        window.location.href = '#/verify';
    });
  }

  render() {
    return (
      <Authenticate title="Please input Your Mobile Number" placeHolder="Mobile Number" action={this.submitMobileNumber}/>
    );
  }
}
export default TokenValidation;
