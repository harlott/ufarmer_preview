import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import EventContent from "./EventContent";
import "./event.scss";
import SEO from "../../components/Seo";

export const EventPageTemplate = ({
  description,
  tags,
  date,
  title,
  image,
  place,
  price,
  program
}) => {
  return (
    <>
      <EventContent
        program={program}
        pageTitle={`Evento - ${title}`}
        title={title}
        image={image}
        description={description}
        tags={tags}
        date={date}
        place={place}
        price={price}
      />
    </>
  );
};

EventPageTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string
};

const EventPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const {
    pageTitle,
    metaDescription,
    metaKeywords,
    socialPreviewImage
  } = post.frontmatter;
  return (
    <Layout>
      <SEO
          lang={"it"}
          title={pageTitle}
          description={metaDescription}
          keywords={metaKeywords}
          image={socialPreviewImage}
          path={post.fields.slug}
      />
      <EventPageTemplate
        description={post.frontmatter.description}
        date={post.frontmatter.eventdate}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.featuredimage}
        place={post.frontmatter.place}
        price={post.frontmatter.costs}
        program={post.frontmatter.program}
      />
      <ContactFormComponent
          formId={post.frontmatter.formId}
          formTexts={post.frontmatter.formtexts}
      />
    </Layout>
  );
};

EventPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default EventPage;

export const pageQuery = graphql`
  query EventPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields{
        slug
      }
      frontmatter {
        ...SeoFragment
        eventdate(formatString: "DD/MM/YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        place
        costs
        subtitle
        program {
          title
          description
          descriptioncolumn
        }
        formtexts {
          title
          description
          button
        }
        author
        formId
      }
    }
  }
`;
