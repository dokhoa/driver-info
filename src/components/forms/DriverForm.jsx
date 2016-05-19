import React from "react";
import { render } from "react-dom";
import styles from "./form.css";
import DriverFormContainer from "./DriverFormContainer.jsx";
import Actions from "../../core/actions";
import Store from "../../core/store";

class DriverForm extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    _unmountSelf: React.PropTypes.func
  }

  static defaultProps = {
    data: {},
    _unmountSelf: null
  }

  state = {
  }

  constructor(props) {
    super(props);
    // this._unmountSelf = this._unmountSelf.bind(this);
  }

  render() {
    return (
        <div className = {styles["driver-form-wrapper"]}>
          <DriverFormContainer {...this.props}
            _addDriver={Actions.addDriver}
            _updateDriver={Actions.updateDriver}
            licences={[]}
          />
        </div>
    );
  }
}

export default DriverForm;
