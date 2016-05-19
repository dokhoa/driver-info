import React from "react";
import { render } from "react-dom";
import styles from "./form.css";
import Field from "./Field.jsx";
import _ from "lodash";
import FormActions from "./core/actions";
import Store from "./core/store";

class ToggleField extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    field: React.PropTypes.object.isRequired,
    fieldError: React.PropTypes.string
  }

  state = {
    display_data: {},
    temp_value: _.isString(Store.getDriverForm().driverId) ? Store.getDriverForm().driverId : ""
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let displayData = {};
    const key = `!_${this.props.field.name}`;
    displayData[key] = _.isString(Store.getDriverForm().driverId);
    this.setState({
      display_data: displayData
    });
  }

  render() {
    let field = this.props.field;
    let displayId = `!_${field.name}`;

    const _onChange = (e) => {
      if (e.target.id === displayId && e.target.type === "checkbox") {
        if (e.target.checked) {
          FormActions.editDriverForm(field.name, this.state.temp_value);
        } else {
          FormActions.editDriverForm(field.name, null);
          FormActions.deleteFieldError(field.name);
        }
      }
      if (e.target.id === field.name) {
        this.setState({
          temp_value: e.target.value
        });
      }
    };
    let displayDataSchema =
      {
        name: displayId,
        type: "switch",
        label: field.display_label,
        showFor: field.showFor
      };
    return (
      <div className={styles.row} onChange={_onChange}>
        <Field data={this.state.display_data[displayDataSchema.name]} field={displayDataSchema} />
        { [ field ].map((f, i) => {
          if (_.isString(Store.getDriverForm().driverId)) {
            return (
              <Field data={this.props.data[f.name]} field={f} key={i} fieldError={this.props.fieldError}/>
            );
          }
          return null;
        }) }
      </div>
    );
  }
}

export default ToggleField;
