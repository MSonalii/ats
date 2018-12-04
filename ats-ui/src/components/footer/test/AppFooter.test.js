import React from 'react'; 
import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppFooter from "../AppFooter.jsx"; 
Enzyme.configure({ adapter: new Adapter() }); 

it("AppFooter text should be correct", () => {
    const wrapper= shallow(<AppFooter/>);
    expect(wrapper.html()).toEqual('<div class=\"AppFooter-footerWrapper-3\"><div class=\"AppFooter-footerDiv-1\"></div><div class=\"AppFooter-footer-2\">© GSPANN Technologies, Inc., 2018</div></div>');
});