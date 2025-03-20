function getResponseMessage(likelyItems) {
    if (likelyItems.length === 0) return "Predmet koji tražite nije pronađen.";
    console.log("Likely items: ", likelyItems);

    const message = likelyItems.reduce((acc, curr) => {
        return acc + `Predmet: ${curr.item[0]}, Lokacija: ${curr.item[1]}\n`;
    }, "");

    return message.trim();
}

module.exports = { getResponseMessage };
