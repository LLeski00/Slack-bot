require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message("hello", async ({ message, say }) => {
    await say(`Hey there <@${message.user}>!`);
});

(async () => {
    await app.start(process.env.PORT || 3000);
    app.logger.info("⚡️ Bolt app is running!");
})();
