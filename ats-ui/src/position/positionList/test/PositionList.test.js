import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import PositionList from "../../positionList/PositionList";
import positionMockResponse from './positionList.mock';
import { MemoryRouter } from "react-router";

const keycloak = {
    tokenParsed : {
        resource_access : {
            ATS : {
                roles :  ["Home-100","Home-101","Home-102","Home-103","ALL-00","00","01","02","03"],
            }
        }
    }
};

const mock = new MockAdapter(axios);
const PAGE_SIZE = 10;

const HOST = 'http://localhost:4000';
const POSITION_API = '/position';

mock.onGet(`${HOST}${POSITION_API}`, {
        params: {
            pageSize: PAGE_SIZE,
            offset: 0
        }
 }).reply(200, positionMockResponse)

Enzyme.configure({ adapter: new Adapter() });

test("Position List Should Render Positions",()=>{

    let wrapper = shallow(
        <PositionList keycloak={keycloak}/>
    );

    let positionComponent = wrapper.find('PositionList').dive();
    
    positionComponent.instance().fetchData()
        .then((result)=>{
            expect( result.data.length).toBe(positionMockResponse.body.data.length);
        })
})

test('All functions should be defined', () =>{
    keycloak.authenticated = true;
    let wrapper = shallow(<PositionList keycloak={keycloak}/>);
    let positionComponent = wrapper.find('PositionList').dive();
    let componentInstance = positionComponent.instance();
    let event= {
        target: {
            value: "",
        }
    };
    expect(componentInstance.handleChangePage(event, 0)).toBeDefined();
    expect(componentInstance.handleChangeRowsPerPage()).toBeDefined();
    expect(componentInstance.fetchData()).toBeDefined();
    expect(componentInstance.fetchAndSetStateData()).toBeDefined();
});

it("If user is not authenticated, it should show message", () => {
    keycloak.authenticated = false;
    const wrapper = mount(
        <MemoryRouter initialEntries={[ "/positions" ]}>
            <PositionList keycloak={keycloak}/>
        </MemoryRouter>
    );
    expect(wrapper.find("div").text()).toEqual("Unable to authenticate!");
});