require("dotenv").config();
const { App } = require("@slack/bolt");
const sheetApi = require("./sheets_api");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

let botUserId;

(async () => {
    const result = await app.client.auth.test();
    botUserId = result.user_id;
    console.log(`Bot User ID: ${botUserId}`);
})();

app.message(async ({ message, say }) => {
    if (message.text && message.text.includes(`<@${botUserId}>`)) {
        const userMessage = message.text.replace(`<@${botUserId}>`, "").trim();
        const items = await sheetApi.getDataFromSheet();
        await say(`All items: ${items}`);
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);
    app.logger.info("⚡️ Bolt app is running!");
})();
