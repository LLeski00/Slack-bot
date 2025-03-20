require("dotenv").config();
const { App } = require("@slack/bolt");
const sheetsApi = require("./sheetsApi");
const matcher = require("./matcher");
const messageCreator = require("./messageCreator");
const { USAGE_MESSAGE } = require("./config");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

let botUserId;

(async () => {
    const result = await app.client.auth.test();
    botUserId = result.user_id;
})();

app.message(async ({ message, say }) => {
    if (message.text && message.text.includes(`<@${botUserId}>`)) {
        const userMessage = message.text.replace(`<@${botUserId}>`, "").trim();

        if (userMessage.length === 0) {
            await say(`${USAGE_MESSAGE}`);
            return;
        }

        const items = await sheetsApi.getDataFromSheet();
        const likelyItems = matcher.getLikelyItems(items, userMessage);
        const responseMessage = messageCreator.getResponseMessage(
            likelyItems,
            message.user
        );
        await say(`${responseMessage}`);
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);
    app.logger.info("⚡️ Bolt app is running!");
})();
