import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby'

import StrokeGradientTitle from '../../../components/StrokeGradientTitle/StrokeGradientTitle';
import GradientLinkButton from '../../../components/GradientButton/GradientLinkButton';
import './competence-center.scss';

class CompetenceCenter extends React.PureComponent {
    render(){
        const { data } = this.props;
        const { edges: posts } = data.allMarkdownRemark;
        return (
            <div className="home__competence home-section">
                <div className="main-content-container main-content-padding">
		              <div className="home__competence__title">
                    <StrokeGradientTitle className="competence" strokeWidth={2} direction='bottomLeft-topRight' fontColor="#110553" colors={["#29E7D6", "#2df77f"]} text="COMPETENCE CENTER" />
                  </div>

                  <div className="home__competence__container main-content-padding">
                      {posts &&
                          posts.map(
                              ({ node: post }) => (
                                  <>
                                  <div key={post.fields.id} className="home__competence__link">
                                      <Link 
                                        className="has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-widescreen"
                                        to={post.fields.slug}
                                      >
                                        <span className="text">{post.frontmatter.title}</span>
                                      </Link>
                                  </div>
                                  <div className="home__competence__link__separator" />
                                </>
                              )
                          )
                      }
                      <div className="home__competence__action">
                        <GradientLinkButton
                          centeredContent
                          path="/competence-center"
                          direction="left-right"
                          colors={["#29e7d6", "#2df77f"]}
                          fontColor="#ffffff"
                          baseColor="#110553"
                        >
                          Scopri tutti i competence
                        </GradientLinkButton>
                      </div>
                  </div>
                </div>
                    
            </div>
        )
    }
}

export default () => (
    <StaticQuery
      query={graphql`
        query CompetenceCenterListQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "competence-single-page" } } }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <CompetenceCenter data={data} count={count} />}
    />
  )
  
