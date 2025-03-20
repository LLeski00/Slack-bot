require("dotenv").config();
const { google } = require("googleapis");
const path = require("path");

const credentials = require(path.join(__dirname, "credentials.json"));

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

let cachedData = null;

async function refreshData() {
    cachedData = await fetchDataFromSheet();
}

async function fetchDataFromSheet() {
    try {
        const authClient = await auth.getClient();
        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = process.env.SHEET_NAME;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
            auth: authClient,
        });
        return response.data.values ?? null;
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return null;
    }
}

async function getDataFromSheet() {
    if (!cachedData) cachedData = await fetchDataFromSheet();
    return cachedData;
}

module.exports = { getDataFromSheet, refreshData };
