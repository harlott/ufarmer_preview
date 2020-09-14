import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import _get from 'lodash/get';
import _map from 'lodash/map';
import './case-study-expanded.scss';

import arrowLeft from '../../../../static/img/arrow_left-slider.png';
import arrowRight from '../../../../static/img/arrow_right-slider.svg';

import nullImg from '../../../../static/img/null.png';

class CaseStudyExpanded extends React.PureComponent {
  constructor(props){
    super(props);
    this.content = [];
    this.maxCount = _get(this.props, 'data.allMarkdownRemark.totalCount', 0);
    if (this.maxCount > 0) {
      _map(_get(this.props, 'data.allMarkdownRemark.edges', null), current => {
        this.content.push({
          image: _get(current, 'node.frontmatter.featuredimage.childImageSharp.fluid.src', nullImg),
          title: _get(current, 'node.frontmatter.previewtitle', null) || _get(current, 'node.frontmatter.title', null),
          year: _get(current, 'node.frontmatter.year', '-'),
          place: _get(current, 'node.frontmatter.place', '-'),
          slug: _get(current, 'node.fields.slug', null)
        })
      });
    }
    this.state = {
      prevIndex: this.maxCount > 0 ? this.maxCount - 1 : 0,
      currentIndex: 0,
      currentIndexDisplay: 1,
      nextIndex: this.maxCount > 0 ? 1 : 0,
      transition: 'none',
      blocked: false,
    };
  }

  startTransition(transition) {
    if (!this.state.blocked) {
      let currentIndexDisplay = this.state.currentIndexDisplay;
      if (transition === 'previous') {
        currentIndexDisplay--;
        if (currentIndexDisplay < 1) {
          currentIndexDisplay = this.maxCount;
        }
      }
      if (transition === 'next') {
        currentIndexDisplay++;
        if (currentIndexDisplay > this.maxCount) {
          currentIndexDisplay = 1;
        }
      }
      this.setState({ transition, currentIndexDisplay, blocked: true }, () => {
        setTimeout(() => {
          this.calculateNewIndex();
        }, 1000);
      })
    }
  }

  calculateNewIndex() {
    const transition = 'none';
    const blocked = false;
    let prevIndex = 0;
    let currentIndex = 0;
    let nextIndex = 0;
    if (this.state.transition === 'previous') {
      currentIndex = this.state.currentIndex - 1;
      if (currentIndex < 0) {
        currentIndex = this.maxCount - 1;
      }
    }
    if (this.state.transition === 'next') {
      currentIndex = this.state.currentIndex + 1;
      if (currentIndex > this.maxCount - 1) {
        currentIndex = 0;
      }
    }
    prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.maxCount - 1;
    }
    nextIndex = currentIndex + 1;
    if (nextIndex > this.maxCount - 1) {
      nextIndex = 0;
    }
    if (this.state.transition === 'next') {
      this.setState({
        prevIndex,
        currentIndex
      }, () => {
        setTimeout(() => {
          this.setState({
            nextIndex,
            transition,
            blocked
          })
        }, 500)
      });
    } else {
      this.setState({
        nextIndex,
        currentIndex
      }, () => {
        setTimeout(() => {
          this.setState({
            prevIndex,
            transition,
            blocked
          })
        }, 500)
      });
    }
  }
  
  calculateAdditionalClassForPrev() {
    switch(this.state.transition) {
      case 'previous':
        return ' execute-transition prev-becomes-current';
      case 'next':
      case 'none':
      default:
        return '';
    }
  }
  
  calculateAdditionalClassForCurrent() {
    switch(this.state.transition) {
      case 'previous':
        return ' execute-transition current-becomes-next';
      case 'next':
        return ' execute-transition current-becomes-prev';
      case 'none':
      default:
        return '';
    }
  }
  
  calculateAdditionalClassForNext() {
    switch(this.state.transition) {
      case 'next':
      return ' execute-transition next-becomes-current';
      case 'previous':
      case 'none':
      default:
        return '';
    }
  }


  render() {
    const additionalClassPrev = this.calculateAdditionalClassForPrev();
    const additionalClassCurrent = this.calculateAdditionalClassForCurrent();
    const additionalClassNext = this.calculateAdditionalClassForNext();
    if (this.maxCount > 0 && !!this.content) {
      return (
        <>
          <section id="case-study-expanded" className="case-study-expanded">
            <div className="main-content-container main-content-padding">
              <div className="case-study-expanded__container">
                <h2 className="case-study-expanded__container__title">Case study</h2>
                <div className="case-study-expanded__container__carousel">
                  <div className="case-study-expanded__container__carousel__text-placeholder">
                      <span className={`case-study-expanded__container__carousel__text-placeholder__text-block previous-block${additionalClassPrev}`}>
                        <h3 className="case-study-expanded__container__carousel__text-placeholder__text-block__year">{this.content[this.state.prevIndex].year}</h3>
                        <h2 className="case-study-expanded__container__carousel__text-placeholder__text-block__title">{this.content[this.state.prevIndex].title}</h2>
                        <h3 className="case-study-expanded__container__carousel__text-placeholder__text-block__place">{this.content[this.state.prevIndex].place}</h3>
                      </span>
                      <Link
                        className={`case-study-expanded__container__carousel__text-placeholder__text-block${additionalClassCurrent}`}
                        to={this.content[this.state.currentIndex].slug}
                      >
                        <h3 className="case-study-expanded__container__carousel__text-placeholder__text-block__year">{this.content[this.state.currentIndex].year}</h3>
                        <h2 className="case-study-expanded__container__carousel__text-placeholder__text-block__title">{this.content[this.state.currentIndex].title}</h2>
                        <h3 className="case-study-expanded__container__carousel__text-placeholder__text-block__place">{this.content[this.state.currentIndex].place}</h3>
                      </Link>
                      <span className={`case-study-expanded__container__carousel__text-placeholder__text-block next-block${additionalClassNext}`}>
                        <h3 className="case-study-expanded__container__carousel__text-placeholder__text-block__year">{this.content[this.state.nextIndex].year}</h3>
                        <h2 className="case-study-expanded__container__carousel__text-placeholder__text-block__title">{this.content[this.state.nextIndex].title}</h2>
                        <h3 className="case-study-expanded__container__carousel__text-placeholder__text-block__place">{this.content[this.state.nextIndex].place}</h3>
                      </span>
                  </div>
                  <div className="case-study-expanded__container__carousel__image-placeholder">
                    <img className={`case-study-expanded__container__carousel__image-placeholder__image-block previous-image${additionalClassPrev}`} src={this.content[this.state.prevIndex].image} alt={this.content[this.state.prevIndex].title}/>
                    <img className={`case-study-expanded__container__carousel__image-placeholder__image-block${additionalClassCurrent}`} src={this.content[this.state.currentIndex].image} alt={this.content[this.state.currentIndex].title}/>
                    <img className={`case-study-expanded__container__carousel__image-placeholder__image-block next-image${additionalClassNext}`} src={this.content[this.state.nextIndex].image} alt={this.content[this.state.nextIndex].title}/>
                  </div>
                  <div className="case-study-expanded__container__carousel__scroll-placeholder">
                    <span className="case-study-expanded__container__carousel__scroll-placeholder__arrow" onClick={() => this.startTransition('previous')}>
                      <img  className="arrow-left" src={arrowLeft} alt="arrow left carousel case study"/>
                    </span>
                    <span className="case-study-expanded__container__carousel__scroll-placeholder__indicator">{`${this.state.currentIndexDisplay} / ${this.maxCount}`}</span>
                    <span className="case-study-expanded__container__carousel__scroll-placeholder__arrow" onClick={() => this.startTransition('next')}>
                      <img className="arrow-right" src={arrowRight} alt="arrow rigth carousel case study"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
    return null;
  }  
}

export default () => (
    <StaticQuery
      query={graphql`
        query CaseStudyExpandedQuery {
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
      render={(data, count) => <CaseStudyExpanded data={data} count={count} />}
    />
  )
  
