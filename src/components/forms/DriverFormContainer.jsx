import React from "react";
import { render } from "react-dom";
import moment from "moment";
import styles from "./form.css";
import stylesheet from "../styles.css";
import Form from "./Form.jsx";
import LicenceForm from "./LicenceForm.jsx";
import Field from "./Field.jsx";
import FormActions from "./core/actions";
import Store from "./core/store";
import _ from "lodash";
import LicencePrimaryMenu from "./LicencePrimaryMenu.jsx";
import ToggleField from "./ToggleField.jsx";
import { getPrimaryLicenceIndex } from "./core/utils";
import ErrorMessages from "./ErrorMessages.jsx";
import FieldError from "./FieldError.jsx";
import metrics from "metrics";

class DriverFormContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    _unmountSelf: React.PropTypes.func,
    _addDriver: React.PropTypes.func,
    _updateDriver: React.PropTypes.func,
    licences: React.PropTypes.array
  }

  static defaultProps = {
    data: {},
    _unmountSelf: null
  }

  state = {
    driver: Store.getDriverForm(),
    licences: Store.getLicencesForm(),
    errors: Store.getErrors(),
    is_creating: false,
    is_loading: this.props.data.id
  }

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._unmountSelf = this._unmountSelf.bind(this);
    this._hasErrors = this._hasErrors.bind(this);
    this.formId = "driver-form";
  }

  componentWillMount() {
    Store.addChangeListener(this._onChange);
    let data = _.cloneDeep(this.props.data);
    let licences = {};
    if (data.licences && _.size(data.licences)) {
      _.forEach(data.licences, (licence, i) => {
        licences[i] = licence;
      });
      FormActions.setLicencesForm(licences);
      delete data.licences;
    }
    if (this.state.is_creating) {
      FormActions.createLicenceForm();
    }
    FormActions.setDriverForm(data);
    FormActions.setLicences(this.props.licences);
  }

  componentDidMount() {
    const _handleTimeout = () => {
      if (!this.state.is_loading && this.content) {
        const firstName = this.content.getElementsByTagName("input")[0];
        firstName.focus();
      }
    };
    this._timer = setTimeout(_handleTimeout, 550);
    FormActions.clearErrors();
  }

  componentWillUnmount() {
    FormActions.resetForm();
    Store.removeChangeListener(this._onChange);
    clearTimeout(this._timer);
  }

  _onChange() {
    this.setState({
      driver: Store.getDriverForm(),
      licences: Store.getLicencesForm(),
      errors: Store.getErrors(),
      is_loading: false
    });
  }

  _unmountSelf() {
    this.props._unmountSelf();
  }

  _hasErrors() {
    let errors = Store.getErrors();
    let hasErrors = false;

    const form = this.content;
    const inputs = form.getElementsByTagName("input");

    // If an input is required, set a field error
    _.forEach(inputs, (input) => {
      if (input.getAttribute("required") !== null) {
        let arr = input.name.split("_");
        if (_.head(arr) === "!") {
          arr = _.drop(arr);
          const index = parseInt(_.head(arr), 10);
          const licenceKeys = _.keys(this.state.licences);
        }
        if (!input.value) {
          const label = input.nextSibling.innerText;
          const err = { key: "errors.required", value: `${label} is required` };
          FormActions.setFieldError(input.id, [ err ]);
          hasErrors = true;
        }
      }
    });

    if (!hasErrors &&
        _.has(this.state.errors, "fieldErrorMessages") &&
        !_.isEmpty(this.state.errors.fieldErrorMessages)) {
      hasErrors = true;
    }
    return hasErrors;
  }

  _onSubmit(e) {
    const scrollTop = () => {
      if (this.content) {
        this.content.scrollTop = 0;
      }
    };

    if (this._hasErrors()) {
      scrollTop();
      return;
    }

    let driver = this.state.driver;
    let licences = _.values(this.state.licences);

    if (metrics.getFromSession("org").id) {
      driver.organisationCommonId = metrics.getFromSession("org").id;
    }

    if (licences && licences.length) {
      _.remove(licences, (n) => {
        return _.isEmpty(n);
      });

      let primaryLicence = licences[getPrimaryLicenceIndex(driver, licences)];
      if (primaryLicence) {
        primaryLicence.isPrimaryLicence = true;
        driver.licenceNumber = primaryLicence.licenceNumber;
        if (driver.licenceJurisdiction) {
          driver.licenceJurisdiction = primaryLicence.jurisdiction;
        }
      }

      driver.licences = licences;
      FormActions.setDriverForm(driver);
    }

    const parseError = payload => {
      try {
        const err = JSON.parse(payload.text).fieldErrorMessages;
        _.forEach(err, (errors, field) => {
          FormActions.setFieldError(field, errors);
        });
      } catch (err) {
        console.log(payload);
      }
    };

    if (this.state.is_creating) {
      this.props._addDriver(driver).then((payload) => {
        this._unmountSelf();
      }).fail((payload) => {
        parseError(payload);
        scrollTop();
      });
    } else {
      this.props._updateDriver(driver).then((payload) => {
        this._unmountSelf();
      }).fail((payload) => {
        parseError(payload);
        scrollTop();
      });
    }
  }

  render() {
    // Wait for form to load Store data, or else field inputs will render blank defaultValues
    if (this.state.is_loading) {
      return null;
    }
    let emailRegexPattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" +
        "(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    const emailRegex = new RegExp(emailRegexPattern);

    let row1 = [
      {
        name: "firstname",
        type: "text",
        label: "First Name",
        required: true
      },
      {
        name: "lastname",
        type: "text",
        label: "Last Name",
        required: true
      },
      {
        name: "alias",
        type: "text",
        label: "Alias",
        required: true
      }
    ];
    let row2 = [
      {
        name: "mobileNumber",
        type: "text",
        label: "Mobile Number",
        validation: {
          regex: /^[0-9+\(\)\s-]+$/,
          message: "Mobile number must only contain numbers and the following characters: +-()"
        }
      },
      {
        name: "email",
        type: "text",
        label: "Email",
        validation: {
          regex: emailRegex,
          message: "Email address is invalid"
        }
      }
    ];

    let logbookUserSchema = {
      name: "logbookUser",
      type: "switch",
      label: "Log Book User"
    };
    let logbookOptionsSchema = [
      {
        name: "pin",
        type: "text",
        label: "Pin",
        required: true,
        inputProps: {
          maxLength: "4"
        },
        validation: {
          regex: /[0-9]{4}/,
          message: "A four(4) digit numeric pin number is required"
        }
      },
      {
        name: "manualEntryDisabled",
        type: "switch",
        label: "Disable Driver Logbook Edits"
      }
    ];
    const driverIdSchema = {
      name: "driverId",
      type: "text",
      label: "Driver ID Card Number",
      display_label: "Driver ID",
      required: true,
      showFor: {
        country: "New Zealand"
      }
    };
    const fieldError = (field) => {
      try {
        return this.state.errors.fieldErrorMessages[field.name][0].value;
      } catch (e) {
        return null;
      }
    };
    const logbookChange = (e) => {
      if (e.target.id === logbookUserSchema.name && e.target.type === "checkbox") {
        if (!e.target.checked) {
          _.forEach(logbookOptionsSchema, (field) => {
            FormActions.deleteFieldError(field.name);
          });
        }
      }
    };

    return (
        <div className = {styles["driver-form-wrapper"]}>
          <div className={styles.content} ref={(ref) => {this.content = ref;}} >
            <ErrorMessages />
            <div className={styles["form-content"]}>
              <div className={styles.header}>
                <h3>Details</h3>
              </div>
              <Form
                _setDataField = {FormActions.editDriverForm}
                _onSubmit = {this._onSubmit}
                className = {styles.form}
                id = {this.formId}
              >
                <div className = {styles.row}>
                  { row1.map((field, i) => {
                    return (
                    <Field data={this.state.driver[field.name]} field={field} key={i} fieldError={fieldError(field)} />
                    );
                  }) }
                </div>
                <div className = {styles.row}>
                  { row2.map((field, i) => {
                    return (
                    <Field data={this.state.driver[field.name]} field={field} key={i} fieldError={fieldError(field)} />
                    );
                  }) }
                </div>

                <ToggleField
                  data={this.state.driver}
                  field={driverIdSchema}
                  fieldError={fieldError(driverIdSchema)}
                />

                <div className={styles.row} onChange={logbookChange}>
                  <Field data={this.state.driver[logbookUserSchema.name]} field={logbookUserSchema} />
                    { logbookOptionsSchema.map((field, i) => {
                      if (this.state.driver.logbookUser) {
                        return (
                          <Field
                            data={this.state.driver[field.name]}
                            field={field}
                            key={i}
                            fieldError={fieldError(field)}
                          />
                        );
                      }
                      return null;
                    })}
                </div>
                <LicenceForm />
                <LicencePrimaryMenu driver={this.state.driver} licences={this.state.licences} />
              </Form>
              </div>
            </div>
              <div className={styles.footer}>
                <button
                  className={`${stylesheet.button} ${stylesheet.secondary}`}
                  type="button" onClick={this._unmountSelf}>
                    Cancel
                </button>
                <button
                  id="submitForm"
                  className={stylesheet.button}
                  onClick={this._onSubmit}>{this.state.is_creating ? "Add" : "Update"}
                </button>
              </div>
        </div>
    );
  }
}

export default DriverFormContainer;
