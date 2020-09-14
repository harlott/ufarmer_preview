import { connect } from "react-redux";
import ModalForm from './ModalForm';
const mapStateToProps = (state) => {
    return {
        formModal: state.formModal,
    };
};

const ModalFormContainer = connect(mapStateToProps)(ModalForm);

export default ModalFormContainer;
