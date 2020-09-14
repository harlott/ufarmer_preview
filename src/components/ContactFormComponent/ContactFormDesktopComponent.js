import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import './contact-form-component.scss';
import { activate, deactivate } from '../../reducers/formModal';
import ModalFormContainer from "../ModalForm/ModalFormContainer";

const ContactFormComponent = ({ formTexts, questionText, formId, dispatch }) => {
  const [activeDesktop, setActiveDesktop] = useState(false);
  const formPlaceholderRef = useRef(null);

  const clickHandler = () => {
    dispatch(activate(formId));
  }

  // useEffect(() => {
  //   if (activeDesktop) formPlaceholderRef.current.scrollLeft = formPlaceholderRef.current.scrollWidth - formPlaceholderRef.current.clientWidth;
  //   else formPlaceholderRef.current.scrollLeft = 0;
  // }, [activeDesktop]);

  const clickHandlerDesktop = () => {
    dispatch(deactivate(formId));
    // setActiveDesktop(!activeDesktop);
  }

  const defFirstTitle = _get(formTexts, 'firstTitle') || 'Vuoi rimanere aggiornato sulle ultime news?';
  const defSecondTitle = _get(formTexts, 'secondTitle') || 'Iscriviti alla newsletter';
  const defButtonText = _get(formTexts, 'buttonText') || 'Iscriviti';
  return (
    <>
      <div className="contact-form-component__mobile-layout">
        <div className="main-content-container main-content-padding">
          <div className="columns is-gapless">
            <div className="column">
              <h2 className="contact-form-component__first-title">{defFirstTitle }</h2>
              <h1 className="contact-form-component__second-title">{defSecondTitle}</h1>
              { _get(questionText, 'length', 0) > 0 &&
                <p className="contact-form-component__question">{questionText}</p>
              }
              <button onClick={clickHandler} className="contact-form-component__form-button">{defButtonText}</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div ref={formPlaceholderRef} className="contact-form-component__desktop-layout">
        <div className={`contact-form-component__desktop-layout__question-placeholder${ activeDesktop ? ' form-is-active' : '' }`}>
          <div className="contact-form-component__desktop-layout__question-placeholder__content-block">
            <div className="main-content-padding">
              <div className="columns is-gapless">
                <div className="column">
                  <h2 className="contact-form-component__first-title">{defFirstTitle }</h2>
                  <h1 className="contact-form-component__second-title">{defSecondTitle}</h1>
                  { _get(questionText, 'length', 0) > 0 &&
                    <p className="contact-form-component__question">{questionText}</p>
                  }
                  <button onClick={clickHandlerDesktop} className="contact-form-component__form-button">{defButtonText}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`contact-form-component__desktop-layout__form-placeholder${ activeDesktop ? ' form-is-active' : '' }`}>
          <div className="contact-form-component__desktop-layout__form-placeholder__content-block">
            <div className="main-content-padding">
              WELCOME TO FORM!
              <button onClick={clickHandlerDesktop} className="contact-form-component__form-button">CLOSE FORM</button>
            </div>
          </div>
        </div>
      </div> */}
      <ModalFormContainer />
    </>
  );
}

ContactFormComponent.propTypes = {
  firstTitle: PropTypes.string.isRequired,
  secondTitle: PropTypes.string.isRequired,
  questionText: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
}

ContactFormComponent.defaultProps = {
  questionText: null,
}


export default connect()(ContactFormComponent);