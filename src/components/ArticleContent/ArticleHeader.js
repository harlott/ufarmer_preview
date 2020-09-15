import React from 'react';
import PropTypes from 'prop-types';

import './articleHeader.scss';
import GradientTitle from '../GradientTitle/GradientTitle';

const ArticleHeader = props => (
  <div className={`article-header no-image article-theme-${props.theme}`}>
    <div className="article-header__page-title">
      <div className="main-content-container main-content-padding article-header__page-title__text-block">
        <h3 className="article-header__page-title__text-block__title" style={{color: '#333'}}>
          {props.title}
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