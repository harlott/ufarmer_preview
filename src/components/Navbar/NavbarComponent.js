import React from 'react'
import PropTypes from 'prop-types';

import filter from 'lodash/filter'

import menuConfig from '../../../config/menu/it.json'
import NavigationBar from './NavigationBar';
import NavigationMenu from './NavigationMenu';

import './navbar.scss'

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.navbarLinks = filter(menuConfig.primaryNavs, (current) => current.navbar === true)
  }

  clickHandler = () => {
    this.props.activate(this.props.menuActive);
  }

  shouldComponentUpdate(nextProps){
     return nextProps.menuActive !== this.props.menuActive;
  }

  render() {
    return (
      <div className="nav-container">
        <NavigationBar theme={this.props.theme} menuActive={this.props.menuActive} links={this.navbarLinks} onClickHamburguer={this.clickHandler} />
        <NavigationMenu theme={this.props.theme} menuActive={this.props.menuActive} items={menuConfig} onClickHamburguer={this.clickHandler}/>
      </div>
    )
  }
};

NavbarComponent.propTypes = {
  menuActive: PropTypes.bool,
  setMenuActive: PropTypes.func,
};

NavbarComponent.defaultProps = {
  menuActive: false,
  activate: () => {},
};

export default NavbarComponent
