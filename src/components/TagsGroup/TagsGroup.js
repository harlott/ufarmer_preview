import React from 'react';
import { Link } from 'gatsby';

import './tagsGroup.scss';
import UTILS from '../../utils';

const TagsGroup = props => {
  return (
    <div className="tags-block">
      { props.tags && props.tags.length > 0 && props.tags.map(currentTag => (
          <Link className="tags-block__tag-element" to={`/tags/${currentTag}`}>{UTILS.tagFormatter(currentTag)}</Link>
        ))
      }
    </div>
  );
};

export default TagsGroup;