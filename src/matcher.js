const fuzz = require("fuzzball");
const { MIN_SCORE, MAX_ITEMS } = require("./config");

function getScoredItem(item, pattern) {
    const score = fuzz.ratio(item[0], pattern);
    return { item, score };
}

function getLikelyItems(items, pattern) {
    console.log(items);

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
