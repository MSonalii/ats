import React from "react";
import TablePaginationActions from "../TablePaginationAction.jsx";
import Enzyme, {mount, shallow}from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
let props, wrapper, tablePaginationActionsComponent, componentInstance;

describe("Table pagination actions", () => {
    test('handleFirstPageButtonClick function is defined', () =>{
        props = {
            classes: {"root":"test"},
            count: 30,
            page: 0,
            onChangePage:(x1, x2)=>{},
            rowsPerPage: 10,
            nextIconButtonProps: undefined,
            backIconButtonProps: undefined,
            theme: {
                direction: "ltr",
            }
        };
        
        const spy = spyOn(props, "onChangePage");

        wrapper = mount(<TablePaginationActions {...props}/>);
        tablePaginationActionsComponent = wrapper.find("TablePaginationActions");
        componentInstance = tablePaginationActionsComponent.instance();
        
        componentInstance.handleFirstPageButtonClick();

        expect(componentInstance.handleFirstPageButtonClick).toBeDefined();
        expect(spy).toHaveBeenCalled();

        tablePaginationActionsComponent.find("button[aria-label='Last Page']").simulate("click");
        
        expect(componentInstance.handleLastPageButtonClick).toBeDefined();
        expect(spy).toHaveBeenCalled();
    });
    test('should go to next and previous page on button click', () =>{
        props = {
            classes: {"root":"test"},
            count: 30,
            page: 1,
            onChangePage:(x1, x2)=>{
            },
            rowsPerPage: 10,
            nextIconButtonProps: undefined,
            backIconButtonProps: undefined
        };

        const spy = spyOn(props, "onChangePage");
        
        wrapper = mount(<TablePaginationActions {...props}/>);
        tablePaginationActionsComponent = wrapper.find("TablePaginationActions");
        componentInstance = tablePaginationActionsComponent.instance();
        
        tablePaginationActionsComponent.find("button[aria-label='Next Page']").simulate("click");
        
        expect(componentInstance.handleNextButtonClick).toBeDefined();
        expect(spy).toHaveBeenCalled();

        tablePaginationActionsComponent.find("button[aria-label='Previous Page']").simulate("click");
        
        expect(componentInstance.handleBackButtonClick).toBeDefined();
        expect(spy).toHaveBeenCalled();
    });
    test('handleFirstPageButtonClick function is defined', () =>{
        props = {
            classes: {"root":"test"},
            count: 30,
            page: 0,
            onChangePage:(x1, x2)=>{},
            rowsPerPage: 10,
            nextIconButtonProps: undefined,
            backIconButtonProps: undefined,
            theme: {
                direction: "rtl",
            }            
        };

        const spy = spyOn(props, "onChangePage");
        
        wrapper = mount(<TablePaginationActions {...props}/>);
        tablePaginationActionsComponent = wrapper.find("TablePaginationActions");
        componentInstance = tablePaginationActionsComponent.instance();

        tablePaginationActionsComponent.find("button[aria-label='Last Page']").simulate("click");
        
        expect(componentInstance.handleLastPageButtonClick).toBeDefined();
        expect(spy).toHaveBeenCalled();
    });
});