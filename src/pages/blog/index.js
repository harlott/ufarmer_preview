import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../../components/Layout';
import BlogRoll from '../../components/BlogRoll/BlogRoll';
import ContactFormComponent from '../../components/ContactFormComponent/ContactFormComponent';

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout theme="black">
        <Helmet>
          <title>Risorse</title>
          {/* <meta name="description" content={metaDescription} /> */}
          {/*<meta name="keywords" content={metaKeywords} /> */}
        </Helmet>
        <BlogRoll />
      </Layout>
    )
  }
}
