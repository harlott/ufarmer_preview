import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ContentRoll from '../components/BlogRoll/ContentRoll'
import ContactFormComponent from '../components/ContactFormComponent/ContactFormComponent'
import UTILS from '../utils'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title

    return (
      <Layout theme="black">
        <Helmet title={`${tag} | ${title}`} />
        <ContentRoll section="tag" title={UTILS.tagFormatter(tag, true)} posts={posts} fixedLevel={2}/>
        <ContactFormComponent firstTitle="Vuoi rimanere aggiornato sulle ultime news?" secondTitle="Iscriviti alla Newsletter" buttonText="Iscriviti" />
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`
