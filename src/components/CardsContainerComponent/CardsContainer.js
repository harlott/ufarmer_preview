import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import CustomScrollbarComponent from '../CustomScrollbarComponent/CustomScrollbarComponent';

import './cards.scss';

class CardsComponent extends React.Component {
  render() {
    let sectionTheme = ``;

    switch(this.props.theme) {
      case 'blue':
      default:
        sectionTheme = ' card-theme-blue';
    }
    const dataCards = this.props.cards || [];
    return (
      <div className={`cardsContainer${sectionTheme}`}>
        <div className="main-content-container main-content-padding">
          <h1 className="cardsContainer__margined cardsContainer__title">{this.props.title}</h1>
        </div>
        <CustomScrollbarComponent placeholderClassName="main-content-container main-content-padding cardsContainer__placeholder ">
          {
              dataCards.map(currentCard => (
              <Card
                titleAsLink={this.props.titleAsLink}
                image={currentCard.image}
                title={currentCard.title}
                description={currentCard.description}
                link={currentCard.link }
              />
            ))
          }
        </CustomScrollbarComponent>
      </div>
    );
  }
}

CardsComponent.propTypes = {
  titleAsLink: PropTypes.bool,
}

CardsComponent.defaultProps = {
  titleAsLink: false,
}

export default CardsComponent;
