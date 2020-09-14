import React from "react";
import { connect } from "react-redux";

import { activate, deactivate } from "../reducers/formModal";
import ArrowDown from "../../static/img//arrow_down-white.svg";

class ButtonDownload extends React.Component {
    componentWillUnmount(){
        this.props.dispatch(deactivate());
    }
    clickHandler = () => {
        this.props.dispatch(activate(this.props.formId));
    };

    render(){
        return (
            <div className="column is-one-third-tablet article-content__main-download-block">
                <a
                    className="article-content__main-download-block__main-donwload-link"
                    onClick={this.clickHandler}
                    target="_blank"
                >
                    <p className="article-content__main-download-block__main-donwload-link__text">
                        {this.props.label}
                    </p>
                    <img
                        className="article-content__main-download-block__main-donwload-link__arrow"
                        src={ArrowDown}
                        alt="Arrow Down white"
                    />
                </a>
            </div>
        );
    }
}

export default connect()(ButtonDownload);
