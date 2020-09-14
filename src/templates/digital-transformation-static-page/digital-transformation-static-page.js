import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../../components/Layout";
import MainTopSection from "../../components/MainTopSection/MainTopSection";
import ContentSection from "./contentSection/ContentSection";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SEO from "../../components/Seo";

export const DigitalTransformationGenericPageTemplate = ({
  title,
  sections
}) => (
  <div>
    <div
      style={{
        backgroundColor:
          '#110553'
      }}
    >
      <MainTopSection transparent text={title} />
    </div>
    <ContentSection sections={sections} />
  </div>
);

DigitalTransformationGenericPageTemplate.propTypes = {
  pageTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
  socialPreviewImage: PropTypes.object,
  title: PropTypes.string,
  sections: PropTypes.array
};

DigitalTransformationGenericPageTemplate.defaultProps = {
  sections: [{ image: { childImageSharp: {} }, description: [] }]
};

const DigitalTransformationGenericPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const {
    pageTitle,
    metaDescription,
    metaKeywords,
    socialPreviewImage,
    title,
    sections,
    formId
  } = frontmatter;
  return (
    <Layout>
      <SEO
          lang={"it"}
          title={pageTitle}
          description={metaDescription}
          keywords={metaKeywords}
          image={socialPreviewImage}
          path={data.markdownRemark.fields.slug}
      />
      <DigitalTransformationGenericPageTemplate
        title={title}
        sections={sections}
      />
      <ContactFormComponent formId={formId} />
    </Layout>
  );
};

DigitalTransformationGenericPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default DigitalTransformationGenericPage;

export const pageQuery = graphql`
  query DigitalTransformationGenericPage {
    markdownRemark(
      frontmatter: { templateKey: { eq: "digital-transformation-static-page" } }
    ) {
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        title
        sections {
          title
          textBlocks {
            title
            text
          }
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 64) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
            extension
            publicURL
          }
          imageDescription
          link
          areas
        }
        formId
      }
    }
  }
`;
