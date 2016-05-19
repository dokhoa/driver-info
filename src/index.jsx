import React from "react";
import { render } from "react-dom";
import _YourComponent from "./components/_YourComponent/_YourComponent.jsx";
import Authenticate from "./components/Authenticate/authenticate.jsx";
import Header from "./components/header/header.jsx";
import layout from "./components/layout.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className={layout.wrapper}>
        <Header />
        <Authenticate />
      </div>
    );
  }
}
export default App;

render(<App/>, document.getElementById("app"));
