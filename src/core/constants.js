const env = window.location.hostname === "localhost" ? "local" : "depot";
const mock = window.location.search.indexOf("api=mock") !== -1;

let constants = {
  API_URI: "https://w5pomnapv8.execute-api.us-east-1.amazonaws.com",
  STATIC_URI: "/Portal",
  ENDPOINT: "/prod/",
  CHANGE: "CHANGE",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  API_ERRORS: "API_ERRORS",
  LOGIN: "LOGIN",
  VERIFY: "VERIFY",
  GET_DRIVER: "GET_DRIVER",
  UPDATE_DRIVER: "UPDATE_DRIVER"
};

if (env === "local") {
  constants.STATIC_URI = "https://devdepot.eroad.com/Portal";
}

export default constants;
