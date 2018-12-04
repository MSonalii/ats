import React from 'react';
import Enzyme, {mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logout from '../logout.jsx';
import keycloak from 'keycloak-js';
Enzyme.configure({ adapter: new Adapter() });

it("Logout text should be correct", () => {
    const wrapper= shallow(<Logout keycloak={keycloak}/>);
    expect(wrapper.html()).toEqual( '<div class=\"Logout-logoutContainer-3\"><button tabindex=\"0\" class=\"MuiButtonBase-root-30 MuiButton-root-4 MuiButton-text-6 MuiButton-flat-9 Logout-logout-2\" type=\"button\"><span class=\"MuiButton-label-5\">Logout</span><span class=\"MuiTouchRipple-root-33\"></span></button></div>');
});