import React from 'react'
import PropTypes from 'prop-types'
import { PressPageTemplate } from '../../templates/press-page/press-page';

const PressPagePreview = ({ entry, getAsset }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <PressPageTemplate
                title={data.title}
                description={data.description}
                fileDownloadLabel={data.fileDownloadLabel}
                filedownload={data.filedownload}
                links={data.links}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

PressPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
}

export default PressPagePreview;
