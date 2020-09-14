import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  if (data) {
    return (
        <BlogPostTemplate
            content={widgetFor('body')}
            description={data.description}
            tags={data.tags}
            title={data.title}
            quoted={data.quoted}
            type={data.subtitle}
            cover={data.featuredimage}
            filedownload={data.filedownload}
            date={!!data.date ? new Intl.DateTimeFormat('it-IT').format(entry.getIn(['data', 'date'])) : '01/01/1970'}
            author={data.author}
            blocks={data.blocks}
            preview={true}
        />
    )
  }
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
