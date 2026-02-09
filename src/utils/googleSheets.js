export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSygxZE1KP_QPlqI5wSF5rozmEz3tO_38ijZlsYNwgQcUMycKydsYkw3_7ozj1iopjJA/exec';

/**
 * Submits data to the Google Sheet via Apps Script
 * @param {Object} data - The data to submit (must be JSON serializable)
 * @returns {Promise<boolean>} - True if successful
 */
export const submitToGoogleSheets = async (data) => {
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return true;
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return false;
    }
};
