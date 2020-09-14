import React from 'react';
import PropTypes from 'prop-types';

import './contentIndicator.scss';

class ContentIndicator extends React.PureComponent {
  render() {
    if (this.props.hide === true) return null;
    return (
      <div className="ContentIndicator">
        <div className="ContentIndicator__arrowContainer">
          <span className="ContentIndicator__arrowContainer__arrowPiece pieceOne" />
        </div>
      </div>
    )
  }
}

export default ContentIndicator;