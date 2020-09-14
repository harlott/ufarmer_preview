import React from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get';

import DigitalTransformationImage from "./DigitalTransformationImage";
import ReadMoreLink from "../ReadMoreLink/ReadMoreLink";
import "./digital-transformation.scss";
import StrokeGradientTitle from "../StrokeGradientTitle/StrokeGradientTitle";

const DigitalTransformation = ({ mainSections }) => {
  return (
    <div className="home__digital-transformation home-section">
      <div className="main-content-container main-content-padding">
        <div className="home__digital-transformation__title">
          <h2 className="preTitle">{mainSections.title}</h2>
            {/* <h2 className="no-side-padding-tablet"></h2> */}
          <div className="digital-title">
            <StrokeGradientTitle
              className="digital"
              direction="bottomLeft-topRight"
              fontColor="#29E7D6"
              colors={["#0d1fcf", "#f00381"]}
              text="DIGITAL TRANSFORMATION"
            />
          </div>
        </div>
        {mainSections.mainBlocks.map(
          ({ title, description, url, imageDescription, image }, idx) => (
            <>
              <div
                key={title}
                className="home__digital-transformation__container"
              >
                <div className="columns flex-items-centered">
                  <div className="home__digital-transformation__content column">
                    <h3 className="home__digital-transformation__content__title has-text-weight-bold">
                      {title}
                    </h3>
                  </div>
                  <DigitalTransformationImage
                    title={title}
                    imageDescription={imageDescription}
                    image={image}
                  />
                </div>
                <div className="home__digital-transformation__content__container columns">
                  <div className="column text-container">
                    <div className="home__digital-transformation__content__description">
                      {description}
                    </div>
                    <div className="home__digital-transformation__link-container">
                      {_get(url, 'length', 0) > 0 &&
                        <ReadMoreLink color="blue" title="scopri di più" url={url} />
                      }
                    </div>
                  </div>
                  <div className="column fake-container" />
                </div>
              </div>
            </>
          )
        )}
        <div style={{ clear: "both" }} />
      </div>
    </div>
  );
};

DigitalTransformation.propTypes = {
  mainSections: PropTypes.shape({
    title: PropTypes.string.isRequired,
    mainBlocks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        imageDescription: PropTypes.string.isRequired,
        image: PropTypes.object.isRequired
      })
    )
  })
};

export default DigitalTransformation;
