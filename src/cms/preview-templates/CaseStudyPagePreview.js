import React from 'react'
import PropTypes from 'prop-types'
import { CaseStudyPageTemplate } from '../../templates/case-study-page/case-study-page.js';

const CaseStudyPagePreview = ({ entry, getAsset }) => {
    const data = entry.getIn(['data']).toJS()
    if (data) {
        return (
            <CaseStudyPageTemplate
                title={data.title}
                description={data.description}
                resume={{
                    customer: data.customer, year: data.year, expertise: data.expertise, link: data.link
                }}
                image={data.featuredimage}
                sections={data.sections}
                tags={data.tags}
                imageGallery={data.imageGallery}
                testimonials={data.testimonials}
                partners={data.partners}
                results={data.results}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

CaseStudyPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
}

export default CaseStudyPagePreview
