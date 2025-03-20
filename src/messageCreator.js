function getResponseMessage(likelyItems) {
    if (likelyItems.length === 0) return "Ne postoji u bazi.";

    const message = likelyItems.reduce((acc, curr) => {
        return acc + `Predmet: ${curr.item[0]}, Lokacija: ${curr.item[1]}\n`;
    }, "");

    return message.trim();
}

module.exports = { getResponseMessage };
