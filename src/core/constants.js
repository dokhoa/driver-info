const env = window.location.hostname === "localhost" ? "local" : "depot";
const mock = window.location.search.indexOf("api=mock") !== -1;

let constants = {
  API_URI: "/Portal/",
  STATIC_URI: "/Portal",
  ENDPOINT: "/",
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
