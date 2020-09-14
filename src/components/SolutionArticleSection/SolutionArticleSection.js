import React from 'react';
import _get from 'lodash/get';

import { HTMLContent } from '../Content';
import './solutionArticleSection.scss';

const SolutionArticleSection = ({theme, intro, title, description, single = false}) => {
  let sectionTheme = ``;

  switch(theme) {
    case 'blue':
      sectionTheme = 'solution-article-theme-blue';
      break;
    case 'grey':
      sectionTheme = `solution-article-theme-${theme}`;
      break;
    default:
      sectionTheme = 'solution-article-theme-blue';
  }

  return (
    <div className={`solution-article-section ${sectionTheme}`}>
        <div className="columns is-gapless is-vcentered solution-article-section__container">
          <div className="column solution-article-section__body">
            {_get(intro, 'length', 0) > 0 &&
              <h2 className="solution-article-section__body__intro">{intro}</h2>
            }
            {_get(title, 'length', 0) > 0 &&
              <h1 className="solution-article-section__body__title">{title}</h1>
            }
            <HTMLContent
              content={description}
              className="solution-article-section__body__description"
            />   
          </div>
          {single &&
            <div className="column column-placeholder" />
          }
        </div>
    </div>
  );
}

export default SolutionArticleSection;