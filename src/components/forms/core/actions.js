import Dispatcher from "./dispatcher";
import Constants from "./constants";
import Store from "./store";

export default {
  setDriverForm: (payload) => {
    Dispatcher.dispatch({
      type: Constants.SET_DRIVER_FORM,
      data: payload
    });
  },
  editDriverForm: (key, payload) => {
    Dispatcher.dispatch({
      type: Constants.EDIT_DRIVER_FORM,
      data: {
        key: key,
        data: payload
      }
    });
  },
  setLicencesForm: (payload) => {
    Dispatcher.dispatch({
      type: Constants.SET_LICENCES_FORM,
      data: payload
    });
  },
  createLicenceForm: () => {
    Dispatcher.dispatch({
      type: Constants.CREATE_LICENCE_FORM
    });
  },
  editLicenceForm: (index, key, payload) => {
    Dispatcher.dispatch({
      type: Constants.EDIT_LICENCE_FORM,
      data: {
        index: index,
        key: key,
        data: payload
      }
    });
  },
  deleteLicenceForm: (payload) => {
    Dispatcher.dispatch({
      type: Constants.DELETE_LICENCE_FORM,
      data: payload
    });
  },
  resetForm: () => {
    Dispatcher.dispatch({
      type: Constants.RESET_FORM
    });
  },
  clearErrors: () => {
    Dispatcher.dispatch({
      type: Constants.CLEAR_ERRORS
    });
  },
  setFieldError: (field, error) => {
    Dispatcher.dispatch({
      type: Constants.SET_FIELD_ERROR,
      data: {
        field: field,
        data: error
      }
    });
  },
  deleteFieldError: (field) => {
    Dispatcher.dispatch({
      type: Constants.DELETE_FIELD_ERROR,
      data: field
    });
  },
  setLicences: (licences) => {
    Dispatcher.dispatch({
      type: Constants.SET_LICENCES,
      data: licences
    });
  }
};
