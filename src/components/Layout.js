import { connect } from "react-redux";
import LayoutTemplateWrapper from './LayoutTemplateWrapper';
const mapStateToProps = (state) => {
    return { menuActive: state.menu.active };
};
  
const Layout = connect(mapStateToProps)(LayoutTemplateWrapper);

export default Layout;
