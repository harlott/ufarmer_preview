import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import { startCase, toLower } from 'lodash'; 
import _get from 'lodash/get';

import ArticleHeaderImage from './ArticleHeaderImage';
import ArticleHeader from './ArticleHeader';
import TagsGroup from '../TagsGroup/TagsGroup';
import { HTMLContent } from '../Content';
import SafeImage from '../SafeImage';

import ArrowDown from '../../../static/img//arrow_down-white.svg';
import './articleContent.scss';
import { Link } from 'gatsby';
import ButtonDownload from "../ButtonDonwload";

const formatAuthor = (author) => (startCase(toLower((author.replace("-", " ")))));

const ArticleContent = ({ type, title, cover, formId, formLabel, preview, theme, author, date, tags, description, quoted, blocks }) => {
  return (
  <>
    {!!cover && 
      <ArticleHeaderImage title={title} type={type} image={cover} theme={theme} />
    }
    {!cover && 
      <ArticleHeader title={title} type={type} theme="white" />
    }
    <div className="article-content">
      <div className="main-content-container main-content-padding">
        <div className="columns">
          <div className="article-content__article-details column is-two-third-tablet">
            <div className="article-content__article-details__content">
              <div className="article-content__article-details__content__resume">
                {_get(author, 'length',0) > 0 &&
                  <div className="article-content__article-details__content__resume__block">
                    <span className="article-content__article-details__content__resume__block__title">Autore</span>
                    <Link to={`/authors/${author}`} className="article-content__article-details__content__resume__block__link">{formatAuthor(author)}</Link>
                  </div>
                }
                {_get(date, 'length', 0) > 0 &&
                  <div className="article-content__article-details__content__resume__block">
                    <span className="article-content__article-details__content__resume__block__title">Data</span>
                    <span className="article-content__article-details__content__resume__block__content">{date}</span>
                  </div>
                }
              </div>
              {_get(tags, 'length', 0 ) > 0 && 
                <div className="article-content__article-details__content__tags">
                  <TagsGroup tags={tags} />
                </div>
              }
            </div>
          </div>
          {formId  && !preview &&
            <ButtonDownload
              formId={formId}
              label={formLabel}
            />
          }
          {!formId  && !preview &&
            <div className="column is-one-third-tablet article-content__blank" />
          }
        </div>
        <div className="columns">
          <div className="article-content__article-details column not-margin">
            <div className="article-content__article-details__article-body">
              <div className="article-content__article-details__article-body__text-content">
                <HTMLContent className="article-content__html-main-content" content={description} />
              </div>
              {_get(quoted, 'length', 0) > 0 &&
                <div className="article-content__article-details__article-body__quoted-content">
                  <HTMLContent className="article-content__html-main-quoted" content={quoted} />
                </div>
              }
            </div>
          </div>
          <div className="column is-one-third-tablet article-content__blank" />
        </div>
        { _get(blocks, 'length', 0) > 0 && blocks.map((currentBlock, index) => (
          <div className="article-content__article-details__article-body__article-block" key={`article-block-${index + 1}`}>
            <div className="columns">
              <div className="article-content__article-details column not-margin">
                <div className="article-content__article-details__article-body">
                {!!_get(currentBlock, 'title', null) &&
                  <h2 className="article-content__article-details__article-body__title-block">
                    <ReactMarkdown
                        source={currentBlock.title}
                        escapeHtml={false}
                    />
                  </h2>
                }
                {!!_get(currentBlock, 'description', null) &&
                  <div className="article-content__article-details__article-body__text-content">
                    <HTMLContent className="article-content__html-content" content={currentBlock.description} />
                  </div>
                }
                </div>
              </div>
              <div className="column is-one-third-tablet article-content__blank" />
            </div>
            {currentBlock.image &&
              <div className="columns">
                <div className="article-content__article-details column not-margin">
                  <div className="article-content__article-details__article-body">
                    <SafeImage className="article-content__article-details__article-body__image-content" title={`Featured image for article block ${currentBlock.title}`} alt={currentBlock.title} image={currentBlock.image} />
                  </div>
                </div>
              </div>
            }
            {(!!currentBlock.filedownload && (!!_get(currentBlock.filedownload, 'publicURL') && !!_get(currentBlock.filedownload, 'name')))  && (
              <div className="columns">
                <div className="article-content__article-details column not-margin">
                  <div className="article-content__article-details__article-body">
                    <a className="article-content__article-details__article-body__donwload-link" href={currentBlock.filedownload.publicURL} target="_blank">
                      <p className="article-content__article-details__article-body__donwload-link__text">{currentBlock.filedownload.name}</p>
                      <img className="article-content__article-details__article-body__donwload-link__arrow" src={ArrowDown} alt="Arrow Down white" />
                    </a>
                  </div>
                </div>
                <div className="column is-one-third-tablet article-content__blank" />
              </div>
            )}
            {currentBlock.quoted &&
              <div className="columns">
                <div className="article-content__article-details column not-margin">
                  <div className="article-content__article-details__article-body">
                    <div className="article-content__article-details__article-body__text-content">
                      <div className="article-content__article-details__article-body__quoted-content">
                        <HTMLContent className="article-content__html-quoted" content={currentBlock.quoted} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-one-third-tablet article-content__blank" />
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  </>
)};

export default ArticleContent;