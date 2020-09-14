import React from 'react';

import SafeImage from '../../components/SafeImage';

import './event.scss';
import TagsGroup from '../../components/TagsGroup/TagsGroup';
import { HTMLContent } from '../../components/Content';

const EventContent = ({pageTitle, title, image, description, date, place, price, tags, program }) => (
  <div className="event">
    <div className="event__block">
      <div className="event__block__page-title">
        <SafeImage className="event__block__page-title__image-title" title={pageTitle} alt={title} image={image} />
        <div className="main-content-container main-content-padding event__block__page-title__text-block">
          <h2 className="event__block__page-title__text-block__category">EVENTO</h2>
          <h3 className="event__block__page-title__text-block__title">{title}</h3>
        </div>
      </div>
    </div>
    <div className="event__page-content">
      <div className="main-content-container main-content-padding">
        <div className="columns">
          <div className="event__page-content__event-details column">
            <div className="event__page-content__event-details__content">
              <div className="event__page-content__event-details__content__resume">
                <div className="event__page-content__event-details__content__resume__block">
                  <span className="event__page-content__event-details__content__resume__block__title">Data evento</span>
                  <span className="event__page-content__event-details__content__resume__block__content">{date || '--/--/----'}</span>
                </div>
                <div className="event__page-content__event-details__content__resume__block">
                  <span className="event__page-content__event-details__content__resume__block__title">Luogo</span>
                  <span className="event__page-content__event-details__content__resume__block__content">{place || '--'}</span>
                </div>
                <div className="event__page-content__event-details__content__resume__block">
                  <span className="event__page-content__event-details__content__resume__block__title">Costo</span>
                  <span className="event__page-content__event-details__content__resume__block__content">{price || '--'}</span>
                </div>
              </div>
              <div className="event__page-content__event-details__content__tags">
                <TagsGroup tags={tags} />
              </div>
            </div>
          </div>
          <div className="column is-one-third-tablet event__page-content__blank" />
        </div>
        <div className="columns">
          <div className="event__page-content__event-details column not-margin">
            <div className="event__page-content__event-details__content">
              <div className="event__page-content__event-details__content__event-content">
                <HTMLContent content={description} className="event__page-content__event-details__content__event-content__html-content" />
              </div>
            </div>
          </div>
          <div className="column is-one-third-tablet event__page-content__blank" />
        </div>
      </div>
    </div>
    {!!program && (
        <div className="event__program">
          <div className="main-content-container main-content-padding">
            <h1 className="event__program__title">{program.title}</h1>
            <div className="columns event__program__content">
              <div className="column event__program__content__block">
                <HTMLContent content={program.description} className="event__program__content__block__html-content" />
              </div>
              <div className="column event__program__content__block">
              <HTMLContent content={program.descriptioncolumn} className="event__program__content__block__html-content" />
              </div>
            </div>
          </div>
        </div>
    )}
  </div>
);

export default EventContent;