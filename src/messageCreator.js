function getResponseMessage(likelyItems, user) {
    if (likelyItems.length === 0)
        return `Žao mi je <@${user}>, predmet koji tražite nije pronađen.`;
    const itemLocationsMessage = likelyItems.reduce((acc, curr) => {
        return acc + `Predmet: ${curr.item[0]}, Lokacija: ${curr.item[1]}\n`;
    }, "");
    const responseMessage = `Pretraživač: <@${user}>\n` + itemLocationsMessage;
    return responseMessage.trim();
}

module.exports = { getResponseMessage };
