import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html';

export const HTMLContent = ({ content, className }) => (
  
  <div className={className}>
    <ReactMarkdown
      source={content}
      escapeHtml={false}
    />
  </div>
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
