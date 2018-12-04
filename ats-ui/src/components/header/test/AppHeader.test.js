import React from 'react'; 
import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppHeader from "../AppHeader.jsx"; 
Enzyme.configure({ adapter: new Adapter() });

let wrapper = mount(<AppHeader/>);
let positionComponent = wrapper.find("AppHeader");
let componentInstance = positionComponent.instance();

it("AppHeader should render image src correctly", () => {
    expect(wrapper.find("img").length).toEqual(1);
    expect(wrapper.find("img[src='../../images/GSPANN_Logo_White.png']").length).toEqual(1);
    
});