# Google Sheets Lead Generation Setup

To enable saving booking requests to your Google Sheet, follow these steps:

1.  **Create a Google Sheet**
    -   Go to `sheets.new`.
    -   Name it "Anuva Leads" (or anything you like).
    -   Add headers in the first row: `Date`, `Name`, `Email`, `Phone`, `Service`, `Context`.

2.  **Open Apps Script**
    -   In the Sheet, click **Extensions** > **Apps Script**.

3.  **Paste the Code**
    -   Delete any code in `Code.gs` and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.phone,
    data.service,
    data.context || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4.  **Deploy as Web App**
    -   Click **Deploy** > **New deployment**.
    -   Select type: **Web app**.
    -   Description: "Lead Collector".
    -   Execute as: **Me**.
    -   **Who has access**: **Anyone** (This is important for the website to send data without login).
    -   Click **Deploy**.

5.  **Copy the URL**
    -   Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/.../exec`).
    -   Share that URL with me, or paste it into the application configuration.
