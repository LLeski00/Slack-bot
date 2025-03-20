const { USAGE_MESSAGE } = require("./config");
const { getLikelyItems } = require("./matcher");
const { getDataFromSheet, refreshData } = require("./sheetsApi");

function getResponseMessage(likelyItems, user) {
    if (likelyItems.length === 0)
        return `Žao mi je <@${user}>, predmet koji tražite nije pronađen.`;
    const itemLocationsMessage = likelyItems.reduce((acc, curr) => {
        return acc + `Predmet: ${curr.item[0]}, Lokacija: ${curr.item[1]}\n`;
    }, "");
    const responseMessage = `Pretraživač: <@${user}>\n` + itemLocationsMessage;
    return responseMessage.trim();
}

async function handleIncomingMessage(message, say, botUserId) {
    const userMessage = message.text.replace(`<@${botUserId}>`, "").trim();

    if (userMessage.length === 0) {
        await say(`${USAGE_MESSAGE}`);
        return;
    } else if (userMessage.toLowerCase() === "refresh") {
        await refreshData();
        await say("The data has been successfully refreshed.");
        return;
    }

    const items = await getDataFromSheet();

    if (!items) {
        console.error(
            "There was an error fetching the data from Google sheets"
        );
        return;
    }

    const likelyItems = getLikelyItems(items, userMessage);
    const responseMessage = getResponseMessage(likelyItems, message.user);
    await say(`${responseMessage}`);
}

module.exports = { getResponseMessage, handleIncomingMessage };
