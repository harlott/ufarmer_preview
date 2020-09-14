import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import _get from "lodash/get";
import Layout from "../../components/Layout";
import CaseStudyContent from "./CaseStudyContent";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SafeImage from "../../components/SafeImage";

import "./case-study.scss";
import SEO from "../../components/Seo";
import { HTMLContent} from "../../components/Content";

export const CaseStudyPageTemplate = ({
  id,
  pageTitle,
  title,
  resume,
  image,
  description,
  sections,
  tags,
  imageGallery,
  testimonials,
  partners,
  results,
  relatedContentByTags
}) => (
  <>
    <CaseStudyContent
      pageTitle={pageTitle}
      title={title}
      resume={resume}
      image={image}
      description={description}
      sections={sections}
      tags={tags}
      gallery={imageGallery}
      testimonials={testimonials}
      results={results}
    />
    {!!partners && (
      <div className="case-study-partners">
        <div className="main-content-container main-content-padding">
          <h2 className="case-study-partners__title">{partners.title}</h2>
          <div className="case-study-partners__description">
              <HTMLContent content={partners.description}/>
          </div>

        </div>
      </div>
    )}
    {/*
      {_get(relatedContentByTags, "length", 0) > 0 && (
        <RelatedCaseStudy
          title="Related post"
          theme="blue"
          relatedContentByTags={relatedContentByTags}
          contentId={id}
        />
      )}
    */}
  </>
);

CaseStudyPageTemplate.propTypes = {
  mainpitch: PropTypes.object,
  mainSections: PropTypes.shape({
    mainBlocks: PropTypes.array
  })
};

const CaseStudyPage = ({ pageContext: { relatedContentByTags }, data }) => {
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
      <CaseStudyPageTemplate
        id={data.markdownRemark.id}
        pageTitle={frontmatter.pageTitle}
        metaDescription={frontmatter.metaDescription}
        metaKeywords={frontmatter.metaKeywords}
        socialPreviewImage={frontmatter.socialPreviewImage}
        title={frontmatter.title}
        image={frontmatter.featuredimage}
        resume={{
          customer: frontmatter.customer,
          year: frontmatter.year,
          expertise: frontmatter.expertise,
          link: frontmatter.link
        }}
        description={frontmatter.description}
        previewtitle={frontmatter.previewtitle}
        sections={frontmatter.sections}
        tags={frontmatter.tags}
        imageGallery={frontmatter.imageGallery}
        testimonials={frontmatter.testimonials}
        partners={frontmatter.partners}
        results={frontmatter.results}
        relatedContentByTags={relatedContentByTags}
      />
      <ContactFormComponent formId={frontmatter.formId} />
    </Layout>
  );
};

CaseStudyPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default CaseStudyPage;

export const pageQuery = graphql`
  query CaseStudyPageTemplateByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        previewtitle
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        customer
        place
        year
        expertise
        link
        description
        sections {
          intro
          title
          description
        }
        imageGallery {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        testimonials {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        partners {
          title
          description
        }
        results {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            extension
            publicURL
          }
        }
        tags
        formId
        visible
      }
    }
  }
`;
