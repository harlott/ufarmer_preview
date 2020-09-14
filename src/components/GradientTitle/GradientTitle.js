import React from 'react';
import PropTypes from 'prop-types';

import './gradientTitle.scss';

class GradientTitle extends React.PureComponent {
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
      WebkitTextFillColor: 'rgba(0,0,0,0)',
    }

    return (
      <span className="GradientTitle" style={titleStyle}>{this.props.text}</span>
    )
  }
}

GradientTitle.propTypes = {
  text: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  angle: PropTypes.number,
  direction: PropTypes.oneOf(['left-right', 'right-left', 'top-bottom', 'bottom-top', 'topLeft-bottomRight', 'topRight-bottomLeft', 'bottomLeft-topRight', 'bottomRight-topLeft',]),
}

GradientTitle.defaultProps = {
  colors: ['#f00381', '#0d1fcf'],
  angle: null,
  direction: 'top-bottom',
}

export default GradientTitle;
