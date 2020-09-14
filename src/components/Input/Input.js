import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

const evalInput = (props) => {
  switch(props.type) {
    case 'text':
    default:
      return (
        <input
          disabled={props.disabled}
          type="text"
          id={`Input-${props.name}`}
          name={`Input-${props.name}`}
          className={props.className}
          value={props.value}
          placeholder={props.placeholder}
          onClick={event => { props.onClick && props.onClick(event) }}
          onChange={event => { props.onChange && props.onChange(event) }}
          onFocus={event => { props.onFocus && props.onFocus(event) }}
          onBlur={event => { props.onBlur && props.onBlur(event) }}
        />
      )
  }
}

const Input = (props) => (
  <div className={`Input${props.inline ? ` Input__inline` : ''}`}>
    {!!props.label && props.label.length > 0 &&
      <label for={`Input-${props.name}`}>{props.label}</label> 
    }
    { evalInput(props) }
  </div>
)

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  placeholder: 'Type here...',
  onClick: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  inline: false,
  disabled: false,
  className: 'Input__type-text',
};

export default Input;