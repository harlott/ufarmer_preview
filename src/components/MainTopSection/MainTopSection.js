import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import mainImage from '../../../static/img/aziende-onlife-cws-mainpitch.svg';
import './mainTopSection.scss';
import { HTMLContent } from '../Content';

const MainTopSection = ({ text, subtitle, description, floatImage, transparent, titleClassName = '' }) => {
    return (
        <div className={`main-top-section is-gapless${transparent ? ' transparent' : ''}`}>
            <div className={`main-content-container main-content-padding ${titleClassName}`}>
                <div className="is-vcentered columns">
                    <div className="column no-padding">
                        <div className="main-top-section__title  is-size-3-widescreen">
                            <h1 className="has-text-weight-bold">
                                {text}
                            </h1>
                        </div>
                    </div>
                    {floatImage &&
                        <img className="main-top-section__big-float-image" src={mainImage} alt="" />
                    }
                    <div className={`main-top-section__image__container${floatImage ? ' hide-desktop' : ''} column`}>
                        <img className="main-top-section__image" src={mainImage} alt="" />
                    </div>
                </div>
                {!_isEmpty(subtitle) &&
                <div className="columns is-gapless">
                    <div className="column">
                        <h2 className="main-top-section__subtitle">{subtitle}</h2>
                    </div>
                </div>
                }
                {!_isEmpty(description) &&
                    <div className="columns is-gapless">
                        <div className="column">
                            <HTMLContent content={description} className="main-top-section__description" />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

MainTopSection.propTypes = {
    text: PropTypes.string.isRequired,
    description: PropTypes.string,
    floatImage: PropTypes.bool,
    transparent: PropTypes.bool
}

MainTopSection.defaultProps = {
    description: null,
    floatImage: false,
    transparent: false
}

export default MainTopSection;