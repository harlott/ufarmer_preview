import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import _get from 'lodash/get';

import Layout from "../../components/Layout";
import MainTopSection from "../../components/MainTopSection/MainTopSection";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";

import "./contacts-page.scss";
import arrowRightWhite from "../../../static/img/read-more-arrow-white.svg";
import SEO from "../../components/Seo";

export const ContactsPageTemplate = ({
  title,
  description,
  offices,
}) => (
  <>
    <div className="contacts">
      <div className="contacts__top-container">
        <MainTopSection
          text={title}
          description={description}
        />
        <div className="contacts__top-container__bottom"></div>
      </div>
      {!!offices && (
          <div className="contacts__offices">
            <div className="main-content-container main-content-padding">
              {_get(offices, 'length', 0) > 0 && offices.map(current => (
                  <a className="contacts__office-block" href={current.mapLink}>
                    <div className="contacts__office-block__text-block">
                      <span className="contacts__office-block__text-block__text-title">{current.title}</span>
                      <span className="contacts__office-block__text-block__text-description">{current.description}</span>
                    </div>
                    <div className="contacts__office-block__arrow-block" >
                      <img className="contacts__office-block__arrow-block__arrow-img" src={arrowRightWhite} alt="Read more link arrow" />
                    </div>
                  </a>
              ))}
            </div>
          </div>
      )}
    </div>
  </>
);

ContactsPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

const ContactsPage = ({ data }) => {
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
      <ContactsPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        offices={frontmatter.offices}
      />
      <ContactFormComponent formId={frontmatter.formId} formTexts={frontmatter.formTexts}/>
    </Layout>
  );
};

ContactsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default ContactsPage;

export const pageQuery = graphql`
  query ContactsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "contacts-page" } }) {
      fields{
        slug
      }  
      frontmatter {
        pageTitle
        metaDescription
        metaKeywords
        title
        description
        offices {
          title
          description
          mapLink
        }
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
