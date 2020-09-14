import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import _get from 'lodash/get';
import './case-history.scss';

import nullImg from '../../../../static/img/null.png';

class CaseHistory extends React.PureComponent {
  constructor(props){
    super(props);
    this.sliderItems = [];
    this.currentX = 0;
    this.itemClientWidth = null;
    
    this.state = {
      current: 0,
    };
  }

  prev = () => {
    let newCurrentId = this.state.current;

    if (newCurrentId === 0) {
      newCurrentId = this.props.data.allMarkdownRemark.totalCount - 1; 
    } else {
      newCurrentId = newCurrentId - 1;
    }

    // if (this.state.current > 0) {
    if (this.itemClientWidth === null) {
      // this.itemClientWidth = this.sliderItems[this.state.current].clientWidth; 
      this.itemClientWidth = this.sliderItems[this.state.current].clientWidth; 
    }

    if (newCurrentId === this.props.data.allMarkdownRemark.totalCount - 1) {
      this.currentX = -(this.itemClientWidth * (this.props.data.allMarkdownRemark.totalCount - 1));
    } else {
      this.currentX = this.currentX + this.itemClientWidth;
      //this.currentX = 0;
    }
    
    this.itemsContainer.style.marginLeft = `${this.currentX}px`;

    this.setState(() => ({ current: newCurrentId }));
      // this.setState((prevState) => ({ current: prevState.current - 1 }));
    //}
  }

  next = () => {
    let newCurrentId = this.state.current;
    // if (this.state.current < this.props.data.allMarkdownRemark.totalCount - 1) {

    if (newCurrentId < this.props.data.allMarkdownRemark.totalCount - 1) {
      newCurrentId = newCurrentId + 1;
    } else {
      newCurrentId = 0; 
    }

    if (this.itemClientWidth === null) {
      // this.itemClientWidth = this.sliderItems[this.state.current].clientWidth; 
      this.itemClientWidth = this.sliderItems[this.state.current].clientWidth; 
    }
    
    if (newCurrentId === 0) {
      this.currentX = 0;
    } else {
      this.currentX = this.currentX - this.itemClientWidth;
    }

    this.itemsContainer.style.marginLeft = `${this.currentX}px`;

    this.setState(() => ({ current: newCurrentId }));
      // this.setState((prevState) => ({ current: prevState.current + 1}));
    // }  
  }
  
  render(){
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return(
      <>
        <section id="home__case-history" className="home__case-history">
          <div className="home__case-history__title">
              <h4 class=" has-text-weight-bold uppercase">CASE STUDY</h4>
          </div>
          <div ref={node => {this.itemsContainer = node}} className="full-width columns is-mobile is-gapless home__case-history__contents-container">
            {posts &&
              posts.map(({ node: post }, idx) => (
                <article
                  ref={node => (this.sliderItems[idx] = node) }
                  id={`item-${idx}`}
                  key={post.id}
                  className="home__case-history__bg-container is-full"
                  style={
                    {
                      backgroundImage: `url('${_get(post.frontmatter.featuredimage, 'childImageSharp.fluid.src', nullImg)}')`,
                    }
                  }
                >
                  <Link
                    className="home__case-history__bg-container__content"
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
          <div className="home__case-history__bg-container__pagination">
            <div className="arrow-left" onClick={() => {this.prev()}} /> 
            <div className="tot-items">{this.state.current + 1} / {data.allMarkdownRemark.totalCount}</div>
            <div className="arrow-right" onClick={() => this.next(data.allMarkdownRemark.totalCount)} />
          </div>
        </section>
      </>
    )
  }  
}

export default () => (
    <StaticQuery
      query={graphql`
        query CaseHistoryPreviewQuery {
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
                      fluid(maxWidth: 1024, quality: 80) {
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
      render={(data, count) => <CaseHistory data={data} count={count} />}
    />
  )
  
