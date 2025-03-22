# Loca Bot - Upute za instalaciju i postavke

## Uvod

Ovaj repozitorij sadrži Slack bota koji pomaže korisnicima da brzo dobiju informaciju o lokaciji traženog objekta.

## Preduvjeti

Prije nego što postavite Slack bota, osigurajte da imate sljedeće:

- Slack workspace u kojem imate administrativne privilegije.
- Google Sheets dokument koji sadrži podatke koje želite da bot pristupi.
- Instaliran Node.js i npm na vašem računalu.

## Instalacija

1. Klonirajte ovaj repozitorij na svoje računalo
2. Instalirajte sve potrebne ovisnosti sa npm install
3. Postavite svoj Slack App:
    - Idite na [Slack API](https://api.slack.com/apps) stranicu i kliknite na **Create New App**.
    - Odaberite **From Scratch**, dajte svom appu ime i odaberite workspace u kojem ga želite instalirati.
    - Pod **OAuth & Permissions**, dodajte sljedeće bot token scope-ove:
        - `app_mentions:read`
        - `chat:write`
        - `commands`
    - Instalirajte app u svoj workspace klikom na **Install App**.
    - Nakon instalacije, dobit ćete **Bot Token** (`SLACK_BOT_TOKEN`) i **Signing Secret**.
    - Pod **Event Subscriptions**, omogućite **Enable Events** i unesite URL za događaje sa postfixom "/slack/events". Ako koristite ngrok, pokrenite ngrok za svoj lokalni server (koji će slušati na portu 3000 ili onom koji ste odabrali) s naredbom "ngrok http 3000"
    - **Alternativa**: Ako ne želite koristiti ngrok, možete postaviti svoj bot na vlastiti server ili platformu (npr. Heroku, AWS, DigitalOcean) i koristiti svoju domenu za **Request URL**. U tom slučaju, URL za događaje će biti vaša domena (npr. `https://yourdomain.com/slack/events`).
4. Postavite Google Sheets API:
    - Idite na [Google Developers Console](https://console.developers.google.com/).
    - Kreirajte novi projekt ili odaberite postojeći projekt.
    - Omogućite **Google Sheets API**.
    - Idite na **APIs & Services > Credentials** i kreirajte **OAuth 2.0 Client IDs** za svoju aplikaciju.
    - Preuzmite datoteku s kredencijalima (`credentials.json`) i stavite je u `src` folder repozitorija.
    - Podijelite svoj Google Sheets dokument s e-mail adresom koja je povezana s vašim **OAuth 2.0 Client ID** (e-mail adresu ćete naći u datoteci `credentials.json`, obično pod "client_email"). To omogućava bota da pristupi podacima u tom dokumentu.
5. Konfigurirajte varijable okruženja:
    - Kreirajte `.env` datoteku u root direktorij projekta i dodajte sljedeće:
        ```
        SLACK_SIGNING_SECRET=your_secret
        SLACK_BOT_TOKEN=your_bot_token
        SLACK_APP_TOKEN=your_app_token
        SLACK_APP_ID=your_app_id
        SPREADSHEET_ID=your_spreadsheet_id
        SHEET_NAME="Name of your sheet"
        ```
6. Pokrenite bota:
    - Pokrenite bota pomoću sljedeće naredbe:
        ```bash
        node ./src/app.js
        ```
    - Bot će sada biti pokrenut i spreman za odgovaranje na poruke u vašem Slack workspaceu.

## Korištenje

Da biste komunicirali s botom, treba ga inviteati bilo kojem kanalu upisivanjem `/invite @your-bot-name`.
Kada ga spomenete samo sa `@your-bot-name` dobiti ćete upute za korištenje.

Za osvježavanje podataka iz Google Sheets-a, upišite `@your-bot-name refresh`. Bot će dohvatiti najnovije podatke iz tablice.

## Rješavanje problema

- Ako bot ne odgovara, provjerite je li bot ispravno instaliran u vašem workspaceu i ima li odgovarajuće dozvole.
- Ako bot ne može dohvatiti podatke iz tablice, provjerite je li točan `SPREADSHEET_ID` i `SHEET_NAME` postavljen u `.env` datoteci i ima li bot pristup Google Sheets dokumentu.
