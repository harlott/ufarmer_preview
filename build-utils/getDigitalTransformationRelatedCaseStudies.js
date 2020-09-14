const _ = require('lodash');

const getDigitalTransformationRelatedCaseStudies = (relatedCategoriesReference, edges) => {
    let relatedContents = [];
    if (!_.isEmpty(relatedCategoriesReference)) {
        const relatedContentsFiltered = edges
        .filter(
          item => {
            const { templateKey, digitalTransformationCategoryReference, visible } = item.node.frontmatter;
            const isCaseHistory = templateKey === 'case-study-page';
            const hasDigitalTransformationCategory = !_.isEmpty(digitalTransformationCategoryReference) 
              ? digitalTransformationCategoryReference.indexOf(relatedCategoriesReference) > -1
              : false;
            return isCaseHistory && hasDigitalTransformationCategory && visible === true;
          }
        );
        if (_.get(relatedContentsFiltered, 'length', 0) > 0) {
            relatedContents = relatedContentsFiltered
            .map(
              item => ({
                link: item.node.fields.slug,
                title: item.node.frontmatter.title,
                image: item.node.frontmatter.featuredimage,
                description: item.node.frontmatter.description
              })
            );
        }
    }
    return relatedContents;
}

module.exports = getDigitalTransformationRelatedCaseStudies;
