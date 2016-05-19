import Actions from "./actions";
import request from "superagent";
import Constants from "./constants";
import Q from "q";
import _ from "lodash";
import metrics from "metrics";

function testSuccess(response) {
  if (response.type === "text/html") {
    return false;
  }
  if (_.isPlainObject(response.body) && _.has(response.body, "success")) {
    return response.body.succcess;
  }
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
  }
};
