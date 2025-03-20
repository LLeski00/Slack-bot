const fuzz = require("fuzzball");

function getScoredItem(item, pattern) {
    const score = fuzz.partial_ratio(item[0], pattern);
    console.log({ item, score });
    return { item, score };
}

function getLikelyItems(items, pattern) {
    const scoredItems = items
        .map((item) => getScoredItem(item, pattern))
        .filter((scoredItem) => scoredItem.score > 50)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    return scoredItems;
}

module.exports = { getLikelyItems, getScoredItem };
