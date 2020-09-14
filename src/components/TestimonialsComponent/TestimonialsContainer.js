import React from 'react';

import Testimonial from './Testimonial';
import './testimonialsComponent.scss';

class TestimonialsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  setIndexAsCurrent(value) {
    const newState = Object.assign({}, this.state);
    newState.currentIndex = value;
    this.setState(newState);
  }

  render() {
    const indicators = [];
    const processedData = this.props.data || [];
    for (let i = 0; i < processedData.length; i++) {
      indicators.push(
        <span
          onClick={() => this.setIndexAsCurrent(i)}
          className={`testimonials-container__idicators-block__indicator${i === this.state.currentIndex ? ' indicator-current' : ''}`}
        />
      );
    }

    return (
      <div className="testimonials-container">
        <div className="main-content-container main-content-padding">
          {processedData.length > 0 && (
            <Testimonial name={processedData[this.state.currentIndex].title} history={processedData[this.state.currentIndex].description} image={processedData[this.state.currentIndex].image} />
          )}
          <div className="testimonials-container__idicators-block">{indicators}</div>
        </div>
      </div>
    );
  }
}

export default TestimonialsContainer;
