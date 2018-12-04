import React from "react";
import PositionDetails from "../../positionDetails/PositionDetails.jsx";
import positionMockResponse from './PositionDetails.mock';
import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MemoryRouter } from "react-router";

Enzyme.configure({ adapter: new Adapter() });

let wrapper, positionDetailComponent, componentInstance; 
const props = {
    match: {
        params : {
            "id": "5b8e5300f1ffb500f4e75cac"
        }
    },
    result: [
        {"technology":"Java"}
    ],
    body: true
}

const mock = new MockAdapter(axios);
const PAGE_SIZE = 10;

const HOST = 'http://localhost:4000';
const POSITION_API = '/position';
const id = "5b8e5300f1ffb500f4e75cac";

describe("Position Details", () => {
    beforeAll(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/details" ]}>
                <PositionDetails {...props}/>
            </MemoryRouter>
        );
        positionDetailComponent = wrapper.find('PositionDetails');
        componentInstance = positionDetailComponent.instance();

        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, positionMockResponse);       
    });
    test("Postion Details should get data by id",()=> {  
        componentInstance.fetchAndSetStateData()
        .then(()=>{
            expect( componentInstance.state.data.totalCount).toBe(positionMockResponse.body.totalCount);
        }).catch((error) => {
            console.log(error);
        });
    });
    
    test("all functions should be defined", () =>{
        expect(componentInstance.fetchAndSetStateData()).toBeDefined();
    });
    
    test("shouldComponenetUpdate return value", () =>{
        componentInstance.shouldComponentUpdate();
        componentInstance.setState({ hasFetched: true });
        expect(componentInstance.shouldComponentUpdate()).toBe(false);
    });
});

describe("For blank response in Position Details", () => {
    beforeAll(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/details" ]}>
                <PositionDetails {...props}/>
            </MemoryRouter>
        );
        positionDetailComponent = wrapper.find('PositionDetails');
        componentInstance = positionDetailComponent.instance();
        
        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, {
            "success":true,
        });       
    });
    
    test("Should not set the data if body is not present in details", () => {
        expect(componentInstance.state.data.body).not.toBeDefined();
    }); 

});

describe("For wrong response in Position Details", () => {
    beforeAll(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/details" ]}>
                <PositionDetails {...props}/>
            </MemoryRouter>
        );
        positionDetailComponent = wrapper.find('PositionDetails');
        componentInstance = positionDetailComponent.instance();
        
        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(500);       
    });
    
    test("Should not set the data if body is not present in details", () => {
        //expect(componentInstance.state.data.body).not.toBeDefined();
    }); 

});