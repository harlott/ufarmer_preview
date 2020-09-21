import React from "react";
import PropTypes from "prop-types";
import _get from "lodash/get";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout";
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SEO from "../../components/Seo";

export const StaticPageTemplate = ({
  description,
  quoted,
  tags,
  type,
  title,
  cover,
  filedownload,
  date,
  author,
  blocks,
  html,
}) => {
  return (
      <ArticleContent
        theme="pink"
        type={type}
        title={title}
        cover={cover}
        author={author}
        date={date}
        filedownload={filedownload}
        description={description}
        quoted={quoted}
        tags={tags}
        blocks={blocks}
        html={html}
      />
  );
};

StaticPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const StaticPage = ({ data }) => {
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
        <StaticPageTemplate
          description={post.frontmatter.description}
          date={post.frontmatter.date}
          author={post.frontmatter.author}
          filedownload={post.frontmatter.filedownload}
          tags={post.frontmatter.tags}
          type={post.frontmatter.subtitle}
          title={post.frontmatter.title}
          cover={post.frontmatter.featuredimage}
          quoted={post.frontmatter.quoted}
          blocks={post.frontmatter.blocks}
          html={post.html}
        />
        <ContactFormComponent formId={post.frontmatter.formId}/>
      </Layout>
   </>
  );
};

StaticPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default StaticPage;

export const pageQuery = graphql`
  query StaticPageByID($id: String!) {
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
          filedownload {
            id
            name
            publicURL
          }
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
      }
    }
  }
`;
