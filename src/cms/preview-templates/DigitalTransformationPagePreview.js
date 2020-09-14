import React from 'react'
import PropTypes from 'prop-types';

import { DigitalTransformationPageTemplate } from '../../templates/digital-transformation-page/digital-transformation-page';

const DigitalTransformationPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <DigitalTransformationPageTemplate
        pageTitle={data.pageTitle}
        metaDescription={data.metaDescription}
        metaKeywords={data.metaKeywords}
        title={data.title}
        description={data.description}
        cta={data.cta}
        solution={data.solution}
        caseStudyContents={[]}
        featuredimage={data.featuredimage}
        phasesimage={data.phasesimage}
        areas={data.areas}
  />
    )
  } else {
    return <div>Loading...</div>
  }
}

DigitalTransformationPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default DigitalTransformationPagePreview
