import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { startCase, toLower } from 'lodash';
import Layout from '../../components/Layout'
import ContentRoll from '../../components/BlogRoll/ContentRoll'
import ContactFormComponent from '../../components/ContactFormComponent/ContactFormComponent'

const formatAuthor = (author) => (startCase(toLower((author.replace("-", " ")))));

class AuthorPostsRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const author = formatAuthor(this.props.pageContext.author)
    const title = this.props.data.site.siteMetadata.title

    return (
      <Layout theme="black">
        <Helmet title={`${author} | ${title}`} />
        <ContentRoll section="autore" title={author} posts={posts} />
        <ContactFormComponent firstTitle="Vuoi rimanere aggiornato sulle ultime news?" secondTitle="Iscriviti alla Newsletter" buttonText="Iscriviti" />
      </Layout>
    )
  }
}

export default AuthorPostsRoute

export const authorPostPageQuery = graphql`
  query AuthorPostPage($author: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
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
