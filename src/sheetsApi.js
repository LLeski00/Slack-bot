require("dotenv").config();
const { google } = require("googleapis");
const path = require("path");

const credentials = require(path.join(__dirname, "credentials.json"));

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4" });

async function getDataFromSheet() {
    try {
        const authClient = await auth.getClient();
        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = "List 1";
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
            auth: authClient,
        });
        const data = response.data.values;
        if (data.length) {
            console.log("Data from the sheet:");
            console.log(data);
            return data;
        } else {
            console.log("No data found.");
        }
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
    }
}

module.exports = { getDataFromSheet };
