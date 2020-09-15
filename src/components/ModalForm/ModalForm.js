import React from 'react';
import HubspotForm from 'react-hubspot-form';
import _get from 'lodash/get';
import './modalForm.scss';

import { deactivate } from '../../reducers/formModal';

const ModalForm = ({ formModal, dispatch, theme = "white" }) => {
    if (!_get(formModal, 'active')) return null;
    return (
        <div className="modal modal-form is-active">
            <div className="modal-background"  style={{ background: 'rgba(0,0,0,0.8)' }}></div>
            <div className="modal-content">
                <HubspotForm
                    portalId='8458384'
                    formId={ _get(formModal, 'formId') || '3a064104-d623-4685-8b6b-073164e29880'}
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