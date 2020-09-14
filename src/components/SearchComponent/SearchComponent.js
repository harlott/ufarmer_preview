import React from 'react';
import { Link } from 'gatsby';
import { connect } from "react-redux";

import _get from 'lodash/get';
import _map from 'lodash/map';

import './searchComponent.scss';
import CustomScrollbarVerticalComponent from '../CustomScrollbarComponent/CustomScrollbarVerticalComponent';
import Modal from "../Modal/Modal";
import UTILS from '../../utils';

export const searchModalId ='search-modal';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
    this.dataToFilter = this.props.data.map(post => {
      return {
        title: post.node.frontmatter.title,
        slug: post.node.fields.slug,
        tags: post.node.frontmatter.tags,
      }
    });
  }

  handleSearchKeypress(e) {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  handleSearchChange(value) {
    console.log('log');
    if (value.length > 2) {
      const filteredData = this.dataToFilter.filter(item => {
        return item.title.toLowerCase().search(value.toLowerCase()) > -1 //|| item.tags.indexOf(value) > -1;
      });
      this.setState({
        filteredData,
        search: value
      });
    } else {
      this.setState({
        filteredData: [],
        search: value
      });
    }
  }

  render() {
    const { modal, dispatch } = this.props;
    return (
        <Modal
            id={searchModalId}
            modal={modal}
            dispatch={dispatch}
            modalStyle={{width: '100%', height: '100%', maxHeight: 'initial', overflow: 'hidden'}}
            onCloseHandler={() => { this.setState({ filteredData: [], search: '' })} }
        >
          <div className="search-component">
            <div className="main-content-container main-content-padding search-component__search-body">

              <div className="search-component__search-body__search-input-placeholder">
                <input className="search-component__search-body__search-input-placeholder__input-field" placeholder="A cosa sei interessato? (ad esempio: Musei)" type="text" value={this.state.search} onChange={(event) => { this.handleSearchChange(event.target.value) }} onKeyDown={this.handleSearchKeypress.bind(this)} />
                <button type="button" onClick={() => this.handleSearchChange('')} className="search-component__search-body__search-input-placeholder__clear-search">Clear</button>
              </div>
              <div className="search-component__search-body__search-results-placeholder">
                <CustomScrollbarVerticalComponent>
                  <div className="search-component__search-body__search-results-placeholder__search-results-blocks">
                    {_get(this.state.filteredData, 'length', 0) > 0 && _map(this.state.filteredData, current => (
                        <Link to={current.slug} className="search-component__search-body__search-results-placeholder__search-results-blocks__search-result-block">
                          {_get(current, 'date', null) &&
                          <div className="search-component__search-body__search-results-placeholder__search-results-blocks__search-result-block__date-placeholder">{current.date}</div>
                          }
                          {_get(current, 'tags.length', 0) > 0 &&
                          <div className="search-component__search-body__search-results-placeholder__search-results-blocks__search-result-block__tags-placeholder">
                            {_map(current.tags, currentTag => (
                                <span className="search-component__search-body__search-results-placeholder__search-results-blocks__search-result-block__tags-placeholder__tag-item">{UTILS.tagFormatter(currentTag)}</span>
                            ))}
                          </div>
                          }
                          {_get(current, 'title', null) &&
                          <div className="search-component__search-body__search-results-placeholder__search-results-blocks__search-result-block__title-placeholder">{current.title}</div>
                          }
                        </Link>
                    ))}
                  </div>
                </CustomScrollbarVerticalComponent>
              </div>
            </div>
          </div>
        </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps)(SearchComponent);
