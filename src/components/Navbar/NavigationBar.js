import React from 'react';
import { Link } from 'gatsby'

import brandLogoWhite from '../../../static/img/brand_logo/brand_logo_white.svg'
import brandLogoBlack from '../../../static/img/brand_logo/brand_logo_black.svg'

class NavigationBar extends React.PureComponent {
  logoByTheme() {
    switch(this.props.theme) {
      case 'black':
        return brandLogoBlack;
      case 'white':
      default:
        return brandLogoWhite;
    }
  }

  render() {
    const menuBehaviorClass = this.props.menuActive === true ? 'menu-visible' : '';
    return(
      <div className={`sitenav__nav theme-${this.props.theme}`}>
        <div className="main-content-container main-content-padding">
          <nav className="columns is-mobile is-vcentered is-gapless sitenav__nav__content" role="navigation">
              <div className={`column is-narrow sitenav__nav__content__brand ${menuBehaviorClass}`}>
                <Link to="/" className="column-mobile sitenav__nav__content__brand__item" title="CWS Brand Logo">
                  <img className="brand-logo" src={this.logoByTheme()} alt={"CWS Brand logo white"} />
                </Link>
              </div>
              <div className={`column-mobile is-narrow sitenav__nav__content__links ${menuBehaviorClass}`}>
                {this.props.links && this.props.links.length > 0 && this.props.links.map( (currentNav, index) => (
                  <Link key={index} className="sitenav__nav__content__links__item" to={currentNav.link}>
                    {currentNav.name}
                  </Link>
                ))}
              </div>
              <div className={`sitenav__nav__content__hamburguer`} onClick={this.props.onClickHamburguer}>
                <span className={`sitenav__nav__content__hamburguer__bar`} />
                <span className={`sitenav__nav__content__hamburguer__bar`} />
              </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavigationBar;