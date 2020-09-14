const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const _isEmpty = require('lodash/isEmpty');
const getDigitalTransformationRelatedCaseStudies = require('./build-utils/getDigitalTransformationRelatedCaseStudies');
const getCompetenceCenterRelatedCaseStudies = require('./build-utils/getCompetenceCenterRelatedCaseStudies');
const getRelatedByTags = require('./build-utils/getRelatedByTags');

/**
 {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
 * */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    
    type Fluid implements Node {
      base64: String
      aspectRatio: String
      src: String
      srcSet: String
      sizes: String
    }
    
    type ImageByUrl implements Node {
      publicURL: String
    }

    type SocialImage implements Node {
      publicURL: String
    }
    
    
    type Section implements Node {
      intro: String,
      title: String,
      description: String
    }
    
    type Links implements Node {
      title: String,
      description: String,
      link: String,
      filedownload: ImageByUrl
    }
    type FormTexts implements Node {
      firstTitle: String,
      secondTitle: String,
      buttonText: String
    }
    
    type Offices implements Node {
      title: String,
      description: String,
      mapLink: String
    }
    
    type Partners implements Node {
      title: String,
      description: String
    }
    
    type Frontmatter @infer {
      relatedCategoryReference: String,
      digitalTransformationCategoryReference: [String],
      competenceCenterCategoryReference: [String],
      previewtitle: String,
      socialPreviewImage: SocialImage,
      customer: String,
      year: String,
      expertise: String,
      link: String,
      section: Section,
      formTexts: FormTexts,
      formId: String,
      fileDownloadLabel: String,
      offices: [Offices],
      partners: Partners
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ actions, graphql }) => {

  const { createPage } = actions
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
              author
              templateKey
              relatedCategoriesReference
              digitalTransformationCategoryReference
              competenceCenterCategoryReference
              title
              visible
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
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(edge => {
      const { id } = edge.node;
      const { relatedCategoriesReference, templateKey } = edge.node.frontmatter;
      const relatedContents = _.isEqual(templateKey, 'digital-transformation-page') ? getDigitalTransformationRelatedCaseStudies(relatedCategoriesReference, result.data.allMarkdownRemark.edges) : [];
      const competenceRelatedContents = _.isEqual(templateKey, 'competence-single-page') ? getCompetenceCenterRelatedCaseStudies(relatedCategoriesReference, result.data.allMarkdownRemark.edges) : [];
      const relatedContentByTags = _.isEqual(templateKey, 'case-study-page') === true ? getRelatedByTags(edge.node.frontmatter.tags, result.data.allMarkdownRemark.edges) : [];
      if (edge.node.frontmatter.visible !== false && !_isEmpty(templateKey)) {
        if (templateKey.indexOf('___data') > -1) return;
        console.log(`templateKey = ${templateKey}`);
        if (templateKey !== 'press-page') {
          // STRUCTURED DATA
          createPage({
            path: edge.node.fields.slug,
            tags: edge.node.frontmatter.tags,
            component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}/${String(edge.node.frontmatter.templateKey)}.js`),
            // additional data can be passed via context
            context: {
              id,
              relatedContents,
              competenceRelatedContents,
              relatedContentByTags
            },
          });
        } else {
          // UNSTRUCTURED DATA
          graphql(`
            {
              allMarkdownRemark(limit: 1000, filter: { frontmatter: { templateKey: { eq: "press-page" } } }) {
                edges {
                  node {
                    id
                    fields {
                      slug
                    }
                    frontmatter {
                      pageTitle
                      metaDescription
                      metaKeywords
                      socialPreviewImage{
                        publicURL
                      }
                      title
                      description
                      fileDownloadLabel
                      filedownload {
                        id
                        name
                        publicURL
                      }
                      links {
                        title
                        description
                        link
                        filedownload {
                          extension
                          publicURL
                        }
                      }
                      formId
                      formTexts {
                        firstTitle
                        secondTitle
                        buttonText
                      }
                    }
                  }
                }
              }
            }`).then(resultPressPage => {
            createPage({
              path: edge.node.fields.slug,
              tags: edge.node.frontmatter.tags,
              component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}/${String(edge.node.frontmatter.templateKey)}.js`),
              // additional data can be passed via context
              context: {
                id,
                resultPressPage,
              },
            });

          })
        }

      }
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })

    // Author posts pages:
    let authors = []
    // Iterate through each post, putting all found authors into `authors`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.author`)) {
        authors = authors.concat(edge.node.frontmatter.author)
      }
    })
    // Eliminate duplicate authors
    authors = _.uniq(authors)

    // Make tag pages
    authors.forEach(author => {
      const authorPath = `/authors/${_.kebabCase(author)}/`
      createPage({
        path: authorPath,
        component: path.resolve(`src/templates/author-posts/AuthorPosts.js`),
        context: {
          author,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    console.log(`value = ${value}`);
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
