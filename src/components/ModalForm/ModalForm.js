import React from 'react';
import HubspotForm from 'react-hubspot-form';
import _get from 'lodash/get';
import './modalForm.scss';

import { deactivate } from '../../reducers/formModal';

const ModalForm = ({ formModal, dispatch, theme = "white" }) => {
    if (!_get(formModal, 'active')) return null;
    return (
        <div className="modal modal-form is-active">
            <div className="modal-background"  style={{ backgroundColor: '#F00381' }}></div>
            <div className="modal-content">
                <HubspotForm
                    portalId='3445951'
                    formId={ _get(formModal, 'formId') || '411e1c1a-3db6-415e-9ec4-6f812937d6c3'}
                    onSubmit={() => console.log('Submit!')}
                    onReady={(form) => console.log('Form ready!')}
                    loading={<div>Loading...</div>}
                />
            </div>
            <button className="modal-close is-large" onClick={() => dispatch(deactivate())} aria-label="close"></button>
        </div>
    );
};

export default ModalForm;