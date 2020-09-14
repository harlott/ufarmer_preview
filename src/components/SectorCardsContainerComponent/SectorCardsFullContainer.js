import React from 'react';
import PropTypes from 'prop-types';

import SectorCardFull from './SectorCardFull';

import './sectorCardsFull.scss';

class SectorCardsFullContainer extends React.PureComponent {
  render() {
    let sectionTheme = ``;

    switch(this.props.theme) {
      case 'blue':
        sectionTheme = ' sector-cards-full-theme-blue';
        break;
      case 'grey':
        sectionTheme = ' sector-cards-full-theme-grey';
      case 'green':
        sectionTheme = ' sector-cards-full-theme-green';
        break;
      default:
        sectionTheme = ' sector-cards-full-theme-blue';
    }

    return (
      <div className={`sector-cards-full-container ${sectionTheme}`}>
        <div className="main-content-container main-content-padding">
          {this.props.title && this.props.title.length > 0 &&
            <h1 className="sector-cards-full-container__margined sector-cards-full-container__title">{this.props.title}</h1>
          }
          <div className={`sector-cards-full-container__placeholder sector-cards-full-container__placeholder__order-${this.props.order}`}>
            {
              this.props.cards && this.props.cards.length > 0 && this.props.cards.map(currentCard => (
                <SectorCardFull
                  order={this.props.cardOrder}
                  image={currentCard.image}
                  title={currentCard.title}
                  description={currentCard.description}
                  link={currentCard.link }
                  cardClassName={this.props.cardClassName}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

SectorCardsFullContainer.propTypes = {
  order: PropTypes.oneOf(['row', 'column']),
  cardOrder: PropTypes.oneOf(['row', 'column']),
};

SectorCardsFullContainer.defaultProps = {
  order: 'column',
  cardOrder: 'column',
};

export default SectorCardsFullContainer;
