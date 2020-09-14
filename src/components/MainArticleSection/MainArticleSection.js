import React from 'react';
import _get from 'lodash/get';

import ArrowDown from '../../../static/img/arrow_down-white.svg';
import { HTMLContent } from '../Content';

import './mainArticleSection.scss';

const MainArticleSecion = ({theme, section, title, caseStudy, cta}) => {
  let sectionTheme = ``;

  switch(theme) {
    case 'blue':
    default:
      sectionTheme = 'main-article-theme-blue';
  }

  return (
    <div className={`main-article-section ${sectionTheme}`}>
      <div className={`main-content-container main-content-padding`}>
        <div className="main-article-section__container columns is-gapless is-vcentered">
          <div className="column main-article-section__body">
            <h2 className="main-article-section__body__section">{section}</h2>
            <h1 className="main-article-section__body__title">{title}</h1>
            <HTMLContent
              content={caseStudy}
              className="main-article-section__body__case-study"
            />
          </div>
              <div className="column">
                {(!!cta && (!!_get(cta, 'link') && !!_get(cta, 'label')))  && (
                  <a className="main-article-section__link" href={cta.link}>
                    <p className="main-article-section__link__text">{cta.label}</p>
                    <img className="main-article-section__link__arrow" src={ArrowDown} alt="Arrow Down white" />
                  </a>
                )}
              </div>
        </div>
      </div>
    </div>
    
  );
}

export default MainArticleSecion;