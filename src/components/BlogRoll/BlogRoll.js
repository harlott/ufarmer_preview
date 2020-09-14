import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { Link, graphql, StaticQuery } from 'gatsby';
import _get from 'lodash/get';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import GradientTitle from '../GradientTitle/GradientTitle';
import Input from '../Input/Input';

import './blogRoll.scss';
import SearchComponent from '../SearchComponent/SearchComponent';
import { activate, deactivate } from '../../reducers/modal';
import UTILS from '../../utils';
import {HTMLContent} from "../Content";

class BlogRoll extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(deactivate());
  }

  constructor(props) {
    super(props)
    const { edges: posts } = this.props.data.allMarkdownRemark;
    this.state = {
      searchValue: '',
      tagFilter: '',
      filteredResources: posts,
    };

    this.categories = [
      {
        label: 'case study',
        tagValue: 'case-study-page',
        onClick: () => {
          this.filterByTemplateKey('case-study-page');
        }
      },
      {
        label: 'blog',
        tagValue: 'blog',
        onClick: () => {
          this.filterByCategory('blog');
        }
      },
      {
        label: 'ebook',
        tagValue: 'ebook',
        onClick: () => {
          this.filterByCategory('ebook');
        }
      },
      {
        label: 'eventi',
        tagValue: 'event-page',
        onClick: () => {
          this.filterByTemplateKey('event-page')
        }
      },
      {
        label: 'consulenza',
        tagValue: 'consulenza',
        onClick: () => {
          this.filterByCategory('consulenza')
        }
      }
    ];
  }

  onChangeSearch(searchValue) {
    this.setState({searchValue});
  }

  filterByCategory(cat){
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const filteredResources = posts.filter(post => {
      return post.node.frontmatter.category === cat;
    });
    this.setState({
      tagFilter: cat,
      filteredResources
    });
  }

  filterByTemplateKey(templateKey){
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const filteredResources = posts.filter(post => {
      return post.node.frontmatter.templateKey === templateKey;
    });
    this.setState({
      tagFilter: templateKey,
      filteredResources
    })
  }
  categoryHandler(category){
    let resCategory = '';
    if (category !== null && category !== 'undefined' && category !== 'null') {
      if (category.indexOf('data-') === -1) {
        resCategory = category.replace(/-/g, ' ');
      }
    }
    return resCategory;
  }

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
    const { dispatch  } = this.props;
    const { edges: posts } = this.props.data.allMarkdownRemark;

    let bgColorClass = null;
    let orderClass = null;
    let blockLevel = 1;
    let elementCounter = 1;
    let orderCounter = 'asc';
    return (
      <>
        <div className="BlogRoll__filters">
          <div className="BlogRoll__filters__search-input">
            <button type="button" className="BlogRoll__filters__search-input__search-button" onClick={()=> dispatch(activate())} >Cerca...</button>
          </div>
          <div className="BlogRoll__filters__buttons-filters">
            <span className="BlogRoll__filters__buttons-filters__label">Filtri</span>
            <span className="BlogRoll__filters__buttons-filters__buttons">
              {!!this.categories && (
                  this.categories.map((category) => {
                    return (
                        <Link
                            onClick={(e) => { e.preventDefault(); category.onClick(); }}
                            className={`Button filter-button${ category.tagValue === this.state.tagFilter ? ' active-filter':''}`}
                        >
                          {category.label}
                        </Link>
                    )}
                  )
              )}
            </span>
          </div>
        </div>
        <div className="main-content-container BlogRoll__entries-container">
          {this.state.filteredResources.map((currentPost, index) =>  {
            const { title, featuredimage, tags, category } = currentPost.node.frontmatter;
            if (!featuredimage) {
              bgColorClass = this.setBgColorByIndex(index + 1);
            }
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
                <div className="BlogRoll__entries-container__entry-block__entry-slug">{this.categoryHandler(category)}</div>
                <div className="BlogRoll__entries-container__entry-block__entry-title">{title}</div>
              </Link>
            );
          })}
        </div>
        <div className={`BlogRoll__modal-placeholder${ this.props.modalIsActive ? ' modal-is-open': ''}`}>
          <SearchComponent data={posts}/>
        </div>
      </>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

const mapStateToProps = (state) => {
  return {
    modalIsActive: state.modal.active,
  };
};

const ConnectedBlogRoll = connect(mapStateToProps)(BlogRoll);

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { in: ["blog-post", "event-page", "case-study-page"]}, visible: { eq: true } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              fields {
                slug
              }
              frontmatter {
                templateKey
                date(formatString: "MMMM DD, YYYY")
                title
                category
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 800, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                tags
                author
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ConnectedBlogRoll data={data} count={count} />}
  />
)
