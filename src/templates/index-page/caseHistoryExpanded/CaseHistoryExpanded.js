import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import _get from 'lodash/get';
import './case-history-expanded.scss';

import nullImg from '../../../../static/img/null.png';

class CaseHistoryExpanded extends React.PureComponent {
  constructor(props){
    super(props);
    this.sliderItems = [];
    this.sliderImageItems = [];
    this.contentCurrentX = 0;
    this.imageCurrentX = 0;
    this.itemClientWidth = null;
    
    this.state = {
      current: 0,
    };
  }

  prev = () => { 
    if (this.state.current > 0) {
      const { current } = this.state;
      const contentElement = this.sliderItems[0];
      const imageElement = this.sliderImageItems[current];
      const imageClientInfo = imageElement.getBoundingClientRect(); 
      this.contentCurrentX += contentElement.clientWidth;
      contentElement.style.marginLeft = `${this.contentCurrentX}px`;
      this.sliderImageItems[current - 1].style.width = `${imageClientInfo.width}px`;
      setTimeout(
        () => {
          this.sliderImageItems[current - 1].style.transform = 'translate(4%, 0%) matrix(1, 0, 0, 1, 0, 0)';
        },
        700
      );
      this.setState((prevState) => ({ current: prevState.current - 1 }));
    }
  }

  next = () => {
    if (this.state.current < this.props.data.allMarkdownRemark.totalCount - 1) {
      const { current } = this.state;
      const contentElement = this.sliderItems[0];
      const imageElement = this.sliderImageItems[current];
      this.imageClientInfo = imageElement.getBoundingClientRect(); 
      this.imageCurrentX = this.imageClientInfo.x;
      this.contentCurrentX -= contentElement.clientWidth;
      this.imageCurrentX -= imageElement.clientWidth; 
      contentElement.style.marginLeft = `${this.contentCurrentX}px`;
      this.sliderImageItems[current].style.width = '0px';
      setTimeout(
        () => {
          this.sliderImageItems[current + 1].style.transform = 'translate(3%, 0%) matrix(1, 0, 0, 1, 0, 0)';
        },
        700
      );
      this.setState((prevState) => ({ current: prevState.current + 1}));
    }  
  }
  
  render(){
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return(
      <>
        <section id="home__case-history-expanded" className="home__case-history-expanded">
          <div className="main-content-container main-content-padding">
            <div className="home__case-history-expanded__title">
                <h4 class=" has-text-weight-bold uppercase">CASE STUDY</h4>
            </div>
            <div className="home__case-history-expanded__bg-container__pagination">
              <div className="arrow-left" onClick={() => {this.prev()}} /> 
              <div className="tot-items">{this.state.current + 1} / {data.allMarkdownRemark.totalCount}</div>
              <div className="arrow-right" onClick={() => this.next(data.allMarkdownRemark.totalCount)} />
            </div>

            <div ref={node => {this.itemsContainer = node}} className="full-width columns is-mobile is-gapless home__case-history__contents-container">
              <div className="slider-container column">
                <div className="overflow-container" style={{width: '470px', overflow: 'hidden'}}>
                  <div className="content-container columns">
                    {posts &&
                      posts.map(({ node: post }, idx) => (
                              <article
                                  ref={node => (this.sliderItems[idx] = node) }
                                  id={`item-${idx}`}
                                  key={post.id}
                                  className="home__case-history-expanded__bg-container is-full"
                                >
                                <Link
                                  className="home__case-history-expanded__bg-container__content"
                                  to={post.fields.slug}
                                >
                                    <div className="year">{post.frontmatter.year}</div>
                                    <div className="title">{post.frontmatter.previewtitle || post.frontmatter.title}</div>
                                    <div className="place">{post.frontmatter.place}</div>
                                </Link>
                              </article>
                      )
                    )}
                  </div>  
                </div>
              </div>

              <div className="slider-container column">
                <div className="overflow-container" style={{overflow: 'hidden'}}>
                  <div className="image-over-container columns">
                    {posts &&
                      posts.map(({ node: post }, idx) => (
                        <div
                          className="image-container column is-full"
                          id={`item-image-${idx}`}
                          style={
                            {
                              backgroundImage: `url('${_get(post.frontmatter.featuredimage, 'childImageSharp.fluid.src', nullImg)}')`,
                            }
                          }
                          ref={node => (this.sliderImageItems[idx] = node) }
                        >
                      </div>
                      )
                    )}
                  </div>  
                </div>
              </div>          
            </div>
          </div>
        </section>
      </>
    )
  }  
}

export default () => (
    <StaticQuery
      query={graphql`
        query CaseHistoryExpandedQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "case-study-page" } } }
          ) {
            totalCount
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  year
                  place
                  previewtitle
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 1600, quality: 80) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <CaseHistoryExpanded data={data} count={count} />}
    />
  )
  
