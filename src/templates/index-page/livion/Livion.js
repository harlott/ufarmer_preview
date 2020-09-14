import React from 'react';
import './livion.scss';

import ReadMoreLink from '../../../components/ReadMoreLink/ReadMoreLink';

import imageLivion from '../../../../static/img/livion/livion.png';

class Livion extends React.PureComponent {
  render() {
    const livion = this.props.livion || {};
    const { title, titleLabel, description, link } = livion;
    return (
      <div className="home__livion ">
        <div className="main-content-container">
          <div className="home__livion__container columns is-gapless is-vcentered">
            <div className="column">
              <div className="home__livion__content">
                <h4 className="home__livion__content__category">{titleLabel}</h4>
                <h2 className="home__livion__content__title">{title}</h2>
                <p className="home__livion__content__description">{description}</p>
                <ReadMoreLink title="scopri di più" url={link} />
              </div>
            </div>
            <div className="column home__livion__images no-side-padding">
              <img className="home__livion__images__monitor home__livion__images__monitor__mobile" src={imageLivion} alt="Monitor with livion screen and mobile app" />
            </div>
            <img className="home__livion__images__monitor home__livion__images__monitor__desktop" src={imageLivion} alt="Monitor with livion screen and mobile app" />
          </div>
        </div>
      </div>
    )
  }
}

export default Livion;