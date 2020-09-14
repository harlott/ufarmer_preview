import React from 'react';
import PropTypes from 'prop-types';
import { ContactsPageTemplate } from '../../templates/contacts-page/contacts-page';

const ContactsPagePreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <ContactsPageTemplate
                title={data.title}
                description={data.description}
                offices={data.offices}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

ContactsPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    })
}

export default ContactsPagePreview;
