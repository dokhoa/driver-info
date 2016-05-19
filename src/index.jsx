import React from "react";
import { render } from "react-dom";
import _YourComponent from "./components/_YourComponent/_YourComponent.jsx";
import MobileInput from "./components/MobileInput/mobileinput.jsx";
import TokenValidation from "./components/TokenValidation/tokenvalidation.jsx";
import DriverInfo from "./components/DriverInfo/driverinfo.jsx";
import Success from "./components/success/Success.jsx";
import Header from "./components/header/header.jsx";
import layout from "./components/layout.css";
import DriverForm from "./components/forms/DriverForm.jsx";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Actions from "./core/actions";
import Store from "./core/store";

class App extends React.Component {
  constructor(props) {
    super();    
  }  
  
  render() {
    return (

      <div className={layout.wrapper}>
      <Header />
      
        {this.props.children}
        
      </div>
      
    );
  }
}
export default App;

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MobileInput}></IndexRoute>
      <Route path="verify" component={TokenValidation}></Route>
      <Route path="verify/:t" component={TokenValidation}></Route>
      <Route path="driver" component={DriverInfo}></Route>
      <Route path="success" component={Success}></Route>
    </Route>
    

  </Router>, document.getElementById("app"));
