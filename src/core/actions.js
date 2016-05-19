import Dispatcher from "./dispatcher";
import Constants from "./constants";
import Store from "./store";
import API from "./api";
import Q from "q";
import metrics from "metrics";

export default {
  get: () => {
    const deferred = Q.defer();
    API.get().then((payload) => {
      Dispatcher.dispatch({
        type: Constants.GET,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  post: (data) => {
    const deferred = Q.defer();
    API.post(data).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.POST,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  put: (data) => {
    const deferred = Q.defer();
    API.post(data).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.PUT,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  delete: (data) => {
    const deferred = Q.defer();
    API.post(data).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.DELETE,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  getDriverId: (mobileNumber) => {
    const deferred = Q.defer();
    API.getDriverId(mobileNumber).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.LOGIN,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  verify: (_id, token) => {
    const data = {
      code: token
    };
    const deferred = Q.defer();
    API.verify(_id, data).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.VERIFY,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  getDriver: (_id) => {
    const deferred = Q.defer();
    API.getDriver(_id).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.GET_DRIVER,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  updateDriver: (_id, data) => {
    const deferred = Q.defer();
    API.updateDriver(_id, data).then((payload) => {
      Dispatcher.dispatch({
        type: Constants.UPDATE_DRIVER,
        data: payload
      });
      return deferred.resolve(payload);
    }, (err) => {
      Dispatcher.dispatch({
        type: Constants.API_ERRORS,
        data: {
          err: err
        }
      });
      return deferred.reject(err);
    });
    return deferred.promise;
  },
  setDriverId: (_id) => {
    Dispatcher.dispatch({
      type: Constants.SET_DRIVER_ID,
      data: _id
    });
  }
};
