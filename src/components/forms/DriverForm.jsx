import React from "react";
import { render } from "react-dom";
import styles from "./form.css";
import DriverFormContainer from "./DriverFormContainer.jsx";
import Actions from "../../core/actions";
import Store from "../../core/store";

class DriverForm extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    _unmountSelf: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    data: {},
    _unmountSelf: null
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className = {styles["driver-form-wrapper"]}>
          <DriverFormContainer {...this.props}
            _updateDriver={Actions.updateDriver.bind(null, Store.getDriverId())}
            licences={[]}
          />
        </div>
    );
  }
}

export default DriverForm;
