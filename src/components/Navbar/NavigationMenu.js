import React from 'react';
import { Link } from 'gatsby'

import brandLogoWhite from '../../../static/img/brand_logo/brand_logo_white.svg'
import linkedinLogo from '../../../static/img/social_icons/linkedin-white.svg'
import facebookLogo from '../../../static/img/social_icons/facebook-white.svg'
import twitterLogo from '../../../static/img/social_icons/twitter-white.svg'
import instagramLogo from '../../../static/img/social_icons/instagram-white.svg'

const IMAGES_OBJECT = {
  linkedin: linkedinLogo,
  facebook: facebookLogo,
  twitter: twitterLogo,
  instagram: instagramLogo,
}

class NavigationMenu extends React.PureComponent {
  render() {
    const menuBehaviorClass = this.props.menuActive === true ? 'menu-visible' : '';

    if (!!this.menuContainer && this.props.menuActive) {
      this.menuContainer.scrollTop = 0;
    }

    return(
      <section id="sitenav" className="sitenav">
        <div className={`sitenav__menu ${menuBehaviorClass}`} id="sitenav__menu">
          <div className="main-content-container main-content-padding sitenav__menu__content">
            <div className={`columns is-mobile is-vcentered is-gapless sitenav__menu__top ${menuBehaviorClass}`}>
              <div className={`column is-narrow sitenav__menu__top__brand`}>
                <Link onClick={this.props.onClickHamburguer} to="/" className="column-mobile sitenav__menu__top__brand__item" title="CWS Brand Logo">
                  <img className="brand-logo" src={brandLogoWhite} alt={"CWS Brand logo white"} />
                </Link>
              </div>
              <div className={`sitenav__menu__top__hamburguer`} onClick={this.props.menuActive ? this.props.onClickHamburguer : null}>
                <span className={`sitenav__menu__top__hamburguer__bar menu-visible`} />
                <span className={`sitenav__menu__top__hamburguer__bar menu-visible`} />
              </div>
            </div>
            <div ref={menuContainer => this.menuContainer = menuContainer} className="sitenav__menu__container">
              <div className="columns is-gapless">
                <nav className="column is-two-thirds sitenav__menu__container__left__primary">
                  {this.props.items.primaryNavs.map((currentPrimary, index) => (
                    <span key={index} className="sitenav__menu__container__left__primary__item">
                      <Link onClick={this.props.onClickHamburguer} to={currentPrimary.link} className="sitenav__menu__container__left__primary__item__link">{currentPrimary.name}</Link>
                      {currentPrimary.subItems && currentPrimary.subItems && currentPrimary.subItems.map((currentSubItem, indexTwo) => (
                        <Link onClick={this.props.onClickHamburguer} key={indexTwo} to={currentSubItem.link} className="sitenav__menu__container__left__primary__item__link__subitem">{currentSubItem.name}</Link>
                      ))}
                    </span>
                  ))}
                </nav>
                <div className="column sitenav__menu__container__right">
                  <nav className="sitenav__menu__container__right__about">
                    {this.props.items.secondaryNav.aboutLinks.map((currentAbout, index) => (
                      <span key={index} className="sitenav__menu__container__right__about__item">
                        <Link onClick={this.props.onClickHamburguer} to={currentAbout.link} className="sitenav__menu__container__right__about__item__link">{currentAbout.name}</Link>
                      </span>
                    ))}
                  </nav>
                  <nav className="sitenav__menu__container__right__social">
                    {this.props.items.secondaryNav.socialLinks.map((currentSocial, index) => (
                      <span key={index} className="sitenav__menu__container__right__social__item">
                        <a onClick={this.props.onClickHamburguer} href={currentSocial.link} className="sitenav__menu__container__right__social__item__link" target="_blank">
                          <img className="sitenav__menu__container__right__social__item__link__logo" src={IMAGES_OBJECT[currentSocial.name]} alt={`${currentSocial.name} Social logo`} />
                        </a>
                      </span>
                    ))}
                  </nav>
                  <nav className="sitenav__menu__container__right__legal">
                    {this.props.items.secondaryNav.legalLinks.map((currentLegal, index) => (
                      <span key={index} className="sitenav__menu__container__right__legal__item">
                        <Link onClick={this.props.onClickHamburguer} to={currentLegal.link} className="sitenav__menu__container__right__legal__item__link">{currentLegal.name}</Link>
                      </span>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="columns is-mobile sitenav__menu__container__bottom">
                <nav className="column  is-full-mobile is-two-thirds-tablet sitenav__menu__container__bottom__certifications">
                  {this.props.items.certifications.map((currentCert, index) => (
                    <span key={index} className="sitenav__menu__container__bottom__certifications__item">
                      <Link onClick={this.props.onClickHamburguer} to={currentCert.link} className="sitenav__menu__container__bottom__certifications__item__link">{currentCert.name}</Link>
                    </span>
                  ))}
                </nav>
                <nav className="column sitenav__menu__container__bottom__languages">
                  {this.props.items.languagesLinks.map((currentLang, index) => (
                    <span key={index} className="sitenav__menu__container__bottom__languages__item">
                      <Link onClick={this.props.onClickHamburguer} to={currentLang.link} className="sitenav__menu__container__bottom__languages__item__link">{currentLang.name}</Link>
                    </span>
                  ))}
                </nav>
              </div>
            </div>
          </div>          
        </div>
      </section>
    )
  }
}

export default NavigationMenu;