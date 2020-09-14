import React from 'react';
import PropTypes from 'prop-types';

import SectorCard from './SectorCard';

import './sectorCards.scss';

class SectorCardsContainer extends React.PureComponent {
  render() {
    let sectionTheme = ``;

    switch(this.props.theme) {
      case 'grey':
        sectionTheme = ' sector-cards-theme-grey';
        break;
      case 'blue':
      default:
        sectionTheme = ' sector-cards-theme-blue';
        break;
    }

    return (
      <div className={`sector-cards-container${sectionTheme}`}>
        <div className="main-content-container main-content-padding">
          <h1 className="sector-cards-container__margined sector-cards-container__title">{this.props.title}</h1>
          <div className="sector-cards-container__placeholder">
            {
              this.props.cards && this.props.cards.length > 0 && this.props.cards.map(currentCard => (
                <SectorCard
                  titleAsLink={this.props.titleAsLink}
                  image={currentCard.image}
                  title={currentCard.title}
                  description={currentCard.description}
                  link={this.props.withLink ? currentCard.link : null }
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

SectorCardsContainer.propTypes = {
  withLink: PropTypes.bool,
  titleAsLink: PropTypes.bool,
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  cardClassName: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.any),
}

SectorCardsContainer.defaultProps = {
  withLink: true,
  titleAsLink: false,
  theme: 'blue',
  cardClassName: '',
  cards: [],
}

export default SectorCardsContainer;
