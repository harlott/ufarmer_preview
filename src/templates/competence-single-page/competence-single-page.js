import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../../components/Layout";
import SafeImage from "../../components/SafeImage";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SolutionArticleSection from "../../components/SolutionArticleSection/SolutionArticleSection";
import SectorCardsContainer from "../../components/SectorCardsContainerComponent/SectorCardsContainer";
import CardsComponent from "../../components/CardsContainerComponent/CardsContainer";

import "./competence-single-page.scss";
import SEO from "../../components/Seo";

export const CompetenceSinglePageTemplate = ({
  pageTitle,
  title,
  description,
  featuredimage,
  blocks,
  areastitle,
  areas,
  competenceRelatedContents
}) => (
  <>
    <div className="competence-single-page">
      <div className="competence-single-page__block">
        <div className="competence-single-page__block__page-title">
          <SafeImage
            className="competence-single-page__block__page-title__image-title"
            title={pageTitle}
            alt={title}
            image={featuredimage}
          />
          <div className="main-content-container main-content-padding competence-single-page__block__page-title__text-block">
            <h2 className="competence-single-page__block__page-title__text-block__category">
              COMPETENCE CENTER
            </h2>
            <h3 className="competence-single-page__block__page-title__text-block__title">
              {title}
            </h3>
          </div>
        </div>
      </div>
      <div className="competence-single-page__page-content">
        <div className="theme-blue">
          <div className="main-content-container main-content-padding">
            {!!blocks &&
              blocks.map(block => {
                return (
                  <div className="competence-single-page__text-block">
                    <SolutionArticleSection
                      single
                      theme="blue"
                      intro={block.label}
                      title={block.title}
                      description={block.description}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
    <SectorCardsContainer
      cardClassName="competence-card-container"
      theme="blue"
      title={areastitle}
      cards={areas}
    />
    {competenceRelatedContents.length > 0 && (
      <CardsComponent
        titleAsLink
        theme="blue"
        title="Case Study"
        cards={competenceRelatedContents}
      />
    )}
  </>
);

CompetenceSinglePageTemplate.propTypes = {
  pageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  featuredimage: PropTypes.object,
  blocks: PropTypes.array,
  areas: PropTypes.array,
  competenceRelatedContents: PropTypes.array,
  areastitle: PropTypes.string
};

CompetenceSinglePageTemplate.defaultProps = {
  competenceRelatedContents: []
};

const CompetenceSinglePage = ({
  pageContext: { competenceRelatedContents },
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
      <CompetenceSinglePageTemplate
        title={frontmatter.title}
        previewtitle={frontmatter.previewtitle}
        featuredimage={frontmatter.featuredimage}
        blocks={frontmatter.blocks}
        areastitle={frontmatter.areastitle}
        areas={frontmatter.areas}
        competenceRelatedContents={competenceRelatedContents}
      />
      <ContactFormComponent formId={frontmatter.formId} />
    </Layout>
  );
};

CompetenceSinglePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default CompetenceSinglePage;

export const pageQuery = graphql`
  query CompetenceSinglePageTemplateByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        title
        previewtitle
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        blocks {
          label
          title
          description
        }
        areastitle
        areas {
          title
          description
          link
          image {
            childImageSharp {
              fluid(maxWidth: 600, quality: 64) {
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
