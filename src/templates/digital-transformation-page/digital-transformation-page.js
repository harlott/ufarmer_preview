import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import _get from "lodash/get";

import Layout from "../../components/Layout";
import MainArticleSection from "../../components/MainArticleSection/MainArticleSection";
import SolutionArticleSection from "../../components/SolutionArticleSection/SolutionArticleSection";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SafeImage from "../../components/SafeImage";
import CardsComponent from "../../components/CardsContainerComponent/CardsContainer";
import SectorCardsContainer from "../../components/SectorCardsContainerComponent/SectorCardsContainer";
import "./style.scss";
import SEO from "../../components/Seo";

export const DigitalTransformationPageTemplate = ({
  title,
  description,
  cta,
  solution,
  caseStudyContents,
  phasesimage,
  areas
}) => (
  <div>
    <MainArticleSection
      theme="blue"
      section={"Digital Transformation"}
      title={title}
      caseStudy={description}
      cta={cta}
    />
    {!!solution && (
      <div className="theme-blue">
        <div className="main-content-container main-content-padding">
          <SolutionArticleSection
            single
            theme="blue"
            intro={"La soluzione"}
            title={solution.title}
            description={solution.description}
          />
        </div>
      </div>
    )}
    {_get(caseStudyContents, "length", 0) > 0 && (
      <CardsComponent
        theme="blue"
        title="Case Study"
        cards={caseStudyContents}
      />
    )}

    {!!phasesimage && (
      <div className="phases-image theme-blue">
        <div className="main-content-container main-content-padding">
          <h1 className="phases-image__title-magenta">Le fasi del percorso</h1>
        </div>
        <div className="phases-image__img-container no-side-padding">
          <div className="phases-image__img-container__img">
            <SafeImage image={phasesimage} />
          </div>
        </div>
      </div>
    )}
    {_get(areas, "length", 0) > 0 && (
      <SectorCardsContainer
        withLink={false}
        theme="blue"
        title="Settori di applicazione"
        cards={areas}
      />
    )}
  </div>
);

DigitalTransformationPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cta: PropTypes.object,
  solution: PropTypes.object,
  caseStudyContents: PropTypes.array,
  phasesimage: PropTypes.object,
  areas: PropTypes.array
};

DigitalTransformationPageTemplate.defaultProps = {
  cta: {},
  solution: {},
  caseStudyContents: [],
  areas: []
};

const DigitalTransformationPage = ({
  pageContext: { relatedContents },
  data
}) => {
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
      <DigitalTransformationPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        cta={frontmatter.cta}
        solution={frontmatter.solution}
        caseStudyContents={relatedContents}
        phasesimage={frontmatter.phasesimage}
        areas={frontmatter.areas}
      />
      <ContactFormComponent formId={frontmatter.formId} />
    </Layout>
  );
};

DigitalTransformationPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default DigitalTransformationPage;

export const pageQuery = graphql`
  query DigitalTransformationPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        title
        description
        cta {
          label
          link
        }
        solution {
          title
          description
        }
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        phasesimage {
          extension
          publicURL
          childImageSharp {
            fluid(maxWidth: 1920, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        relatedCategoriesReference
        areas {
          title
          description
          link
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            extension
            publicURL
          }
        }
        formId
      }
    }
  }
`;
