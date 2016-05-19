import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";

const CHANGE_EVENT = Constants.CHANGE;

class Store extends EventEmitter {

  state = {
    _id: ""
  };

  constructor() {
    super();
  }

  getState() {
    return this.state;
  }

  _toImplement() {
    console.log("Please implement this function");
  }

  login(payload) {
    this.state._id = payload;
  }

  getDriverId() {
    return this.state._id;
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
    _Store._toImplement();
    break;

  case Constants.LOGIN:
    _Store.login(payload.data);
    break;

  default:
    return;
  }

  _Store.emitChange();
});

export default _Store;
