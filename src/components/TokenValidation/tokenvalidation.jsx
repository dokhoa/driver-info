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
    driverId = Store.getDriverId();
    if(driverId == null || driverId === undefined) {
      driverId = getParameterFromUrl(driverId);
    }
    Actions.verify(driverId, token).then(response => {
        console.log(response);
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
      <Authenticate title="Please input token" placeHolder="Token Number" action={this.verifyToken}/>
    );
  }
}
export default TokenValidation;
