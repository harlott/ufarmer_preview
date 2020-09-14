import React from 'react';
import PropTypes from 'prop-types';

import ContentBlock from './ContentBlock';

import './contentSection.scss';

class ContentSection extends React.Component {
  render() {
    const { sections } = this.props;
    return(
        <div className="sections-block">
        {sections.map(currentSection => (
          <ContentBlock data={currentSection} />
        ))
        }
      </div>
    )
  }
}

ContentSection.propTypes = {
  sections: PropTypes.array
}

ContentSection.defaultProps = {
  sections: []
}

export default ContentSection;