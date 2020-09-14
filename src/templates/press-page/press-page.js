import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import _get from "lodash/get";

import Layout from "../../components/Layout";
import GradientTitle from "../../components/GradientTitle/GradientTitle";
import ArrowDown from "../../../static/img//arrow_down-white.svg";
import PaginatedLinks from "../../components/PaginatedLinks/PaginatedLinks";
import ContactFormComponent from "../../components/ContactFormComponent/ContactFormComponent";
import SEO from "../../components/Seo";

import "./press.scss";

export const PressPageTemplate = ({
  title,
  description,
  fileDownloadLabel,
  filedownload,
  links
}) => (
  <div className="main-content-container main-content-padding">
    <div className="press-page">
      <div className="press-page__press-page-header">
        <div className="columns">
          <div className="column is-two-third-tablet">
            <div className="press-page__press-page-header__page-title">
              <h3 className="press-page__press-page-header__page-title__title">
                <GradientTitle
                  direction="left-right"
                  colors={["#4500ce", "#ff007b"]}
                  text={title}
                />
              </h3>
            </div>
            <p className="press-page__press-page-header__more-info">
              {description}
            </p>
          </div>
          <div className="column">
            {!!_get(filedownload, "publicURL") && (
              <div className="press-page__main-download-block">
                <a
                  className="press-page__main-download-block__main-donwload-link"
                  href={_get(filedownload, "publicURL")}
                  target="_blank"
                >
                  <p className="press-page__main-download-block__main-donwload-link__text">
                    {fileDownloadLabel}
                  </p>
                  <img
                    className="press-page__main-download-block__main-donwload-link__arrow"
                    src={ArrowDown}
                    alt="Arrow Down white"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="press-page__press-links">
        <PaginatedLinks content={links} max={3} />
      </div>
    </div>
  </div>
);

const PressPage =  ({ pageContext: resultPressPage }) => {
  if (resultPressPage === undefined) return null;
  const { node } = _get(resultPressPage, 'resultPressPage.data.allMarkdownRemark.edges', [])[0];
  const { frontmatter } = node;
  return (
    <Layout theme="black">
      <SEO
        lang={"it"}
        title={frontmatter.pageTitle}
        description={frontmatter.metaDescription}
        keywords={frontmatter.metaKeywords}
        image={frontmatter.socialPreviewImage}
        path={node.fields.slug}
      />
      <PressPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        fileDownloadLabel={frontmatter.fileDownloadLabel}
        filedownload={frontmatter.filedownload}
        links={frontmatter.links}
      />
      <ContactFormComponent
        firstTitle={_get(frontmatter.formTexts, "firstTitle")}
        secondTitle={_get(frontmatter.formTexts, "secondTitle")}
        buttonText={_get(frontmatter.formTexts, "buttonText")}
        formId={frontmatter.formId}
      />
    </Layout>
  );
};

export default PressPage;

