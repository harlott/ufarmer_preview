import React from 'react';
import _get from 'lodash/get';

import SafeImage from '../SafeImage';
import ReadMoreLink from '../ReadMoreLink/ReadMoreLink';
import { HTMLContent } from '../Content';

import './sectorCardsFull.scss';

const SectorCardFull = ({image, title, description, link, cardClassName, order}) => {
  return (
    <div className={`sector-card-full-component ${cardClassName}`}>
      <div className={`sector-card-full-component__container sector-card-full-component__container__order-${order}`}>
        <div className="sector-card-full-component__container__image">
          <SafeImage image={image} className="sector-card-full-component__container__image__imageClass"/>
        </div>
        <div className="sector-card-full-component__container__text">
          <h1 className="sector-card-full-component__container__text__title">{title}</h1>
          <HTMLContent
            content={description}
            className="sector-card-full-component__container__text__description"
          />
          {_get(link, 'length', 0) > 0 &&
            <div className="sector-card-full-component__container__text__link">
              <ReadMoreLink url={link} color="white" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SectorCardFull;
