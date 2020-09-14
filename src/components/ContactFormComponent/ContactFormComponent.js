import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import './contact-form-component.scss';
import { activate } from '../../reducers/formModal';
import ModalFormContainer from "../ModalForm/ModalFormContainer";

const ContactFormComponent = ({ formTexts, questionText, formId, dispatch }) => {
  const clickHandler = () => {
    dispatch(activate(formId));
  }

  const defFirstTitle = _get(formTexts, 'firstTitle') || _get(formTexts, 'title') || 'Scopri di più su UFarmer';
  const defSecondTitle = _get(formTexts, 'secondTitle') || _get(formTexts, 'description') || 'Lascia il tuo contatto email, ti avviseremo in esclusiva per il go-live del progetto e ti spiegheremo come entrare a farne parte.';
  const defButtonText = _get(formTexts, 'buttonText') || _get(formTexts, 'button') || 'Lascia il tuo contatto';
  return (
    <>
      <div className="contact-form-component__mobile-layout" style={{'background-color': '#2D6F2Dff'}}>
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