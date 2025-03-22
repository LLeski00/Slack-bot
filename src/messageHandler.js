const { USAGE_MESSAGE, REFRESH_MESSAGE } = require("./config");
const { getLikelyItems } = require("./matcher");
const { getDataFromSheet, refreshData } = require("./sheetsApi");

function getResponseMessage(likelyItems, user) {
    if (likelyItems.length === 0)
        return `Žao mi je <@${user}>, predmet koji tražite nije pronađen.`;
    const itemLocationsMessage = likelyItems.reduce((acc, curr) => {
        return (
            acc +
            `Predmet: ${curr.item[0]}, Lokacija: ${
                curr.item[1] ?? "Nepoznato"
            }\n`
        );
    }, "");
    const responseMessage = `Pretraživač: <@${user}>\n` + itemLocationsMessage;
    return responseMessage.trim();
}

async function handleLocationData(userMessage, user, say) {
    const items = await getDataFromSheet();

    if (!items) {
        await say(`Dogodila se greška prilikom dohvaćanja podataka.`);
        return;
    }

    const likelyItems = getLikelyItems(items, userMessage);
    const responseMessage = getResponseMessage(likelyItems, user);
    await say(`${responseMessage}`);
}

async function handleIncomingMessage(message, say, botUserId) {
    const userMessage = message.text.replace(`<@${botUserId}>`, "").trim();

    if (userMessage.length === 0) {
        await say(`${USAGE_MESSAGE}`);
        return;
    } else if (userMessage.toLowerCase() === "refresh") {
        await refreshData();
        await say(`${REFRESH_MESSAGE}`);
        return;
    }

    handleLocationData(userMessage, message.user, say);
}

module.exports = { handleIncomingMessage };
