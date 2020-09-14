import React from 'react';
import _get from 'lodash/get';

import SafeImage from '../../components/SafeImage';
import SolutionArticleSection from '../../components/SolutionArticleSection/SolutionArticleSection';

import './case-study.scss';
import TagsGroup from '../../components/TagsGroup/TagsGroup';
import SectorCardsContainer from '../../components/SectorCardsContainerComponent/SectorCardsContainer';
import GalleryComponent from '../../components/GalleryComponent/GalleryComponent';
import TestimonialsContainer from '../../components/TestimonialsComponent/TestimonialsContainer';
import { HTMLContent } from '../../components/Content';

const CaseStudyContent = ({pageTitle, title, image, resume, description, sections, tags, gallery, testimonials, results }) => (
  <div className="case-study">
    <div className="case-study__block">
      <div className="case-study__block__page-title">
        <SafeImage className="case-study__block__page-title__image-title" title={pageTitle} alt={title} image={image} />
        <div className="main-content-container main-content-padding case-study__block__page-title__text-block">
          <h2 className="case-study__block__page-title__text-block__category">CASE STUDY</h2>
          <h3 className="case-study__block__page-title__text-block__title">{title}</h3>
        </div>
      </div>
    </div>
    <div className="case-study__page-content">
      <div className="main-content-container main-content-padding">
        <div className="columns">
          <div className="column is-one-third-tablet case-study__page-content__client-resume">
            {!!resume.customer && (
                <div className="case-study__page-content__client-resume__info-block">
                  <h3 className="case-study__page-content__client-resume__info-block__title">Cliente</h3>
                  <p className="case-study__page-content__client-resume__info-block__text">{resume.customer}</p>
                </div>
            )}
            {!!resume.year && (
                <div className="case-study__page-content__client-resume__info-block">
                  <h3 className="case-study__page-content__client-resume__info-block__title">Data</h3>
                  <p className="case-study__page-content__client-resume__info-block__text">{resume.year}</p>
                </div>
            )}
            {!!resume.expertise && (
                <div className="case-study__page-content__client-resume__info-block">
                  <h3 className="case-study__page-content__client-resume__info-block__title">Expertise CWS</h3>
                  <HTMLContent className="case-study__page-content__client-resume__info-block__text" content={resume.expertise} />
                </div>
            )}
            {!!resume.link && (
                <div className="case-study__page-content__client-resume__info-block">
                  <h3 className="case-study__page-content__client-resume__info-block__title">Url</h3>
                  <a href={resume.link} target="_blank" className="case-study__page-content__client-resume__info-block__link">{resume.link}</a>
                </div>
            )}

          </div>
          <div className="case-study__page-content__client-history column">
            <div className="case-study__page-content__client-history__content">
              <div className="case-study__page-content__client-history__content__introduction">
                <HTMLContent content={description} className="solution-article-section__body__description"/>
              </div>
              {!!sections && (
                  sections.map(section => (
                      <div className="case-study__text-block">
                        <SolutionArticleSection
                            theme="blue"
                            intro={section.intro}
                            title={section.title}
                            description={section.description}
                        />
                      </div>
                  ))
              )}
              {!!tags && (
                  <div className="case-study__page-content__client-history__content__tags">
                    <TagsGroup tags={tags} />
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    {!!gallery && (
        <GalleryComponent data={gallery} />
    )}
    {!!testimonials && _get(testimonials, 'length', 0) > 0 && (
        <TestimonialsContainer data={testimonials} />
    )}
    {!!results && (
        <SectorCardsContainer theme="blue" title="Risultati" cards={results} />
    )}
  </div>
);

export default CaseStudyContent;