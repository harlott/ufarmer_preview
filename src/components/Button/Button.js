import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = props => {
  if (!props.text) return null;
  return (
      <button
          type="button"
          className={`Button${props.active ? ' Button__active-button' : ''}${props.disabled ? ' Button__disabled-button' : ''} theme-${props.theme}`}
          onClick={event => !props.disabled && !!props.onClick ? props.onClick(event) : null}
      >
        {props.text}
      </button>
  )
}

Button.propTypes = {
  theme: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  theme: 'default',
  onClick: null,
  active: false,
  disabled: false,
}

export default Button;