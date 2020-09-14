import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Layout from "../../components/Layout";
import SafeImage from "../../components/SafeImage";

import MainTopSection from "../../components/MainTopSection/MainTopSection";
import SectorCardsFullContainer from "../../components/SectorCardsContainerComponent/SectorCardsFullContainer";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import GradientButton from "../../components/GradientButton/GradientButton";

import "./livion.scss";
import SolutionArticleSection from "../../components/SolutionArticleSection/SolutionArticleSection";
import SideMenu from "../../components/SideMenu/SideMenu";
import SEO from "../../components/Seo";
import ButtonDemo from "./ButtonDemo";

export const LivionPageTemplate = ({
  title,
  subtitle,
  description,
  featuredimage,
  demoButtontext,
  areasTitle,
  areas,
  sectorsTitle,
  sectorsMenu,
  sectorsBlocks,
  touchEconomy,
  formId,
  preview
}) => (
  <>
    <div className="livion">
      <div className="livion__top-container">
        <MainTopSection
          floatImage
          text={title}
          subtitle={subtitle}
          description={description}
        />
        {!!featuredimage && (
          <div className="livion__top-container__img-container ">
            <SafeImage image={featuredimage} />
          </div>
        )}
        {!!formId && !preview && (
          <div className="livion__top-container__demo-button">
            <ButtonDemo
              formId={formId}
              demoButtontext={demoButtontext}
            />
          </div>
        )}
        <div className="livion__top-container__bottom"></div>
      </div>
      <SectorCardsFullContainer
        order="row"
        cardOrder="column"
        theme="blue"
        title={areasTitle}
        cards={areas}
      />
      <div className="livion__sectors-container">
        <div className="main-content-container main-content-padding">
          <div className="columns">
            <div className="column livion__sectors-container__first-column">
              {!!sectorsBlocks &&
                sectorsBlocks.map((sector, idx) => (
                  <SolutionArticleSection
                    theme="blue"
                    intro=""
                    title={sector.title}
                    description={sector.description}
                  />
                ))}
            </div>
            {!!sectorsTitle && !!sectorsMenu && (
              <SideMenu title={sectorsTitle} items={sectorsMenu} />
            )}
          </div>
        </div>
      </div>
      <div className="livion__touch-economy">
        {!!touchEconomy && (
          <>
            <div className="main-content-container main-content-padding">
              <SolutionArticleSection
                single
                theme="grey"
                intro=""
                title={touchEconomy.title}
                description={touchEconomy.description}
              />
            </div>
            <div className="livion__touch-economy__cards-container">
              <SectorCardsFullContainer
                order="column"
                cardOrder="row"
                theme="grey"
                title=""
                cards={touchEconomy.blocks}
              />
            </div>
          </>
        )}
      </div>
    </div>
  </>
);

LivionPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string
};

const LivionPage = ({ data }) => {
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
      <LivionPageTemplate
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        description={frontmatter.description}
        featuredimage={frontmatter.featuredimage}
        demoButtontext={frontmatter.demoButtontext}
        areasTitle={frontmatter.areasTitle}
        areas={frontmatter.areas}
        sectorsTitle={frontmatter.sectorsTitle}
        sectorsMenu={frontmatter.sectorsMenu}
        sectorsBlocks={frontmatter.sectorsBlocks}
        touchEconomy={frontmatter.touchEconomy}
        formId={frontmatter.formId}
      />
      <ContactFormComponent
          firstTitle="Interessato a Livion?"
          secondTitle="Prenota una demo"
          buttonText="Contattaci"
      />

    </Layout>
  );
};

LivionPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default LivionPage;

export const pageQuery = graphql`
  query LivionPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "livion-page" } }) {
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        title
        subtitle
        description
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1680, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        demoButtontext
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
        sectorsTitle
        sectorsMenu {
          title
          description
        }
        sectorsBlocks {
          title
          description
        }
        touchEconomy {
          title
          description
          blocks {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 400, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
              extension
              publicURL
            }
          }
        }
        formId
      }
    }
  }
`;
