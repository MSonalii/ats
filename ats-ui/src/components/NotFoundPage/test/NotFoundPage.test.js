import React from 'react'; 
import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFoundPage from "../NotFoundPage.jsx"; 
Enzyme.configure({ adapter: new Adapter() }); 

it("AppFooter text should be correct", () => {
    const wrapper= shallow(<NotFoundPage/>);
    expect(wrapper.html()).toEqual("<div><h4 class=\"NotFoundPage-notAuthorizedMsg-1\">You are not authorized, please contact ATS admin.</h4></div>");
});