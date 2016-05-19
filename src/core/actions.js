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
  }
};
