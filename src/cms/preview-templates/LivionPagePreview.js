import React from 'react';
import PropTypes from 'prop-types';
import { LivionPageTemplate } from '../../templates/livion-page/livion-page';

const LivionPagePreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <LivionPageTemplate
                pageTitle={data.pageTitle}
                metaDescription={data.metaDescription}
                metaKeywords={data.metaKeywords}
                title={data.title}
                subtitle={data.subtitle}
                description={data.description}
                featuredimage={data.featuredimage}
                demoButtontext={data.demoButtontext}
                areasTitle={data.areasTitle}
                areas={data.areas || []}
                sectorsTitle={data.sectorsTitle}
                sectorsMenu={data.sectorsMenu || []}
                sectorsBlocks={data.sectorsBlocks || []}
                touchEconomy={data.touchEconomy || {}}
                preview={true}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

LivionPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
}

export default LivionPagePreview;
