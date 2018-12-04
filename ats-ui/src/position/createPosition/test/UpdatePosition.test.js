import React from "react";
import UpdatePosition from "../../createPosition/UpdatePosition.jsx";
import positionMockResponse from "./UpdatePosition.mock";
import TechnologyListMockResponse from "./TechnologyList.mock";
import PracticeNameMockResponse from "./PracticeName.mock";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import App from "../../../App.js";
import { MemoryRouter } from "react-router";

Enzyme.configure({ adapter: new Adapter() });

describe("test cases for Downshift component", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const id = "5b8e5300f1ffb500f4e75cac";
        const POSITION_API = "/positions";
        const POSITION_UPDATE_API = "/position";
        const TECHNOLOGY_API = "/technology";
        const PRACTICE_API = "/practice";
        const props = {
            match : {
                params : {
                    "id": "5b8e5300f1ffb500f4e75cac"
                },
                path: "/positions/:id/edit",
                url: "/positions/5b8e5300f1ffb500f4e75cac/edit"
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/5b8e5300f1ffb500f4e75cac/edit",
                search: "",
                state: undefined
            },
            history: {
                action: "POP",
                push: function (path, state) {}
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/edit" ]}>
                <UpdatePosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("UpdatePosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, positionMockResponse);
        
        mock.onGet(`${HOST}${POSITION_UPDATE_API}/${id}`).reply(200, positionMockResponse);
    });
    test("Should add one technology on downshift", () => { 
        const technologyCount = componentInstance.state.techSelectedItem.length;

        wrapper.find("Downshift input").simulate("change", {
            target : {
                value: "e"
            }    
        });
        wrapper.find("Downshift input").simulate("keydown",  {
            key: "ArrowDown", 
            keyCode:40
        });
        wrapper.find("Downshift input").simulate("keydown", {
            key: "Enter",
            which: 13,
            keyCode: 13
        });
        
        expect(componentInstance.state.techSelectedItem.length).toEqual(technologyCount + 1);
    });
    test("Should remove selection on backspace click", () => { 
        const technologyCount = componentInstance.state.techSelectedItem.length;
        
        wrapper.find("Downshift input").simulate("keydown",  {
            key: "Backspace", 
            keyCode: 8
        });

        expect(componentInstance.state.techSelectedItem.length).toEqual(technologyCount - 1);
    });
    test("should delete technology on click of delete icon", () => {
        let technologyCount = componentInstance.state.techSelectedItem.length;

        wrapper.find("Downshift Chip").first().find("svg").simulate("click");

        expect(componentInstance.state.techSelectedItem.length).toEqual(technologyCount - 1);

        technologyCount = componentInstance.state.techSelectedItem.length;
        wrapper.find("Downshift Chip").first().find("svg").simulate("click");

        expect(componentInstance.state.errorClass).toEqual("DownshiftError");
    });
});
describe("test cases when technology list is blank", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const id = "5b8e5300f1ffb500f4e75cac";
        const POSITION_API = "/positions";
        const POSITION_UPDATE_API = "/position";
        const TECHNOLOGY_API = "/technology";
        const props = {
            match : {
                params : {
                    "id": "5b8e5300f1ffb500f4e75cac"
                },
                path: "/positions/:id/edit",
                url: "/positions/5b8e5300f1ffb500f4e75cac/edit"
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/5b8e5300f1ffb500f4e75cac/edit",
                search: "",
                state: undefined
            },
            history: {
                action: "POP",
                push: function (path, state) {}
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/edit" ]}>
                <UpdatePosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("UpdatePosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, {
            "success":true,
        });

        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, positionMockResponse);
        
        mock.onGet(`${HOST}${POSITION_UPDATE_API}/${id}`, {
            match : {
                params : {
                "id":"5b8e5300f1ffb500f4e75cac"
                }
            }
        }).reply(200, {
            "success":true,
        });
    });
    test("should not have suggestions", () => {

        expect(componentInstance.state.suggestions.length).toEqual(0);
    });
});

describe("test cases when practice name list is blank", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const id = "5b8e5300f1ffb500f4e75cac";
        const POSITION_API = "/positions";
        const POSITION_UPDATE_API = "/position";
        const PRACTICE_API = "/practice";
        const props = {
            match : {
                params : {
                    "id": "5b8e5300f1ffb500f4e75cac"
                },
                path: "/positions/:id/edit",
                url: "/positions/5b8e5300f1ffb500f4e75cac/edit"
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/5b8e5300f1ffb500f4e75cac/edit",
                search: "",
                state: undefined
            },
            history: {
                action: "POP",
                push: function (path, state) {}
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/edit" ]}>
                <UpdatePosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("UpdatePosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, {
            "success":true,
        });

        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, positionMockResponse);
        
        mock.onGet(`${HOST}${POSITION_UPDATE_API}/${id}`, {
            match : {
                params : {
                "id":"5b8e5300f1ffb500f4e75cac"
                }
            }
        }).reply(200, {
            "success":true,
        });
    });
    test("should not have Practice Name list", () => {

        expect(componentInstance.state.practiceNames.length).toEqual(0);
    });
});

describe("Update Position", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const id = "5b8e5300f1ffb500f4e75cac";
        const POSITION_API = "/positions";
        const POSITION_UPDATE_API = "/position";
        const TECHNOLOGY_API = "/technology";
        const PRACTICE_API = "/practice";
        const props = {
            match : {
                params : {
                    "id": "5b8e5300f1ffb500f4e75cac"
                },
                path: "/positions/:id/edit",
                url: "/positions/5b8e5300f1ffb500f4e75cac/edit"
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/5b8e5300f1ffb500f4e75cac/edit",
                search: "",
                state: undefined
            },
            history: {
                action: "POP",
                push: function (path, state) {}
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/edit" ]}>
                <UpdatePosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("UpdatePosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, PracticeNameMockResponse);

        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, positionMockResponse);
        
        mock.onGet(`${HOST}${POSITION_UPDATE_API}/${id}`).reply(200, positionMockResponse);
        
        mock.onPut(`${HOST}${POSITION_UPDATE_API}/${id}`).reply(200);
    });

    test("Should get technology list",()=>{
        componentInstance.getTechnologyList()
        .then(()=>{
            expect(componentInstance.state.suggestions.totalCount ).toBe(TechnologyListMockResponse.body.data.totalCount);
        });
    });

    test("Should get Practice Name list",()=>{
        componentInstance.getPracticeName()
        .then(()=>{
            expect(componentInstance.state.practiceNames.totalCount ).toBe(PracticeNameMockResponse.body.data.totalCount);
        });
    });

    test("Update Position componet get data by ID",()=>{
        componentInstance.fetchAndSetStateData()
        .then(()=>{
            expect(componentInstance.state.suggestions.length).toEqual(TechnologyListMockResponse.body.data.length);
        }).catch((error) => {
            console.log(error);
        });
    });

    test("HandleChange function should be defined", () =>{
        expect(componentInstance.handleChange).toBeDefined();
        expect(componentInstance.handleKeyDown).toBeDefined();
        expect(componentInstance.handleInputChange).toBeDefined();
        expect(componentInstance.handleChangeNew).toBeDefined();
        expect(componentInstance.handleDelete).toBeDefined();
        expect(componentInstance.handleSubmit).toBeDefined();
        expect(componentInstance.getTechnologyList).toBeDefined();
        expect(componentInstance.getPracticeName).toBeDefined();
    });

    test("Input onChange should change input value", () => {
        wrapper.find("input").first().simulate("change", {
            target : {
                value: "john"
            }
        });
        
        expect(componentInstance.state.data.title).toBe("john");
    });

    test("Should submit the data on submit button click", () => {
        const spy = jest.spyOn(componentInstance, "handleSubmit");
        wrapper.find("input").first().simulate("change", {
            target : {
                value: "Foo"
            }
        });
        
        wrapper.find("form").simulate("submit", { preventDefault () {} });
        expect(spy).toHaveBeenCalled();
    });
});
describe("handle submit with error response in update", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const id = "5b8e5300f1ffb500f4e75cac";
        const POSITION_API = "/positions";
        const POSITION_UPDATE_API = "/position";
        const TECHNOLOGY_API = "/technology";
        const PRACTICE_API = "/technology";
        const props = {
            match : {
                params : {
                    "id": "5b8e5300f1ffb500f4e75cac"
                },
                path: "/positions/:id/edit",
                url: "/positions/5b8e5300f1ffb500f4e75cac/edit"
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/5b8e5300f1ffb500f4e75cac/edit",
                search: "",
                state: undefined
            },
            history: {
                action: "POP",
                push: function (path, state) {}
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/5b8e5300f1ffb500f4e75cac/edit" ]}>
                <UpdatePosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("UpdatePosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, PracticeNameMockResponse);

        mock.onGet(`${HOST}${POSITION_API}/${id}`).reply(200, positionMockResponse);
        
        mock.onGet(`${HOST}${POSITION_UPDATE_API}/${id}`).reply(200, positionMockResponse);

        mock.onPut(`${HOST}${POSITION_UPDATE_API}/${id}`).reply(500);
    });

    test("should not redirect with error response", () => {
        wrapper.find("input[name='total_position']").simulate("change", {
            target : {
                value: "10"
            }
        });

        wrapper.find("form").simulate("submit", { preventDefault () {} });
        //:TODO write expect statement
    });

    test("Should give error message if the input field is blank", () => {
        wrapper.find("input[name='total_position']").simulate("change", {
            target : {
                value: ""
            }
        });

        wrapper.find("form").simulate("submit", { preventDefault () {} });

        expect(wrapper.find("p").text()).toEqual("Please enter Number of Position");
    });
});