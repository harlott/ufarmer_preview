import React from 'react';
import PropTypes from 'prop-types';

import './strokeGradientTitle.scss';

class StrokeGradientTitle extends React.PureComponent {
  render() {
    let directionAngle = null;

    if (this.props.angle !== null && typeof this.props.angle !== 'undefined' && this.props.angle >= 0) {
      directionAngle = this.props.angle
    } else {
      switch(this.props.direction) {
        case 'left-right':
          directionAngle = 90;
          break;
        case 'right-left':
          directionAngle = 270;
          break;
        case 'bottom-top':
          directionAngle = 0;
          break;
        case 'topLeft-bottomRight':
          directionAngle = 135;
          break;
        case 'topRight-bottomLeft':
          directionAngle = 225;
          break;
        case 'bottomLeft-topRight':
          directionAngle = 45;
          break;
        case 'bottomRight-topLeft':
          directionAngle = 315;
          break;
        case 'top-bottom':
        default:
          directionAngle = 180;
          break;
      }
    }

    const titleStyle = {
      backgroundImage: `linear-gradient(${directionAngle}deg, ${this.props.colors.toString()})`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: this.props.fontColor,
    }

    const splitString = this.props.text.split(' ');

    return (
    <h2 className={`StrokeGradientTitle ${this.props.className}`}>
      {splitString.map(currentWord => (
        <span className='StrokeGradientTitle__title-word' style={titleStyle}>
          {currentWord}
        </span>
      ))}
    </h2>
    );
  }
}

StrokeGradientTitle.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  fontColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  angle: PropTypes.number,
  direction: PropTypes.oneOf(['left-right', 'right-left', 'top-bottom', 'bottom-top', 'topLeft-bottomRight', 'topRight-bottomLeft', 'bottomLeft-topRight', 'bottomRight-topLeft',]),
}

StrokeGradientTitle.defaultProps = {
  fontColor: 'white',
  colors: ['#f00381', '#0d1fcf'],
  angle: null,
  direction: 'top-bottom',
  className: ''
}

export default StrokeGradientTitle;
