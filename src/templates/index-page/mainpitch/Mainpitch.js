import React from 'react';
import PropTypes from 'prop-types';

import mainImage from '../../../../static/img/aziende-onlife-cws-mainpitch.svg';
import ContentIndicator from '../../../components/ContentIndicator/ContentIndicator';
import './style/mainpitch.scss';
import SafeImage from "../../../components/SafeImage";

import topImage from '../../../../static/img/landascape1-home-top.jpg';

const Mainpitch = ({ text, image, theme }) => {
    console.log(topImage);
    return (
        <div
            className={`home__mainpitch is-gapless ${theme || ''}`}
            style={
                {'background': `url(${topImage}) no-repeat`, 'background-size': '100%', 'background-position': 'center center', 'opacity': '1'}
            }>
            <div className="main-content-container main-content-padding">
                <div className="is-vcentered columns">
                    <div className="home__mainpitch__image__container column">
                        <SafeImage image={image || mainImage} className="home__mainpitch__image" />
                    </div>
                    <div className="column no-padding">
                        <div className="home__mainpitch__title  is-size-3-widescreen">
                            <h1 className="has-text-weight-bold">
                                {text}
                            </h1>
                        </div>
                    </div>
                </div>
                <ContentIndicator hide={true}/>
            </div>
            
        </div>
    )
}

Mainpitch.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Mainpitch;
