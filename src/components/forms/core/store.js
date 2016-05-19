import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import _ from "lodash";
import moment from "moment";

const CHANGE_EVENT = Constants.CHANGE;

class Store extends EventEmitter {

  state = {
    driver_form: {},
    licences_form: {},
    licences_latest_key: -1,
    errors: {},
    licences: []
  };

  constructor() {
    super();
  }

  getState() {
    return this.state;
  }
  getLicences() {
    return this.state.licences;
  }
  setLicences(licences) {
    this.state.licences = licences;
  }
  apiErrors(payload) {
    let err = { globalErrorMessages: [ { value: "An error occurred. Please try again." } ] };
    if (payload.err.body) {
      err = payload.err.body;
    } else if (payload.err.message) {
      err = { globalErrorMessages: [ { value: payload.err.message } ] };
    }
    try {
      if (err.fieldErrorMessages.licenceNumber) {
        err.globalErrorMessages = _.concat(err.globalErrorMessages, err.fieldErrorMessages.licenceNumber);
        delete err.fieldErrorMessages.licenceNumber;
      }
    } catch (e) {
      // Do nothing
    }
    this.state.errors = err;
  }

  getErrors() {
    return this.state.errors;
  }

  clearErrors() {
    this.state.errors = {};
  }

  deleteFieldError(field) {
    if (_.has(this.state.errors.fieldErrorMessages, field)) {
      delete this.state.errors.fieldErrorMessages[field];
    }
    if (_.isEmpty(this.state.errors.fieldErrorMessages)) {
      delete this.state.errors.fieldErrorMessages;
    }
  }

  setFieldError(payload) {
    let field = payload.field;
    let err = payload.data;
    if (!_.has(this.state.errors, "fieldErrorMessages")) {
      this.state.errors.fieldErrorMessages = {};
    }
    this.state.errors.fieldErrorMessages[field] = err;
  }

  /** Driver Form **/

  getDriverForm() {
    return this.state.driver_form;
  }

  setDriverForm(driver) {
    this.state.driver_form = driver;
  }

  editDriverForm(payload) {
    const key = payload.key;
    const value = payload.data;
    this.state.driver_form[key] = value;
  }

  getLicencesForm() {
    return this.state.licences_form;
  }

  setLicencesForm(licences) {
    this.state.licences_form = licences;
    if (_.size(licences)) {
      this.state.licences_latest_key = Math.max(..._.keys(licences));
    }
  }

  createLicenceForm() {
    this.state.licences_latest_key += 1;
    this.state.licences_form[this.state.licences_latest_key] = { };
  }

  editLicenceForm(payload) {
    const index = payload.index;
    const key = payload.key;
    const value = payload.data;
    this.state.licences_form[index][key] = value;
  }

  deleteLicenceForm(index) {
    let licences = this.state.licences_form;
    if (_.has(licences[index], "active")) {
      this.state.licences_form[index].active = false;
    } else {
      delete this.state.licences_form[index];
    }
    // try to delete the fielderrors
    try {
      _.forEach(_.keys(this.state.errors.fieldErrorMessages), (key) => {
        let arr = key.split("_");
        if (_.head(arr) === "!") {
          arr = _.drop(arr);
          const i = parseInt(_.head(arr), 10);
          if (i === parseInt(index, 10)) {
            delete this.state.errors.fieldErrorMessages[key];
          }
        }
      });
    } catch (e) {
      // Do nothing
    }
  }

  resetForm() {
    this.state.licences_form = {};
    this.state.driver_form = ({});
    this.state.errors = {};
    this.state.licences_latest_key = -1;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

const _Store = new Store();

_Store.dispatchToken = Dispatcher.register((payload) => {
  switch (payload.type) {

  case Constants.API_ERRORS:
    _Store.apiErrors(payload.data);
    break;

  case Constants.CLEAR_ERRORS:
    _Store.clearErrors(payload.data);
    break;

  case Constants.DELETE_FIELD_ERROR:
    _Store.deleteFieldError(payload.data);
    break;

  case Constants.SET_FIELD_ERROR:
    _Store.setFieldError(payload.data);
    break;

  /** Driver Form **/

  case Constants.SET_DRIVER_FORM:
    _Store.setDriverForm(payload.data);
    break;

  case Constants.EDIT_DRIVER_FORM:
    _Store.editDriverForm(payload.data);
    break;

  case Constants.SET_LICENCES_FORM:
    _Store.setLicencesForm(payload.data);
    break;

  case Constants.CREATE_LICENCE_FORM:
    _Store.createLicenceForm();
    break;

  case Constants.EDIT_LICENCE_FORM:
    _Store.editLicenceForm(payload.data);
    break;

  case Constants.DELETE_LICENCE_FORM:
    _Store.deleteLicenceForm(payload.data);
    break;

  case Constants.RESET_FORM:
    _Store.resetForm();
    break;

  case Constants.SET_LICENCES:
    _Store.setLicences(payload.data);
    break;

  default:
    return;
  }

  _Store.emitChange();
});

export default _Store;
