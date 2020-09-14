import React from 'react';

import SafeImage from '../SafeImage';

import './testimonialsComponent.scss';

const Testimonial = (props) => (
  <div className="testimonial-block">
    <div className={`testimonial-block__testimonial-image${!props.image ? '__no-image' : ''}`}>
        {!!props.image && (
            <SafeImage image={props.image} />
        )}
    </div>
    <div className="testimonial-block__testimonial-description">
      <div className="testimonial-block__testimonial-description__testimonial-name">{props.name}</div>
      <div className="testimonial-block__testimonial-description__testimonial-history">{props.history}</div>
    </div>
  </div>
);

export default Testimonial;
