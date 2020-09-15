import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../../components/Layout";
import Mainpitch from "./mainpitch/Mainpitch";
import SectorCardsFullContainer from "../../components/SectorCardsContainerComponent/SectorCardsFullContainer";


import "./home.scss";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SEO from "../../components/Seo";

export const IndexPageTemplate = ({
  mainpitch,
  areas,
  areasTitle
}) => (
  <>
    <div className="home">
      <Mainpitch
          text={mainpitch.text}
          image={mainpitch.image}
          theme="inverted"
      />
    <SectorCardsFullContainer
        order="row"
        cardOrder="column"
        theme="green"
        title={areasTitle}
        cards={areas}
    />

    </div>
  </>
);

IndexPageTemplate.propTypes = {
  mainpitch: PropTypes.object,
  mainSections: PropTypes.shape({
    mainBlocks: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <SEO
          lang={"it"}
          title={frontmatter.pageTitle}
          description={frontmatter.metaDescription}
          keywords={frontmatter.metaKeywords}
          image={frontmatter.socialPreviewImage}
      />
      <IndexPageTemplate
        mainSections={frontmatter.mainSections}
        mainpitch={frontmatter.mainpitch}
        areasTitle={frontmatter.areasTitle}
        areas={frontmatter.areas}
      />
        {/*<ContactFormComponent theme="green" formId={frontmatter.formId} />*/}
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        ...SeoFragment
        mainpitch {
          text
          image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
          }
        }
        mainSections {
          title
          description
          mainBlocks {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageDescription
            url
          }
        }
        areasTitle
        areas {
          title
          description
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
