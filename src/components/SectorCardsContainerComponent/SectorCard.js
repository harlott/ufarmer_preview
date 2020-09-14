import React from 'react';
import _get from 'lodash/get';

import SafeImage from '../SafeImage';
import ReadMoreLink from '../ReadMoreLink/ReadMoreLink';
import { HTMLContent } from '../Content';

import './sectorCards.scss';
import { Link } from 'gatsby';

const SectorCard = ({image, title, description, link, cardClassName, titleAsLink = false}) => {
  return (
    <div className={`sector-card-component ${cardClassName}`}>
      <div className="sector-card-component__container">
        <div className="sector-card-component__container__image">
            <SafeImage image={image} />
        </div>
        {titleAsLink && _get(link, 'length', 0) > 0 &&
          <Link to={link} className="sector-card-component__container__title">{title}</Link>
        }
        {(!titleAsLink || _get(link, 'length', 0) <= 0) &&
          <h1 className="sector-card-component__container__title">{title}</h1>
        }
          <HTMLContent
            content={description}
            className="sector-card-component__container__description"
          />
        {_get(link, 'length', 0) > 0 &&
          <div className="sector-card-component__container__link">
            <ReadMoreLink url={link} color="white" />
          </div>
        }
      </div>
    </div>
  )
}

export default SectorCard;
