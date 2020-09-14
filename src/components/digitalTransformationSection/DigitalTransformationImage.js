import React from "react";
import PropTypes from "prop-types";
import SafeImage from "../SafeImage";

class DigitalTranformationImage extends React.PureComponent {
  render() {
    const { title, imageDescription, image } = this.props;
    return (
      <div className="home__digital-transformation__image-container column">
        <div className="home__digital-transformation__image-bg">
          <div className="home__digital-transformation__image">
            <SafeImage
              title={title}
              imageDescription={imageDescription}
              image={image}
            />
          </div>
        </div>
      </div>
    );
  }
}

DigitalTranformationImage.propTypes = {
  title: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired
};

export default DigitalTranformationImage;
