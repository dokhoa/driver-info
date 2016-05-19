import React from "react";
import { render } from "react-dom";
import _YourComponent from "./components/_YourComponent/_YourComponent.jsx";
import Authenticate from "./components/Authenticate/authenticate.jsx";
import Header from "./components/header/header.jsx";
import layout from "./components/layout.css";
import DriverForm from "./components/forms/DriverForm.jsx";
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
        <Authenticate />
        <DriverForm data={Store.getDriver()} _unmountSelf={() => {}} />
      </div>
    );
  }
}
export default App;

render(<App/>, document.getElementById("app"));
