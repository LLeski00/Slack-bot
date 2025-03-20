require("dotenv").config();
const { App } = require("@slack/bolt");
const { handleIncomingMessage } = require("./messageHandler");

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
    if (message.text && message.text.includes(`<@${botUserId}>`))
        handleIncomingMessage(message, say, botUserId);
});

(async () => {
    await app.start(process.env.PORT || 3000);
    app.logger.info("⚡️ Bolt app is running!");
})();
