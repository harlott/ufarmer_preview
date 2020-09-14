import React from 'react';
import PropTypes from 'prop-types';

import './articleHeader.scss';
import SafeImage from '../SafeImage';

const ArticleHeaderImage = props => (
  <div className={`article-header article-theme-${props.theme}`}>
    <div className="article-header__page-title">
      <SafeImage className="article-header__page-title__image-title" title={`Featured image for article ${props.title}`} alt={props.title} image={props.image} />
      <div className="main-content-container main-content-padding article-header__page-title__text-block">
        <h2 className="article-header__page-title__text-block__category">{props.type}</h2>
        <h3 className="article-header__page-title__text-block__title">{props.title}</h3>
      </div>
    </div>
  </div>
);

ArticleHeaderImage.propsTypes = {
  theme: PropTypes.string,
}

ArticleHeaderImage.defaultProps = {
  theme: 'blue',
}

export default ArticleHeaderImage;