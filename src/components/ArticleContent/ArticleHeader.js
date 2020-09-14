import React from 'react';
import PropTypes from 'prop-types';

import './articleHeader.scss';
import GradientTitle from '../GradientTitle/GradientTitle';

const ArticleHeader = props => (
  <div className={`article-header no-image article-theme-${props.theme}`}>
    <div className="article-header__page-title">
      <div className="main-content-container main-content-padding article-header__page-title__text-block">
        <h2 className="article-header__page-title__text-block__category">{props.type}</h2>
        <h3 className="article-header__page-title__text-block__title">
          <GradientTitle direction="left-right" colors={['#4500ce', '#ff007b']} text={props.title} />
        </h3>
      </div>
    </div>
  </div>
);

ArticleHeader.propsTypes = {
  theme: PropTypes.string,
}

ArticleHeader.defaultProps = {
  theme: 'blue',
}

export default ArticleHeader;