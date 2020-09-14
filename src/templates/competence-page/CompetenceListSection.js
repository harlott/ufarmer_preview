import React from "react";

import SliderVerticalWithImageRight from "../../components/SliderVerticalWithImageRight/SliderVerticalWithImageRight";
import { graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";

class CompetenceListSection extends React.Component {
  formatData = (allMarkdownRemark) => {
    const data = allMarkdownRemark.edges.map(edge => ({
      slug: edge.node.fields.slug,
      title: edge.node.frontmatter.title,
      image: edge.node.frontmatter.featuredimage,
      description: edge.node.frontmatter.description,
    }));

    return data;
  }
  render() {
    const data = this.formatData(this.props.data.allMarkdownRemark);

    return <SliderVerticalWithImageRight data={data} />;
  }
}

CompetenceListSection.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query CompetenceListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: { templateKey: { eq: "competence-single-page" } }
          }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
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
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <CompetenceListSection data={data} count={count} />
    )}
  />
);
