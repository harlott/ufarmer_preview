import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Layout from "../../components/Layout";
import SafeImage from "../../components/SafeImage";

import MainTopSection from "../../components/MainTopSection/MainTopSection";
import SectorCardsContainer from "../../components/SectorCardsContainerComponent/SectorCardsContainer";
import DigitalTransformationSection from "../../components/digitalTransformationSection/DigitalTransformationSection";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import CustomScrollbarComponent from "../../components/CustomScrollbarComponent/CustomScrollbarComponent";

import "./about-us.scss";
import SEO from "../../components/Seo";

export const AboutUsPageTemplate = ({
  title,
  description,
  values,
  timelineImage
}) => {
  const [ mounted, setMounted ] = useState(false);

  return (
    <div>
      <div className="about-us-page__block theme-blue">
        <MainTopSection transparent text={title} description={description} />
      </div>
      {!!timelineImage && (
        <div className="about-us theme-blue">
          <CustomScrollbarComponent loaded={mounted} placeholderClassName="about-us__timeline-image">
            <SafeImage image={timelineImage} onLoad={(event) => { if (event.target.complete) {
              setMounted(true);
            }}}/>
          </CustomScrollbarComponent>
        </div>
      )}

      <SectorCardsContainer theme="blue" title="I valori CWS" cards={values} />
      <DigitalTransformationSection />

    </div>
  );
}

AboutUsPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  values: PropTypes.array
};

const AboutUsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <>
    <Layout>
      <SEO
        lang={"it"}
        title={frontmatter.pageTitle}
        description={frontmatter.metaDescription}
        keywords={frontmatter.metaKeywords}
        image={frontmatter.socialPreviewImage}
        path={data.markdownRemark.fields.slug}
      />
      <AboutUsPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        values={frontmatter.values}
        timelineImage={frontmatter.timelineImage}
      />
        <ContactFormComponent formId={frontmatter.formId} />
    </Layout>
    </>
  );
};

AboutUsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default AboutUsPage;

export const pageQuery = graphql`
  query AboutUsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-us-page" } }) {
      fields{
        slug
      }
      frontmatter {
        pageTitle
        metaDescription
        metaKeywords
        title
        description
        values {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        timelineImage {
          extension
          publicURL
          childImageSharp {
            fluid(maxWidth: 1920, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        formId
      }
    }
  }
`;
