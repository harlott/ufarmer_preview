import React from 'react'
import PropTypes from 'prop-types'
import { StaticPageTemplate } from '../../templates/static-page/static-page'

const StaticPagePreview = ({ entry, widgetFor }) => {
    const data = entry.getIn(['data']).toJS();
    if (data) {
        return (
            <StaticPageTemplate
                content={widgetFor('body')}
                description={data.description}
                tags={data.tags}
                title={data.title}
                quoted={data.quoted}
                type={data.subtitle}
                cover={data.featuredimage}
                filedownload={data.filedownload}
                date={!!data.date ? new Intl.DateTimeFormat('it-IT').format(entry.getIn(['data', 'date'])) : '01/01/1970'}
                author={data.author}
                blocks={data.blocks}
            />
        )
    }
}

StaticPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default StaticPagePreview
