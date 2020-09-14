import React from 'react'

import { HTMLContent } from '../../../components/Content.js'
import ReadMoreLink from '../../../components/ReadMoreLink/ReadMoreLink.js'
import SafeImage from '../../../components/SafeImage';
const capitalizeText = (string) => {
  const divideString = string.toUpperCase().split(" ");
  let resultString = "";
  divideString.map((currentWord, index) => {
    index === 0
      ? resultString += `${currentWord.charAt(0)}${currentWord.slice(1, currentWord.length).toLowerCase()}${ index + 1 === divideString.length ? '' : ' ' }`
      : resultString += currentWord.toLowerCase()
  })
  return (resultString);
}

class ContentBlock extends React.Component {
  render() {
    const { image } = this.props.data;
    return(
      <div className="sections-block__container main-content-container main-content-padding">
        <div className="columns sections-block__section-block">
          <div className="column is-narrow">
            <div className="sections-block__section-block__block-image">
              <SafeImage
                image={this.props.data.image}
                title={this.props.data.title}
                imageDescription={this.props.data.imageDescription}
              />
            </div>
          </div>
          <div className="column sections-block__section-block__block-title">
            <h2>{capitalizeText(this.props.data.title)}</h2>
          </div>
        </div>
        <div className="columns">
          <div className="column sections-block__section-block__target-column">
            <div className="sections-block__section-block__block-targets">
              <h3 className="sections-block__section-block__block-targets__targets-title">Il percorso dedicato ai settori</h3>
              <ul className="sections-block__section-block__block-targets__targets-list">
                {this.props.data.areas.map(currentArea => (
                  <li className="sections-block__section-block__block-targets__targets-list__item">{currentArea}</li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="column sections-block__section-block__description">
            {this.props.data.textBlocks.map(item => (
              <>
                <h2>{item.title}</h2>
                <HTMLContent
                  content={item.text}
                  className="sections-block__section-block__description__text"
                />
              </>
            ))
            }
            
          </div>
        </div>
        <div className="columns">
          <div className="column sections-block__section-block__block-placeholder sections-block__section-block__target-column" />
          <div className="column sections-block__section-block__description placeholder">
            <ReadMoreLink url={`/digital-transformation/${this.props.data.link}`} title="Scopri di più" />
          </div>
        </div>
      </div>
    )
  }
}

export default ContentBlock;  
