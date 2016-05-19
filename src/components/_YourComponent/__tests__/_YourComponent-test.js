import React from "react";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import _YourComponent from "../_YourComponent.jsx";
import layout from "../../layout.css";

chai.use(chaiEnzyme());

describe("_YourComponent.jsx", () => {
  it("renders a div with the layout.wrapper class", () => {
    const wrapper = shallow(<_YourComponent />);
    expect(wrapper.find(`.${layout.item}`)).to.have.tagName("div");
  });
});
