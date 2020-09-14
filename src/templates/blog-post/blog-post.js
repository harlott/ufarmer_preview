import React from "react";
import PropTypes from "prop-types";
import _get from "lodash/get";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout";
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SEO from "../../components/Seo";

export const BlogPostTemplate = ({
  description,
  quoted,
  tags,
  type,
  title,
  cover,
  formId,
  formLabel,
  date,
  author,
  blocks,
  preview,
}) => {
  return (
      <ArticleContent
        theme="pink"
        type={type}
        title={title}
        cover={cover}
        author={author}
        date={date}
        formId={formId}
        formLabel={formLabel}
        description={description}
        quoted={quoted}
        tags={tags}
        blocks={blocks}
        preview={preview}
      />
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  let theme = null;
  if (!_get(post.frontmatter, "featuredimage", null)) {
    theme = "black";
  }


  return (
    <>
      <Layout
          theme={theme}>
        <SEO
            lang={"it"}
            title={post.frontmatter.pageTitle}
            description={post.frontmatter.metaDescription}
            keywords={post.frontmatter.metaKeywords}
            image={post.frontmatter.socialPreviewImage}
            path={data.markdownRemark.fields.slug}
        />
        <BlogPostTemplate
          description={post.frontmatter.description}
          date={post.frontmatter.date}
          author={post.frontmatter.author}
          tags={post.frontmatter.tags}
          type={post.frontmatter.subtitle}
          title={post.frontmatter.title}
          cover={post.frontmatter.featuredimage}
          quoted={post.frontmatter.quoted}
          blocks={post.frontmatter.blocks}
          formId={post.frontmatter.formId}
          formLabel={post.frontmatter.formLabel}
        />
        <ContactFormComponent />
      </Layout>
   </>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        date(formatString: "MM/YYYY")
        title
        subtitle
        description
        tags
        author
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        filedownload {
          id
          name
          publicURL
        }
        quoted
        blocks {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          quoted
        }
        formId
        formLabel
      }
    }
  }
`;
