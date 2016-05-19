import React from "react";
import { render } from "react-dom";
import moment from "moment";
import layout from "../layout.css";
import styles from "./form.css";
import stylesheet from "../styles.css";
import Field from "./Field.jsx";
import FormActions from "./core/actions";
import _ from "lodash";
import { licenceSpelling } from "./core/utils";
class LicenceInput extends React.Component {
  static propTypes = {
    licence: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    errors: React.PropTypes.object
  }

  static defaultProps = {
    index: 0
  }

  constructor(props) {
    super(props);
  }

  render() {
    let nameSchema = {
      name: "displayName",
      type: "text",
      label: licenceSpelling(" or qualification type"),
      required: true
    };

    let schema = [
      {
        name: "licenceNumber",
        type: "text",
        label: "ID Number",
        required: true
      },
      {
        name: "classification",
        type: "text",
        label: "Classification"
      },
      {
        name: "jurisdiction",
        type: "text",
        label: "Jurisdiction",
        showFor: {
          country: "United States"
        }
      },
      {
        name: "endorsements",
        type: "text",
        label: "Endorsements",
        showFor: {
          country: "United States"
        }
      },
      {
        name: "restrictions",
        type: "text",
        label: "Restrictions",
        showFor: {
          country: "United States"
        }
      },
      {
        name: "expiry",
        type: "date",
        label: "Expiry"
      }
    ];

    let index = this.props.index;
    let removeLicenceIcon = () => {
      return (
        <div className = {styles.column}>
            <button
              type="button"
              className={styles["remove-licence"] + " " + stylesheet.secondary + " " + stylesheet.button}
              onClick = {() => {
                FormActions.deleteLicenceForm(this.props.index);
              }
              }>
                <i className="material-icons">delete</i>
            </button>
        </div>
      );
    };

    const fieldError = (field, i) => {
      try {
        const name = `!_${i}_${field.name}`;
        return this.props.errors.fieldErrorMessages[name][0].value;
      } catch (e) {
        return null;
      }
    };

    return (
      <div className = {styles["licence-input"]}>

        <div className={styles.row}>
          <Field
            data={this.props.licence[nameSchema.name]}
            field={nameSchema} index={this.props.index}
            fieldError={fieldError(nameSchema, this.props.index)}
          />
          { schema.map((field, i) => {
            return (
              <Field
                data={this.props.licence[field.name]}
                field={field}
                index={this.props.index}
                key={i}
                fieldError={fieldError(field, this.props.index)}
              />
            );
          }) }
        {removeLicenceIcon()}
        </div>
      </div>
    );
  }
}

export default LicenceInput;
