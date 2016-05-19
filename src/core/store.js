import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";

const CHANGE_EVENT = Constants.CHANGE;

class Store extends EventEmitter {

  state = {
    _id: "",
    session_token: "",
    driver: {}
  };

  constructor() {
    super();
  }

  getState() {
    return this.state;
  }

  getDriver() {
    return this.state.driver;
  }

  _toImplement() {
    console.log("Please implement this function");
  }

  login(payload) {
    this.state._id = payload._id;
  }

  setDriverId(payload) {
    this.state._id = payload;
  }

  getDriverId() {
    return this.state._id;
  }

  verify(payload) {
    // this.state.session_token = payload;
    // Do nothing until token is given on verify
  }

  printError(payload) {
    console.log(payload);
  }
  updateDriver(payload) {
    this.state.driver = payload;
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

  case Constants.GET:
    _Store._toImplement();
    break;

  case Constants.POST:
    _Store._toImplement();
    break;

  case Constants.PUT:
    _Store._toImplement();
    break;

  case Constants.DELETE:
    _Store._toImplement();
    break;

  case Constants.API_ERRORS:
    _Store.printError(payload.data);
    break;

  case Constants.LOGIN:
    _Store.login(payload.data);
    break;

  case Constants.VERIFY:
    _Store.verify(payload.data);
    break;
  case Constants.GET_DRIVER:
    _Store.updateDriver(payload.data);
    break;

  case Constants.UPDATE_DRIVER:
    _Store.updateDriver(payload.data);
    break;

  case Constants.SET_DRIVER_ID:
    _Store.setDriverId(payload.data);
    break;

  default:
    return;
  }

  _Store.emitChange();
});

export default _Store;
