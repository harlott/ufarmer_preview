import React from 'react';
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from '../../components/Layout';
import BlogRoll from '../../components/BlogRoll/BlogRoll';
import SEO from "../../components/Seo";
import GradientTitle from "../../components/GradientTitle/GradientTitle";
import {HTMLContent} from "../../components/Content";

const ResourcesContainer = ({ children, data }) => {
    const { frontmatter } = data.markdownRemark;
    return (
        <Layout theme="black">
            <SEO
                lang={"it"}
                title={frontmatter.pageTitle}
                description={frontmatter.metaDescription}
                keywords={frontmatter.metaKeywords}
                image={frontmatter.socialPreviewImage}
                path={data.markdownRemark.fields.slug}
            />
            <div className="BlogRoll__top-container">
                <div className="main-content-container main-content-padding">
                    <h1 className="BlogRoll__title"><GradientTitle direction="left-right" colors={['#4500ce', '#ff007b']} text={frontmatter.title} /></h1>
                    <HTMLContent className="BlogRoll__description" content={frontmatter.description} />
                    {children}
                </div>
            </div>
        </Layout>
    );
};

const ResourcesPage = ({ data }) => {

    return (
        <ResourcesContainer data={data}>
            <BlogRoll />
        </ResourcesContainer>

    )
}
ResourcesPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object
        })
    })
};

export default ResourcesPage;

export const pageQuery = graphql`
  query ResourcesPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "resources-page" } }) {
    fields {
      slug
    }
    frontmatter {
        ...SeoFragment
        title
        description
        placeholderSearch
        placeholderSearchModal
      }
    }
  }
`;

