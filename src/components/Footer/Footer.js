import React from 'react'
import { Link } from 'gatsby'

import map from 'lodash/map'

import FooterSocialSection from './FooterSocialSection'

import brandLogoBlack from '../../../static/img/logo-home.png'

import menuConfig from '../../../config/menu/it.json'

import './footer.scss'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="site_footer">
        <div className="main-content-container main-content-padding">
          <div className="site_footer__container">
            
            {/*
              <div className="columns site_footer__navigation">
              <div className="column static-size site_footer__navigation__brand">
                <Link to="/" className="site_footer__navigation__brand__link">
                  <img src={brandLogoBlack} className="site_footer__navigation__brand__link__image" alt="CWS brand logo in black"/>
                </Link>
              </div>
              <div className="social-container-mobile">
                <FooterSocialSection menuConfig={menuConfig} />
              </div>
              <div className="column first">
                <span className="site_footer__navigation__group">
                  <Link to={menuConfig.primaryNavs[0].link} className="site_footer__navigation__group__item">{menuConfig.primaryNavs[0].name}</Link>
                  {menuConfig.primaryNavs[0].subItems && menuConfig.primaryNavs[0].subItems.length > 0 && 
                    <span className="site_footer__navigation__group__subitems">
                      {map(menuConfig.primaryNavs[0].subItems, (currentSubItem, indexTwo) => (
                        <Link key={indexTwo} to={currentSubItem.link} className="site_footer__navigation__group__subitems__subitem">{currentSubItem.name}</Link>
                      ))}
                    </span>
                  }
                </span>
              </div>
              <div className="column">
                {map(menuConfig.primaryNavs.filter((item, index) => index > 0), (currentPrimary, index) => (
                  <span key={index} className="site_footer__navigation__group">
                    <Link to={currentPrimary.link} className="site_footer__navigation__group__item">{currentPrimary.name}</Link>
                  </span>
                ))}
              </div>
              <div className="column static-size position-relative navlink-container">
                <nav className="site_footer__navigation__group about-links">
                  {map(menuConfig.secondaryNav.aboutLinks, (currentAbout, index) => (
                    <Link key={index} to={currentAbout.link} className="site_footer__navigation__group__item">{currentAbout.name}</Link>
                  ))}
                </nav>
              </div>
            </div> 
              <div className="social-container-tablet">
                <div className="columns">
                  <div className="column site_footer__navigation__social">
                    <FooterSocialSection menuConfig={menuConfig} />
                  </div>
                </div>
              </div>
            */}
            
            <div className="site_footer__fiscal">
              UFarmer S.r.l. NIN and VAT code 11350220965 - REA N. MI-2596977
            </div>
            <div className="columns">
              <div className="column">
                <nav className="site_footer__navigation__legal">
                  {map(menuConfig.secondaryNav.legalLinks, (currentLegal, index) => (
                    <Link key={index} to={currentLegal.link} className="site_footer__navigation__legal__item">{currentLegal.name}</Link>
                  ))}
                </nav>
              </div>
              <div className="column site_footer__copy">
                {`\u00A9 ${new Date().getFullYear()} - All rights reserved`}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
