import moment from "moment";
import { render, unmountComponentAtNode } from "react-dom";
import _ from "lodash";
import Constants from "../../../core/constants";

export function calculateDaysTillDate(date) {
  return moment(date).startOf("day").diff(moment().startOf("day"), "days");
}

export function renderComponent(component, id) {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("div");
    element.setAttribute("id", id);
    let parent = document.getElementById(Constants.COMPONENT_NAME);
    parent = parent ? parent.firstElementChild : document.body;
    parent.appendChild(element);
  } else {
    unmountComponentAtNode(element);
  }
  render(component, document.getElementById(id));
}

export function getPrimaryLicenceIndex(driver, licences) {
  let primaryLicenceIndex = -1;
  _.forEach(licences, (licence, i) => {
    const driverHasLicenceNumber = _.has(driver, "licenceNumber") && driver.licenceNumber === licence.licenceNumber;
    if (driverHasLicenceNumber || licence.isPrimaryLicence) {
      primaryLicenceIndex = parseInt(i, 10);
      return;
    }
  });
  if (primaryLicenceIndex === -1 && _.size(licences) > 0) {
    primaryLicenceIndex = 0;
  }
  return primaryLicenceIndex;
}

export function licenceSpelling(append) {
  const url = window.location.hostname;
  if (!_.endsWith(url, ".com")) {
    return `licence${append}`;
  }
  return `license${append}`;
}
