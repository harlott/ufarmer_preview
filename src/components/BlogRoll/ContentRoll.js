import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import _get from 'lodash/get';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import GradientTitle from '../GradientTitle/GradientTitle';

import './blogRoll.scss';
import UTILS from '../../utils';

class ContentRoll extends React.Component {
  setBgColorByIndex(index) {
    if (index % 3 === 0) {
      return ' bg-green';
    }
    if (index % 2 === 0) {
      return ' bg-blue';
    }
    return ' bg-magenta';
  }

  setBlockLevelByCounter(level) {
    if (level === 3) return 'BlogRoll__entries-container__entry-block__level-three';
    if (level === 2) return 'BlogRoll__entries-container__entry-block__level-two';
    return 'BlogRoll__entries-container__entry-block__level-one';
  }

  render() {
    let bgColorClass = null;
    let orderClass = null;
    let blockLevel = 1;
    let elementCounter = 1;
    let orderCounter = 'asc';
    return (
      <>
        <div className="BlogRoll__top-container">
          <div className="main-content-container main-content-padding">
            <p className="BlogRoll__section">{this.props.section}</p>
            <h1 className="BlogRoll__title"><GradientTitle direction="left-right" colors={['#4500ce', '#ff007b']} text={this.props.title} /></h1>
          </div>
        </div>
        <div className="main-content-container BlogRoll__entries-container">
          {_get(this.props, 'posts', null) && _get(this.props.posts, 'length', 0) > 0 && this.props.posts.map((currentPost, index) =>  {
            const { title, featuredimage, tags } = currentPost.node.frontmatter;
            if (!featuredimage) {
              bgColorClass = this.setBgColorByIndex(index + 1);
            }
            if (this.props.fixedLevel === 0) {
              orderClass = this.setBlockLevelByCounter(blockLevel);
              if (elementCounter === blockLevel) {
                if (blockLevel === 3) {
                  orderCounter = 'dsc';
                } else if (blockLevel === 1) {
                  orderCounter = 'asc';
                }
  
                elementCounter = 1;
                if (orderCounter === 'asc') {
                  blockLevel++;
                }
                else if (orderCounter === 'dsc') {
                  blockLevel--;
                }
              } else {
                elementCounter++;
              }
            } else {
              orderClass = this.setBlockLevelByCounter(this.props.fixedLevel);
            }
            return (
              <Link key={`BlogRoll-post-${index}`} className={`BlogRoll__entries-container__entry-block${!featuredimage ? bgColorClass : ''} ${orderClass}`} to={currentPost.node.fields.slug}>
                {!!featuredimage &&
                  <div className="BlogRoll__entries-container__entry-block__entry-image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: featuredimage,
                        alt: `featured image thumbnail for post ${title}`,
                      }}
                    />
                  </div>
                }
                {!!tags && _get(tags, 'length',0) > 0 &&
                  <div className="BlogRoll__entries-container__entry-block__entry-tags">
                    {tags.map( (currentTag, tagIndex) => (
                      <Link key={`BlogRoll-post-${index}-tag-${tagIndex}`} className="BlogRoll__entries-container__entry-block__entry-tags__tag" to={`/tags/${currentTag}`}>{UTILS.tagFormatter(currentTag)}</Link>
                    ))}
                  </div>
                }
                <div className="BlogRoll__entries-container__entry-block__entry-slug"></div>
                <div className="BlogRoll__entries-container__entry-block__entry-title">{title}</div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}

ContentRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  fixedLevel: PropTypes.number
}

ContentRoll.defaultProps = {
  fixedLevel: 0,
}

export default ContentRoll;
