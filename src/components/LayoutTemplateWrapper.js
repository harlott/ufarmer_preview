import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

import '../styles/layout.sass';
import CookiesPolicy from './CookiesPolicyWidget/CookiesPolicyWidget';

const TemplateWrapper = ({ children, menuActive, theme }) => {
  return (
    <div>
        <Helmet>
            <html lang="en" style={{overflow: menuActive ? 'hidden' : 'initial'}} />
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        </Helmet>
        {/* <Navbar theme={theme}/> */}
        <div>{children}</div>
        {/*
            <Footer />
      <CookiesPolicy />
        */}
    </div>
  )
}

TemplateWrapper.propTypes = {
    children: PropTypes.any.isRequired,
    menuActive: PropTypes.bool,
    theme: PropTypes.string
};

TemplateWrapper.defaultProps = {
    menuActive: false,
    theme: 'white'
};

export default TemplateWrapper
