import Actions from "./actions";
import request from "superagent";
import Constants from "./constants";
import Q from "q";
import _ from "lodash";
import metrics from "metrics";

function testSuccess(response) {
  return true;
}

export default {
  get: () => {
    const deferred = Q.defer();
    request
      .get(`${Constants.API_URI}${Constants.ENDPOINT}`)
      .accept("application/json")
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  post: (data) => {
    const deferred = Q.defer();
    request
      .post(`${Constants.API_URI}${Constants.ENDPOINT}`)
      .accept("application/json")
      .send(data)
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  put: (data) => {
    const deferred = Q.defer();
    request
      .put(`${Constants.API_URI}${Constants.ENDPOINT}`)
      .accept("application/json")
      .send(data)
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  delete: (data) => {
    const deferred = Q.defer();
    request
      .delete(`${Constants.API_URI}${Constants.ENDPOINT}`)
      .accept("application/json")
      .send(data)
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  getDriverId: (mobileNumber) => {
    const data = {
      type: Constants.LOGIN,
      mobileNumber: mobileNumber
    };
    const deferred = Q.defer();
    request
      .post(`${Constants.API_URI}${Constants.ENDPOINT}`)
      .accept("application/json")
      .send(data)
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  verify: (_id, data) => {
    const deferred = Q.defer();
    request
      .put(`${Constants.API_URI}${Constants.ENDPOINT}${_id}?verify=true`)
      .accept("application/json")
      .send(data)
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  getDriver: (_id) => {
    const deferred = Q.defer();
    request
      .get(`${Constants.API_URI}${Constants.ENDPOINT}${_id}`)
      .accept("application/json")
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  },
  updateDriver: (_id, data) => {
    const deferred = Q.defer();
    request
      .put(`${Constants.API_URI}${Constants.ENDPOINT}${_id}`)
      .accept("application/json")
      .send(data)
      .end((err, response) => {
        if (err) {
          return deferred.reject(err);
        }
        if (!testSuccess(response)) {
          return deferred.reject(response);
        }

        return deferred.resolve(response.body);
      });

    return deferred.promise;
  }
};
