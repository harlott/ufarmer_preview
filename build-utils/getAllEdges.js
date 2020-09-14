const getAllEdges = (graphql) => {
    return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              relatedCategoriesReference
              digitalTransformationCategoryReference
              title
              featuredimage{
                childImageSharp {
                  fluid(maxWidth: 800, quality: 64) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
            }
              description
            }
          }
        }
      }
    }
  `);
} 

module.exports = getAllEdges;