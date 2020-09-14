import React from 'react';

import isEmpty from 'lodash/isEmpty';
import Img from 'gatsby-image';

const SafeImage = ({image, title, imageDescription, className, onLoad = null}) => {
    if (isEmpty(image) === true) return null;
    if (!isEmpty(image.childImageSharp) && image.extension !== 'svg') {
      return (<Img title={title} alt={imageDescription} fluid={image.childImageSharp.fluid} className={className} onLoad={(event) => { typeof onLoad === 'function' && onLoad(event) }} />);
    } else {
      return (<img src={image.publicURL || image} className={className} onLoad={(event) => { typeof onLoad === 'function' && onLoad(event) }} />);
    }
}

export default SafeImage;
  