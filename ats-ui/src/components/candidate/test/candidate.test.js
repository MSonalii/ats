import React from 'react'; 
import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Candidate from "../candidate"; 
import { MemoryRouter } from "react-router";

Enzyme.configure({ adapter: new Adapter() }); 

const keycloak = {
    tokenParsed : {
        resource_access : {
            ATS : {
                roles :  ["Home-100","Home-101","Home-102","Home-103","ALL-00","00","01","02","03"],
            }
        }
    },
    authenticated : true
};

it("If user is authenticated, then it should show message", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[ "/candidate" ]}>
            <Candidate keycloak={keycloak}/>
        </MemoryRouter>
    );
    expect(wrapper.find("h4").text()).toEqual("Candidate page is under progress.");
});

it("If user is not authenticated, then it should show message", () => {
    keycloak.authenticated = false;
    const wrapper = mount(
        <MemoryRouter initialEntries={[ "/candidate" ]}>
            <Candidate keycloak={keycloak}/>
        </MemoryRouter>
    );
    expect(wrapper.find("div").text()).toEqual("Unable to authenticate!");
});

it("test cases for loader", () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[ "/candidate" ]}>
            <Candidate/>
        </MemoryRouter>
    );
});