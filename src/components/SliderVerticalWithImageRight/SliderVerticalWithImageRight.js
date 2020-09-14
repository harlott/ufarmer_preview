import React from 'react';
import SafeImage from "../SafeImage";

import './slider-vertical-with-image-right.scss';

class SliderVerticalWithImageRight extends React.Component{
    render(){
        const { data } = this.props;
        if (!this.props.data) return null;
        return(
            <div className="slider-vertical-container">
                {data.map(item => (
                    <div className="slider-vertical-container__item columns">
                        <div className="slider-vertical-container__item__content column">
                            <div className="slider-vertical-container__item__content__title">{item.title}</div>
                        </div>
                        <div className="slider-vertical-container__item__image column">
                            <SafeImage className="" image={item.image} />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
};

export default SliderVerticalWithImageRight;
