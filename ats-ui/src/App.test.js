import React from "react";
import App from "./App.js";
import Enzyme, {mount, shallow}from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router";

Enzyme.configure({ adapter: new Adapter() });
let keycloak = {
  tokenParsed : {
      resource_access : {
          ATS : {
              roles :  ["Home-100","Home-101","Home-102","Home-103","ALL-00","00","01","02","03"],
          }
      }
  },
  authenticated : false
}

test("view path should redirect to PositionDeatils component", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ "/positions/:id/details" ]}>
        <App keycloak={keycloak}/>
      </MemoryRouter>
    );
    expect( wrapper.length ).toBe(1);
});