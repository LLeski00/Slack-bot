const fuzz = require("fuzzball");
const { MIN_SCORE, MAX_ITEMS } = require("./config");

function getScoredItem(item, pattern) {
    if (item.length === 0) {
        return { item, score: 0 };
    }
    const score = fuzz.ratio(item[0], pattern);
    return { item, score };
}

function getLikelyItems(items, pattern) {
    const likelyItems = items
        .reduce((acc, item) => {
            const scoredItem = getScoredItem(item, pattern);
            if (scoredItem.score >= MIN_SCORE) acc.push(scoredItem);
            return acc;
        }, [])
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_ITEMS);

    return likelyItems;
}

module.exports = { getLikelyItems };
