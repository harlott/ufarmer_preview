import React from 'react';
import PropTypes from 'prop-types';


import './cookiesPolicy.scss';
import { Link } from 'gatsby';

class CookiesPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: true,
    }
  }

  componentDidMount(){
    if (window !== undefined) {
      if (!localStorage.getItem('user-accept-cookies')) {
        this.setState({
          accepted: false
        })
      }
    }
  }

  onAcceptCookies() {
    localStorage.setItem('user-accept-cookies', true);
    this.setState({accepted: localStorage.getItem('user-accept-cookies') || false,});
  }

  render() {
    if (!this.state.accepted)
      return (
        <div className="cookies-policy-widget">
          <div className="main-content-container main-content-padding cookies-policy-widget__placeholder">
            <div className="cookies-policy-widget__container">
              <div className="cookies-policy-widget__container__content">
                <div className="cookies-policy-widget__container__content__text-container">
                  <p className="cookies-policy-widget__container__content__text-container__description">Questo sito web richiede i cookie.</p>
                  <Link to="info/cookies-policy" className="cookies-policy-widget__container__content__text-container__link">Cookies Policy</Link>
                </div>
                <div className="cookies-policy-widget__container__content__button-container">
                  <button className="cookies-policy-widget__container__content__button-container__button" onClick={this.onAcceptCookies.bind(this)}>OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return null;
  }
}

export default CookiesPolicy;