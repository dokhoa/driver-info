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
  API_ERRORS: "API_ERRORS"
};

if (env === "local") {
  constants.API_URI = mock ? "http://localhost:3000" : "";
  constants.STATIC_URI = "https://devdepot.eroad.com/Portal";
}

export default constants;
