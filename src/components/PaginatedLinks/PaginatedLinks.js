import React from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import './paginatedLinks.scss'

class PaginatedLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
    }
  }

  setPageIndexValue(newValue) {
    this.setState({currentPageIndex: newValue})
  }

  renderPaginatorNumbers(quantity) {
    const numbersBody = [];
    for (let i = 0; i < quantity; i++) {
      numbersBody.push(
        <span onClick={() => this.setPageIndexValue(i * this.props.max)} className={`paginated-links__paginator-container__paginator-block__paginator-number ${i * this.props.max === this.state.currentPageIndex ? ' current' : ''}`}>
          {i + 1}
        </span>
      )
    }
    return numbersBody;
  }

  render() {
    const safeMapItem = (item) => {
      const safeItem = Object.assign({}, item);
      let resLink = item.link;

      if (typeof item.filedownload === 'object' && !_isEmpty(_get(item.filedownload, 'publicURL'))) {
        resLink = item.filedownload.publicURL;
      }

      if (typeof item.filedownload === 'string' && !_isEmpty(item.filedownload)) {
        resLink = item.filedownload;
      }

      safeItem.link = resLink;
      return safeItem
    }

    const contents = _get(this.props.content, 'length', 0) > 0 ?
        this.props.content.slice(this.state.currentPageIndex, this.state.currentPageIndex + this.props.max).map((currentLink) => {
          return safeMapItem(currentLink);
        }) : [];
    return (
      <div className={`paginated-links paginated-links-theme-${this.props.theme}`}>
        <div className="paginated-links__links-container">
          {contents.map((currentLink) => (
            <div className="paginated-links__links-container__link-block">
              <div className="paginated-links__links-container__link-block__link-description">
                <h3 className="paginated-links__links-container__link-block__link-description__link-title">{currentLink.title}</h3>
                <p className="paginated-links__links-container__link-block__link-description__link-text">{currentLink.description}</p>
              </div>
              <div className="paginated-links__links-container__link-block__link-arrow">
                {_get(currentLink.link, 'length', 0) > 0 &&
                  <a target="_blank" href={currentLink.link} className="paginated-links__links-container__link-block__link-arrow__arrow-block" />
                }
              </div>
            </div>
          ))}
        </div>
        {_get(this.props.content, 'length', 0) > this.props.max &&
          <div className="paginated-links__paginator-container">
            <div className="paginated-links__paginator-container__paginator-block">
              {
                this.renderPaginatorNumbers(Math.ceil(this.props.content.length / this.props.max))
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

PaginatedLinks.propTypes = {
  content: PropTypes.arrayOf(PropTypes.any),
  max: PropTypes.number,
  theme: PropTypes.string,
};

PaginatedLinks.defaultProps = {
  content: [],
  max: 3,
  theme: 'white',
};

export default PaginatedLinks;
