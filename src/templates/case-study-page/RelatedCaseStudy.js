import React from 'react';
import _get from 'lodash/get';

import CardsComponent from '../../components/CardsContainerComponent/CardsContainer';

const RelatedCaseStudy = props => {
    if (!_get(props.relatedContentByTags, 'length')) return null;
    const filteredData = props.relatedContentByTags.filter(related => {
        return related.id !== props.contentId;
    })
    if (_get(filteredData, 'length', 0) <= 0) return null;
    return (
      <CardsComponent theme={props.theme} title={props.title} cards={filteredData} />
  )
}

export default RelatedCaseStudy; // Sostituire per il renderizato dalla query

/* NOTES:
 Il risultato viene passato a CardsComponents tramite la proprietà cards,
 che si aspetta un array di oggetti dove ognuno dovrebbe avere una struttura cosi: 
 {
    image
    title
    description
    link
 }
*/

