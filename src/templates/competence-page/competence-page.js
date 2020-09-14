import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Layout from "../../components/Layout";

import MainTopSection from "../../components/MainTopSection/MainTopSection";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import CompetenceCenter from "../index-page/competenceCenter/CompetenceCenter";
import "./competence-page.scss";
import SEO from "../../components/Seo";

export const CompetencePageTemplate = ({
  title,
  description,
}) => (
  <>
    <div className="competence">
      <div className="competence__top-container">
        <MainTopSection
          floatImage
          titleClassName="compentence__top-container__main-title"
          text={title}
          description={description}
        />
        {/* <div className="competence__top-container__bottom"></div> */}
      </div>
      <CompetenceCenter />
    </div>
  </>
);

CompetencePageTemplate.propTypes = {
  pageTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

const CompetencePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <SEO
          lang={"it"}
          title={frontmatter.pageTitle}
          description={frontmatter.metaDescription}
          keywords={frontmatter.metaKeywords}
          image={frontmatter.socialPreviewImage}
          path={data.markdownRemark.fields.slug}
      />
      <CompetencePageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <ContactFormComponent formId={frontmatter.formId} formTexts={frontmatter.formTexts} />
    </Layout>
  );
};

CompetencePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default CompetencePage;

export const pageQuery = graphql`
  query CompetencePageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "competence-page" } }) {
      fields{
        slug
      }  
      frontmatter {
        pageTitle
        metaDescription
        metaKeywords
        title
        description
        formId
        formTexts{
          firstTitle
          secondTitle
          buttonText
        }
      }
    }
  }
`;
