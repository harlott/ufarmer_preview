import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import linkedinLogo from '../../../static/img/social_icons/linkedin.svg'
import facebookLogo from '../../../static/img/social_icons/facebook.svg'
import twitterLogo from '../../../static/img/social_icons/twitter.svg'
import instagramLogo from '../../../static/img/social_icons/instagram.svg'

const IMAGES_OBJECT = {
  linkedin: linkedinLogo,
  facebook: facebookLogo,
  twitter: twitterLogo,
  instagram: instagramLogo,
}

class FooterSocialSection extends React.PureComponent {
  render() {
    const { menuConfig } = this.props
    return (map(menuConfig.secondaryNav.socialLinks, (currentSocial, index) => (
        <span key={index} className="site_footer__navigation__social__item">
          <a href={currentSocial.link} className="site_footer__navigation__social__item__link" target="_blank">
            <img className="site_footer__navigation__social__item__link__logo" src={IMAGES_OBJECT[currentSocial.name]} alt={`${currentSocial.name} Social logo`} />
          </a>
        </span>
      ))
    )
  }
}

FooterSocialSection.propTypes = {
  menuConfig: PropTypes.array
}

FooterSocialSection.defaultProps = {
  menuConfig: []
}

export default FooterSocialSection