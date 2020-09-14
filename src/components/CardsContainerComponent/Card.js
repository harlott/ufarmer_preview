import React from 'react';
import { Link } from 'gatsby';

import _get from 'lodash/get';

import SafeImage from '../SafeImage';
import ReadMoreLink from '../ReadMoreLink/ReadMoreLink';
import { HTMLContent } from '../Content';

import './cards.scss';

const Card = ({image, title, description, link, titleAsLink = false}) => {
  return (
    <div className="card-component">
      <div className="card-component__container">
        <div className="card-component__container__image">
          <SafeImage image={image} />
        </div>
        {titleAsLink && _get(link, 'length', 0 ) > 0 &&
          <Link to={link} className="card-component__container__title">{title}</Link>
        }
        {(!titleAsLink || _get(link, 'length', 0 ) <= 0) &&
          <h1 className="card-component__container__title">{title}</h1>
        }
        <HTMLContent
          className="card-component__container__description"
          content={description}
        />
        {_get(link, 'length', 0 ) > 0 &&
          <div className="card-component__container__link">
            <ReadMoreLink url={link} color="white" />
          </div>
        }
      </div>
    </div>
  )
}

export default Card;
