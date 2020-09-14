import React from 'react';
import PropTypes from 'prop-types';

import './gradientButton.scss';

const disabledColors = {
  backgroundGradient: ['#4f4f4f', '#757575'],
  backgroundColor: '#b3b3b3',
  textColor: '#696969',
};

class GradientButton extends React.Component {
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

    const buttonStyle = {
      backgroundImage: `linear-gradient(${directionAngle}deg, ${this.props.disabled ? disabledColors.backgroundGradient.toString() : this.props.colors.toString()})`
    };

    return (
      <button
        type="button"
        style={buttonStyle}
        className={`gradientButton__button${this.props.disabled ? ' gradientButton__button__disabled' : ''}${this.props.className}`}
        onClick={(event) => { !this.props.disabled && this.props.onClick(event) }}
      >
        <span 
          style={{color: this.props.disabled ? disabledColors.textColor : this.props.fontColor, backgroundColor: this.props.disabled ? disabledColors.backgroundColor : this.props.baseColor}}
          className="gradientButton__button__innerElement"
        >
          {this.props.children}
        </span>
      </button>
    )
  }
}

GradientButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string),
  angle: PropTypes.number,
  fontColor: PropTypes.string,
  baseColor: PropTypes.string,
  direction: PropTypes.oneOf(['left-right', 'right-left', 'top-bottom', 'bottom-top', 'topLeft-bottomRight', 'topRight-bottomLeft', 'bottomLeft-topRight', 'bottomRight-topLeft']),
}

GradientButton.defaultProps = {
  className: '',
  disabled: false,
  colors: ['#f00381', '#0d1fcf'],
  angle: null,
  fontColor: '#fff',
  baseColor: '000',
  direction: 'top-bottom',
}

export default GradientButton;
