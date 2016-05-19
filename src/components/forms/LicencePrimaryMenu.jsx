import React from "react";
import { render } from "react-dom";
import moment from "moment";
import layout from "../layout.css";
import styles from "./form.css";
import LicenceInput from "./LicenceInput.jsx";
import _ from "lodash";
import Store from "./core/store";
import FormActions from "./core/actions";

class LicencePrimaryMenu extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    const value = e.target.value;
    let licences = Store.getLicencesForm();
    _.forEach(licences, (licence, key) => {
      if (!_.isEmpty(licence)) {
        if (_.has(licence, "licenceNumber") && licence.licenceNumber === value) {
          licence.isPrimaryLicence = true;
        } else {
          licence.isPrimaryLicence = false;
        }
      }
    });
    FormActions.setLicencesForm(licences);
  }

  render() {
    let driver = Store.getDriverForm();
    let licences = Store.getLicencesForm();
    licences = _.filter(licences, (licence) => {
      if (_.has(licence, "active") && !licence.active) {
        return false;
      }
      return true;
    });
    const classNames = (base, field) => {
      if (field.required) {
        base += ` ${styles.required}`;
      }
      if (driver[field.name] && driver[field.name].length) {
        base += ` ${styles.used}`;
      }
      return base;
    };

    const defaultValue = () => {
      if (driver.licenceNumber &&
          _.find(licences, (licence) => { return licence.licenceNumber === driver.licenceNumber;})) {
        return driver.licenceNumber;
      }
      return licences[_.keys(licences)[0]].licenceNumber;
    };

    if (licences && _.size(licences) > 1) {
      const renderLicences = _.map(licences, (licence, i) => {
        if (!_.isEmpty(licence) && (!_.has(licence, "active") || licence.active)) {
          return (
          <option
            value={licence.licenceNumber}
            key={i}>{licence.displayName ? licence.displayName : licence.licenceNumber}
          </option>
          );
        }
        return null;
      });
      return (
        <div className={styles["licence-primary-menu"]}>
          <div
            className={`${styles.field}  ${styles.required}  ${styles.used}`}
            onChange={this._onChange}>
            <select
              className={styles["input-menu"]}
              name="licenceNumber"
              value={defaultValue()}>
              { renderLicences }
            </select>
            <label htmlFor="licenceNumber">Primary Licence</label>
            <span className = {styles.bar} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default LicencePrimaryMenu;
