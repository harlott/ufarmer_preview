import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby";

import arrowRight from '../../../static/img/read-more-arrow.svg';
import arrowRightWhite from '../../../static/img/read-more-arrow-white.svg';
import './readMoreLink.scss';

class ReadMoreLink extends React.PureComponent {
  
  getComponentColorClass(classColor) {
    switch(classColor) {
      case 'white':
        return ' color-white'
      case 'blue':
      default:
        return '';
    }
  }

  renderArrowByColor(arrowColor) {
    switch(arrowColor) {
      case 'white':
        return (<img className="read-more-link-component__arrow-img" src={arrowRightWhite} alt="Read more link arrow" />);
      case 'blue':
      default:
        return (<img className="read-more-link-component__arrow-img" src={arrowRight} alt="Read more link arrow" />);
    }
  }

  render() {
    return (
      <div className={`read-more-link-component`}>
        <Link
          to={this.props.url}
          className={`read-more-link-component__url${this.getComponentColorClass(this.props.color)}`}
        >
          {!!this.props.title && this.props.title.length > 0 &&
            <span className="read-more-link-component__url__text">{this.props.title}</span>
          }
          {this.renderArrowByColor(this.props.color)}  
        </Link>    
      </div>
    )
  }
}

ReadMoreLink.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
  color: PropTypes.string,
};

ReadMoreLink.defaultProps = {
  title: null
};

export default ReadMoreLink;
