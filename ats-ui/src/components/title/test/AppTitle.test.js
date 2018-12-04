import React from "react"; 
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppTitle from "../AppTitle.jsx"; 
Enzyme.configure({ adapter: new Adapter() });

test("AppTitle should have title", () => {
    const wrapper= shallow(<AppTitle/>);
    expect(wrapper.html()).toEqual("<div class=\"AppTitle-title-1\"><h2 class=\"MuiTypography-root-3 MuiTypography-title-9 AppTitle-typography-2\"> Position</h2></div>");
});

test("AppTitle should have specifice title on page change", () => {
    const wrapper= shallow(<AppTitle name="Create"/>);
    expect(wrapper.html()).toEqual("<div class=\"AppTitle-title-1\"><h2 class=\"MuiTypography-root-3 MuiTypography-title-9 AppTitle-typography-2\">Create Position</h2></div>");
});