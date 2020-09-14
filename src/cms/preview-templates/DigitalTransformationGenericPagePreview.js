import React from 'react'
import PropTypes from 'prop-types';
import { DigitalTransformationGenericPageTemplate } from '../../templates/digital-transformation-static-page/digital-transformation-static-page';

const DigitalTransformationGenericPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <DigitalTransformationGenericPageTemplate
        pageTitle={data.pageTitle}
        metaDescription={data.metaDescription}
        metaKeywords={data.metaKeywords}
        title={data.title}
        sections={data.sections}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

DigitalTransformationGenericPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default DigitalTransformationGenericPagePreview
