const _ = require('lodash');
const getRelatedByTags = (tags, edges) => {
    if (_.isEqual(typeof tags, 'object') === false) {
        return [];
    }
    const relatedContents = edges
        .filter((edge) => {
            const { templateKey, visible } = edge.node.frontmatter;
            if (edge.node.frontmatter.tags == null) {
                return false;
            }
            const isResource = (templateKey === 'blog-post' || templateKey === 'case-study-page' || templateKey === 'event-page') && visible === true;
            let hasTag = false;
            if (isResource === true) {
                if (_.isEqual(edge.node.frontmatter.tags, null) === false ) {
                    const parsedEdgeTagArray = _.split(edge.node.frontmatter.tags, ',');
                    parsedEdgeTagArray.forEach(tag => {
                        if (_.isEqual(tags, null) === false ) {
                            if (tags.indexOf(tag) > -1 && hasTag === false) {
                                hasTag = true;
                            }
                        }
                    })
                }
            }
            return hasTag;
        });
    const maxRelatedLength = 9;
    const relatedToMap = relatedContents.length > maxRelatedLength ? relatedContents.slice(0, 10) : relatedContents; 
    const relatedMapped = relatedToMap.map(edge => {
        const maxLength = 264;
        const { description } = edge.node.frontmatter; 
        const excerpt = _.get(description, 'length', 0) <= maxLength ?
                description :
                `${description.substr(0,maxLength)}...`;
        return {
            id: edge.node.id,
            title: edge.node.frontmatter.title,
            image: edge.node.frontmatter.featuredimage,
            'description': excerpt,
            link: edge.node.fields.slug
        };
    }).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return relatedMapped;  
};

module.exports = getRelatedByTags;