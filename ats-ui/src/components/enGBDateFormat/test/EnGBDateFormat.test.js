import React from 'react'; 
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EnGBDateFormat from "../EnGBDateFormat.jsx"; 
Enzyme.configure({ adapter: new Adapter() }); 

let props, wrapper, positionComponent, componentInstance;

describe("test case for EnGBDateFormat", () => {
    test("should return date in proper date format", () => {
        props= {
            date: "2018/10/6",
        }
        wrapper= mount(<EnGBDateFormat {...props}/>);
    
        positionComponent = wrapper.find("EnGBDateFormat");
        componentInstance = positionComponent.instance();

        expect(componentInstance.props.date).toEqual("2018/10/6");
        expect(wrapper.text()).toEqual("October 06, 2018");
    });

    test("should return in proper date format for any type of format is given in input", () => {
        props= {
            date: "2018/4/oct",
        }
        wrapper= mount(<EnGBDateFormat {...props}/>);
    
        positionComponent = wrapper.find("EnGBDateFormat");
        componentInstance = positionComponent.instance();
        
        expect(componentInstance.props.date).toEqual("2018/4/oct");
        expect(wrapper.text()).toEqual("October 04, 2018");
    });
    test("should return in proper date format for any type of format is given in input", () => {
        props= {
        }
        wrapper= mount(<EnGBDateFormat {...props}/>);
    
        positionComponent = wrapper.find("EnGBDateFormat");
        componentInstance = positionComponent.instance();
        
        expect(componentInstance.props.date).toBeUndefined();
        expect(wrapper.text()).toEqual("");
    });
});