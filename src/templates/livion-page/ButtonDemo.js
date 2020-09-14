import React from "react";
import { connect } from "react-redux";

import { activate, deactivate } from "../../reducers/formModal";
import GradientButton from "../../components/GradientButton/GradientButton";

class ButtonDemo extends React.Component {
    componentWillUnmount(){
        this.props.dispatch(deactivate());
    }
    clickHandler = () => {
        this.props.dispatch(activate(this.props.formId));
    };

    render(){
        return (
            <GradientButton
                onClick={this.clickHandler}
                direction="left-right"
                colors={["#29e7d6", "#2df77f"]}
                fontColor="#ffffff"
                baseColor="#0D1FCF"
            >
                {this.props.demoButtontext}
            </GradientButton>
        );
    }
}

export default connect()(ButtonDemo);
