import React from 'react'
import PropTypes from 'prop-types'
import { CompetenceSinglePageTemplate } from '../../templates/competence-single-page/competence-single-page';

const CompetenceSinglePagePreview = ({ entry, getAsset }) => {
    const data = entry.getIn(['data']).toJS()
    if (data) {
        return (
            <CompetenceSinglePageTemplate
                title={data.title}
                featuredimage={data.featuredimage}
                blocks={data.blocks}
                areastitle={data.areastitle}
                areas={data.areas}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

CompetenceSinglePagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
};

export default CompetenceSinglePagePreview;
