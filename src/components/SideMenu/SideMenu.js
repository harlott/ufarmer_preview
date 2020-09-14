import React from "react";
import { HTMLContent } from "../Content";

import "./side-menu.scss";

class SideMenu extends React.PureComponent {
  render() {
    if (!this.props.items) return null;
    return (
      <div className="column is-one-third-tablet side-menu">
        <div className={this.props.className}>
          {this.props.items.map(item => (
            <div className="side-menu__info-block">
              <h3 className="side-menu__info-block__title">{item.title}</h3>
              <HTMLContent
                content={item.description}
                className="side-menu__info-block__text"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SideMenu;
