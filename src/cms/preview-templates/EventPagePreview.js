import React from 'react'
import PropTypes from 'prop-types'
import { EventPageTemplate } from '../../templates/event-page/event-page';

const EventPagePreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <EventPageTemplate
                description={data.description}
                date={data.eventdate ? new Intl.DateTimeFormat('it-IT').format(data.eventdate) : '01/01/1970'}
                tags={data.tags}
                title={data.title}
                image={data.featuredimage}
                place={data.place}
                price={data.costs}
                program={data.program || {}}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

EventPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
}

export default EventPagePreview;
