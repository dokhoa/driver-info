import React from "react";
import { render } from "react-dom";
import moment from "moment";
import layout from "../layout.css";
import stylesheet from "../styles.css";
import styles from "./form.css";
import LicenceInput from "./LicenceInput.jsx";
import _ from "lodash";
import Store from "./core/store";
import FormActions from "./core/actions";
import { licenceSpelling } from "./core/utils";

class LicenceForm extends React.Component {

  state = {
    licences: Store.getLicencesForm(),
    errors: Store.getErrors()
  }

  constructor(props) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onStoreChange);
  }

  _onStoreChange() {
    this.setState({
      licences: Store.getLicencesForm(),
      errors: Store.getErrors()
    });
  }

  _onChange(e) {
    let value = e.target.value;
    let arr = e.target.name.split("_");
    if (_.head(arr) === "!") {
      arr = _.drop(arr);
    }
    const index = _.head(arr);
    const name = _
      .chain(arr)
      .drop(1)
      .join("_")
      .value();
    let licences = this.state.licences;
    if (name === "endorsements" || name === "restrictions") {
      value = _.map(value.split(","), _.trim);
      _.remove(value, function(n) { return !n.length; });
    }
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    FormActions.editLicenceForm(index, name, value);
  }

  render() {
    let licences = this.state.licences;
    const renderLicences = () => {
      if (_.size(licences) === 0) {
        return (
          <span className={styles.message}>No {licenceSpelling("s")}</span>
        );
      }
      return _.map(licences, (licence, i) => {
        if (!(_.has(licence, "active") && !licence.active)) {
          return (
            <LicenceInput licence={licence} key={i} index={parseInt(i, 10)} errors={this.state.errors} />
          );
        }
        return null;
      });
    };
    return (
      <div onChange = {this._onChange} className = {styles["licence-form"]} >
        <div className={styles["licence-form-header"]}>
          <h3>{licenceSpelling("s")}</h3>
        </div>
        <div id = "licences-wrapper">
        { renderLicences() }
          <div styles={{ display: "flex" }}>
            <span className={styles["add-licence"]} onClick={FormActions.createLicenceForm}>
              <i className="material-icons">
                add
              </i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default LicenceForm;
