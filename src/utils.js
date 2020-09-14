const UTILS = {
  tagFormatter: (tagString, asCapitalize =  false) => {
    if (!asCapitalize) return tagString.replace('-', ' ');
    return UTILS.capitalizeString(tagString);
  },
  capitalizeString: (incomingString) => {
    const stringAsArray = incomingString.split('-');
    stringAsArray[0] = stringAsArray[0].substr( 0, 1 ).toUpperCase() + stringAsArray[0].substr( 1 );
    return stringAsArray.join(' ');
  }
};

export default UTILS;