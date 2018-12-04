import React from "react";
import AddPosition from "../AddPosition.jsx";
import Enzyme, {shallow, mount} from "enzyme";
import TechnologyListMockResponse from "./TechnologyList.mock";
import PracticeNameMockResponse from "./PracticeName.mock";
import Adapter from "enzyme-adapter-react-16";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { MemoryRouter } from "react-router";

Enzyme.configure({ adapter: new Adapter() });

const date = new Date().toLocaleDateString();

describe("Add Position", () => {
    let wrapper, positionComponent, componentInstance;
    
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const TECHNOLOGY_API = "/technology";
        const POSITION_API = "/position";
        const PRACTICE_API = "/practice";

        const props = {
            match : {
                params : {},
                path: "/positions/add",
                url: "/positions/add",
                isExact: true,
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/add",
                search: "",
                state: undefined
            },
            history: {
                action: "PUSH",
                push: function (path, state) {}
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/add" ]}>
                <AddPosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("AddPosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onPost(`${HOST}${POSITION_API}`).reply(200);

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, PracticeNameMockResponse);

        mock.onPost(`${HOST}${POSITION_API}`).reply(200);
    });

    test("Should get technology list",()=>{
        componentInstance.getTechnologyList()
        .then(()=>{
            expect(componentInstance.state.suggestions.totalCount ).toBe(TechnologyListMockResponse.body.data.totalCount);
        });
    });

    test("Should get practice name list",()=>{
        componentInstance.getPracticeName()
        .then(()=>{
            expect(componentInstance.state.practiceNames.totalCount ).toBe(PracticeNameMockResponse.body.data.totalCount);
        });
    });
    
    // test("All function should be defined", () =>{
    //     expect(componentInstance.handleChange()).toBeDefined();
    //     expect(componentInstance.handleKeyDown()).toBeDefined();
    //     expect(componentInstance.handleInputChange()).toBeDefined();
    //     expect(componentInstance.handleChangeNew()).toBeDefined();
    //     expect(componentInstance.handleDelete()).toBeDefined();
    //     expect(componentInstance.handleSubmit()).toBeDefined();
    //     expect(componentInstance.getTechnologyList()).toBeDefined();
    // });
    
    test("Input onChange should change input value", () => {
        wrapper.find("input").first().simulate("change", {
            target : {
                value: "John"
            }
        });
    
        expect(componentInstance.state.data.title).toBe("John");
    });
    
    test("should validate date", () => {
        let data = componentInstance.state.data;
        data["title"] = 'Site Core Developer';
        data["client"] = 'ATS';
        data["employment_type"] = 'Full Time';
        data["shift_timing"] = 'Day';
        data["billing_status"] = 'Billabel';
        data["notice_period"] = '10';
        data["level_1_tech_panel"] = 'sonali@gspann.com';
        data["level_2_tech_panel"] = 'test@gspann.com';
        data["practice_name"] = 'HR';
        data["account_name"] = 'DB Team'; 
        data["owner_name"] = 'John'; 
        data["total_position"] = '5'; 
        data["required_min_exp"] = '6'; 
        data["candidate_level"] = '5';
        data["project_name"] = 'ATS'; 
        data["location"] = ["Pune"]; 
        data["description"] = 'MVC knowledge is a must to have'; 
        data["comments"] = 'Should have good communication skills'; 
        componentInstance.setState({data: data});
        componentInstance.setState({"techSelectedItem": [
            {_id: "5b8e02bd208cdc3e18361d72", technology: "SQL SERVER"},
            {_id: "5b8e02c7208cdc3e18361d73", technology: "ORACLE"}]
        });

        data["start_date"] = '3/10/2018';
        componentInstance.setState({data: data});

        wrapper.find("form").simulate("submit", { preventDefault () {} });

        expect(wrapper.find("p").text()).toEqual("Selected date should be greater than todays date");
    });
});
describe("test cases for Downshift component", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const TECHNOLOGY_API = "/technology";
        const PRACTICE_API = "/practice";

        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/add" ]}>
                <AddPosition/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("AddPosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, PracticeNameMockResponse);
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
        let technologyCount;

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

        technologyCount = componentInstance.state.techSelectedItem.length;
        wrapper.find("Downshift Chip").first().find("svg").simulate("click");

        expect(componentInstance.state.errorClass).toEqual("DownshiftError");

        wrapper.find("Downshift input").simulate("change", {
            target : {
                value: "ec"
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

        technologyCount = componentInstance.state.techSelectedItem.length;
        wrapper.find("Downshift Chip").first().find("svg").simulate("click");

        expect(componentInstance.state.techSelectedItem.length).toEqual(technologyCount - 1);
    });
});

describe("test cases when technology list is blank", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const TECHNOLOGY_API = "/technology";

        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/add" ]}>
                <AddPosition/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("AddPosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
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
        const PRACTICE_API = "/practice";

        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/add" ]}>
                <AddPosition/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("AddPosition");
        componentInstance = positionComponent.instance();

        mock.onGet(`${HOST}${PRACTICE_API}`, {
        }).reply(200, {
            "success":true,
        });
    });
    test("should not have Practice name list", () => {
        
        expect(componentInstance.state.practiceNames.length).toEqual(0);
    });
});

describe("handle submit with error response in Add", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const TECHNOLOGY_API = "/technology";
        const POSITION_API = "/position";
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/add" ]}>
                <AddPosition/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("AddPosition");
        componentInstance = positionComponent.instance();
        
        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onPost(`${HOST}${POSITION_API}`).reply(500);
    });

    test("Should give error message if the input field is blank", () => {
        let data = componentInstance.state.data;

        data["title"] = 'Site Core Developer';
        data["client"] = 'ATS';
        data["employment_type"] = 'Full Time';
        data["shift_timing"] = 'Day';
        data["billing_status"] = 'Billabel';
        data["notice_period"] = '10';
        data["level_1_tech_panel"] = 'sonali@gspann.com';
        data["level_2_tech_panel"] = 'test@gspann.com';
        data["practice_name"] = 'HR';
        data["account_name"] = 'DB Team'; 
        data["owner_name"] = 'John'; 
        data["total_position"] = ''; 
        data["required_min_exp"] = '6'; 
        data["candidate_level"] = '5';
        data["start_date"] = date; 
        data["project_name"] = 'ATS'; 
        data["location"] = ["Pune"]; 
        data["description"] = 'MVC knowledge is a must to have'; 
        data["comments"] = 'Should have good communication skills'; 
        componentInstance.setState({data: data});
        componentInstance.setState({"techSelectedItem": [
            {_id: "5b8e02bd208cdc3e18361d72", technology: "SQL SERVER"},
            {_id: "5b8e02c7208cdc3e18361d73", technology: "ORACLE"}]
        });
        
        wrapper.find("form").simulate("submit", { preventDefault () {} });
        
        expect(wrapper.find("p").text()).toEqual("Please enter Number of Position");
    });
    
    test("should not redirect with error response", () => {
        //TODO; expect statement
        const spy = jest.spyOn(componentInstance,"handleSubmit");
        
        let data = componentInstance.state.data;

        data["title"] = 'Site Core Developer';
        data["client"] = 'ATS';
        data["employment_type"] = 'Full Time';
        data["shift_timing"] = 'Day';
        data["billing_status"] = 'Billabel';
        data["notice_period"] = '10';
        data["level_1_tech_panel"] = 'sonali@gspann.com';
        data["level_2_tech_panel"] = 'test@gspann.com';
        data["practice_name"] = 'HR';
        data["account_name"] = 'DB Team'; 
        data["owner_name"] = 'John'; 
        data["total_position"] = '5'; 
        data["required_min_exp"] = '6'; 
        data["candidate_level"] = '5';
        data["start_date"] = date; 
        data["project_name"] = 'ATS'; 
        data["location"] = ["Pune"]; 
        data["description"] = 'MVC knowledge is a must to have'; 
        data["comments"] = 'Should have good communication skills'; 
        componentInstance.setState({data: data});
        componentInstance.setState({"techSelectedItem": [
            {_id: "5b8e02bd208cdc3e18361d72", technology: "SQL SERVER"},
            {_id: "5b8e02c7208cdc3e18361d73", technology: "ORACLE"}]
        });

        wrapper.find("form").simulate("submit", { preventDefault () {} });
    });
});

describe("Submit the data for add position", () => {
    let wrapper, positionComponent, componentInstance;
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        const HOST = "http://localhost:4000";
        const TECHNOLOGY_API = "/technology";
        const POSITION_API = "/position";

        mock.onGet(`${HOST}${TECHNOLOGY_API}`, {
        }).reply(200, TechnologyListMockResponse);

        mock.onPost(`${HOST}${POSITION_API}`).reply(200, {
            sucess: true,
        });
    });
    
    test("Should submit the data on add position", () => {
        const props = {
            match : {
                params : {},
                path: "/positions/add",
                url: "/positions/add",
                isExact: true,
            },
            location: {
                hash: "",
                key: "o0xhv9",
                pathname: "/positions/add",
                search: "",
                state: undefined
            },
            history: {
                action: "PUSH",
                push: function (path, state) {
                }
            }
        }
        
        wrapper = mount(
            <MemoryRouter initialEntries={[ "/positions/add" ]}>
                <AddPosition {...props}/>
            </MemoryRouter>
        );

        positionComponent = wrapper.find("AddPosition");
        componentInstance = positionComponent.instance();
        
        const spy = jest.spyOn(componentInstance, "handleSubmit");
        let data = componentInstance.state.data;

        data["title"] = 'Site Core Developer';
        data["client"] = 'ATS';
        data["employment_type"] = 'Full Time';
        data["shift_timing"] = 'Day';
        data["billing_status"] = 'Billabel';
        data["notice_period"] = '10';
        data["level_1_tech_panel"] = 'sonali@gspann.com';
        data["level_2_tech_panel"] = 'test@gspann.com';
        data["practice_name"] = 'HR';
        data["account_name"] = 'DB Team'; 
        data["owner_name"] = 'John'; 
        data["total_position"] = '5'; 
        data["required_min_exp"] = '6'; 
        data["candidate_level"] = '5';
        data["start_date"] = date; 
        data["project_name"] = 'ATS'; 
        data["location"] = ["Pune"]; 
        data["description"] = 'MVC knowledge is a must to have'; 
        data["comments"] = 'Should have good communication skills'; 
        componentInstance.setState({data: data});
        componentInstance.setState({"techSelectedItem": [
            {_id: "5b8e02bd208cdc3e18361d72", technology: "SQL SERVER"},
            {_id: "5b8e02c7208cdc3e18361d73", technology: "ORACLE"}]
        });
        wrapper.find("form").simulate("submit", { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
    });
});



