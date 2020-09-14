import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../../components/Layout";
import arrowRightWhite from "../../../static/img/read-more-arrow-white.svg";

import MainTopSection from "../../components/MainTopSection/MainTopSection";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";

import "./careersPage.scss";
import SEO from "../../components/Seo";
import { HTMLContent } from "../../components/Content";

export const CareersPageTemplate = ({
  title,
  description,
  videoUrl,
  intro,
  careers
}) => (
  <div>
    <div className="careers-page__block">
      <MainTopSection transparent text={title} description={description} />
      <div className="main-content-container main-content-padding">
        <div className="columns is-gapless">
          <div className="column">
            <iframe
              className="careers-page__block__youtube-embedded-video-frame"
              src={videoUrl}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="main-content-container main-content-padding">
        <div className="columns is-gapless">
          <div className="column">
            <div className="careers-page__block__careers-oportunities">
              <h2 className="careers-page__block__careers-oportunities__title">
                {intro.title}
              </h2>
              <p className="careers-page__block__careers-oportunities__description">
                <HTMLContent content={intro.description} />
              </p>
              {careers &&
                <div className="careers-blocks">
                  {
                    careers.length > 0 &&
                    careers.map(current => (
                      <a
                        className="careers-page__block__careers-oportunities__oportunity-block"
                        href={current.link}
                        target="_new"
                        rel="noreferrer"
                      >
                        <div className="careers-page__block__careers-oportunities__oportunity-block__text-block">
                          <span className="careers-page__block__careers-oportunities__oportunity-block__text-block__text-title">
                            {current.title}
                          </span>
                          <span className="careers-page__block__careers-oportunities__oportunity-block__text-block__text-level">
                            {current.level}
                          </span>
                          <span className="careers-page__block__careers-oportunities__oportunity-block__text-block__text-city">
                            {current.city}
                          </span>
                        </div>
                        <div className="careers-page__block__careers-oportunities__oportunity-block__arrow-block">
                          <img
                            className="careers-page__block__careers-oportunities__oportunity-block__arrow-block__arrow-img"
                            src={arrowRightWhite}
                            alt="Read more link arrow"
                          />
                        </div>
                      </a>
                    ))
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CareersPageTemplate.propTypes = {
  intro: PropTypes.object,
  careers: PropTypes.array
};

const CareersPage = ({ data }) => {
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
      <CareersPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        videoUrl={frontmatter.videoUrl}
        intro={frontmatter.intro}
        careers={frontmatter.careers}
      />
      <ContactFormComponent formId={frontmatter.formId} />
    </Layout>
  );
};

CareersPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default CareersPage;

export const pageQuery = graphql`
  query CareeersPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "careers-page" } }) {
      fields{
        slug
      }
      frontmatter {
        pageTitle
        metaDescription
        metaKeywords
        title
        description
        videoUrl
        intro {
          title
          description
        }
        careers {
          title
          level
          city
          link
        }
        formId
      }
    }
  }
`;
