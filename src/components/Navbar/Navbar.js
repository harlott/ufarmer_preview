import { connect } from "react-redux";
import NavbarComponent from './NavbarComponent';
import { activate, deactivate } from '../../reducers/menu';
const mapStateToProps = (state) => {
    return { menuActive: state.menu.active };
};
  
const mapDispatchToProps = dispatch => {
    return {
        activate: (menuActiveState) => {
            if (menuActiveState === true) {
                dispatch(deactivate());
            } else {
                dispatch(activate());
            }
        }
    }
};

const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);

export default Navbar
