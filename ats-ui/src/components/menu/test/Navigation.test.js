import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navigation from "../Navigation";
import { MemoryRouter } from "react-router";
Enzyme.configure({ adapter: new Adapter() }); 

const keycloak = {
    tokenParsed : {
        resource_access : {
            ATS : {
                roles :  ["Home-100","Home-101","Home-102","Home-103","ALL-00","00","01","02","03"],
            }
        }
    }
};

let wrapper = shallow(<Navigation keycloak={keycloak}/>);
let navigationComponent = wrapper.find('Navigation').dive();
let componentInstance = navigationComponent.instance();

test("HandleChange function should be defined", () =>{
    expect(componentInstance.handleChange).toBeDefined();
});

test('HandleChange function should update the values', () =>{
    let wrapper = mount(
        <MemoryRouter initialEntries={[ "/home" ]}>
                <Navigation keycloak={keycloak}/>
        </MemoryRouter>
    );
    wrapper.find("a").first().simulate("change", {
        target : {
            value: "1"
        }
    });
    expect(componentInstance.state.value).toBe(1);
});