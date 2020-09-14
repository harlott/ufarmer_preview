import React from "react";

import DigitalTransformation from "./DigitalTransformation";
import { graphql, StaticQuery } from "gatsby";

const DigitalTransformationSection = ({ data }) => {
    const { mainSections } = data.allMarkdownRemark.edges[0].node.frontmatter;
    return (
    <DigitalTransformation
      mainSections={mainSections}
    />
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query DigitalTransformationSectionsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "index-page" } } }
        ) {
          edges {
            node {
              frontmatter {
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
              }
            }
          }
        }
      }
    `}
    render={(data) => <DigitalTransformationSection data={data} />}
  />
);
