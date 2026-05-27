const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

class GoogleSheetsService {
    constructor() {
        this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
        this.sheetName = process.env.SHEET_NAME || 'Submissions';
        this.initializeAuth();
    }

    /**
     * Initialize Google authentication
     */
    initializeAuth() {
        try {
            // Debug: log the key format
            const rawKey = process.env.GOOGLE_PRIVATE_KEY;
            console.log('Raw key first 50 chars:', rawKey?.substring(0, 50));
            console.log('Raw key last 50 chars:', rawKey?.substring(rawKey.length - 50));
            console.log('Key length:', rawKey?.length);
            
            // Create auth client using service account credentials
            const processedKey = rawKey?.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
            console.log('Processed key first 50 chars:', processedKey?.substring(0, 50));
            
            this.authClient = new GoogleAuth({
                projectId: process.env.GOOGLE_PROJECT_ID,
                credentials: {
                    type: 'service_account',
                    project_id: process.env.GOOGLE_PROJECT_ID,
                    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
                    private_key: processedKey,
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
                    token_uri: 'https://oauth2.googleapis.com/token',
                    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
                    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            });

            this.sheets = google.sheets({
                version: 'v4',
                auth: this.authClient
            });

            console.log('✓ Google Sheets authentication initialized');
        } catch (error) {
            console.error('✗ Failed to initialize Google Sheets auth:', error.message);
            throw error;
        }
    }

    /**
     * Append a row to the Google Sheet
     * @param {Object} data - { name, email, message, timestamp }
     * @returns {Promise<Object>} - Response from Google Sheets API
     */
    async appendRow(data) {
        try {
            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: `${this.sheetName}!A:D`,
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [
                        [
                            data.name,
                            data.email,
                            data.message,
                            data.timestamp
                        ]
                    ]
                }
            });

            console.log(`✓ Row appended to Google Sheets: ${data.email}`);
            return response.data;
        } catch (error) {
            console.error('✗ Error appending to Google Sheets:', error.message);
            throw new Error('Failed to save form submission');
        }
    }

    /**
     * Initialize headers in the sheet if they don't exist
     */
    async initializeSheet() {
        try {
            // Get current values to check if headers exist
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${this.sheetName}!A1:D1`
            });

            // If no data exists, add headers
            if (!response.data.values || response.data.values.length === 0) {
                await this.sheets.spreadsheets.values.update({
                    spreadsheetId: this.spreadsheetId,
                    range: `${this.sheetName}!A1:D1`,
                    valueInputOption: 'RAW',
                    resource: {
                        values: [['Name', 'Email', 'Message', 'Timestamp']]
                    }
                });

                console.log('✓ Sheet headers initialized');
            }
        } catch (error) {
            console.error('✗ Error initializing sheet:', error.message);
            throw error;
        }
    }

    /**
     * Get all submissions from the sheet
     * @returns {Promise<Array>} - Array of submissions
     */
    async getAllSubmissions() {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${this.sheetName}!A:D`
            });

            return response.data.values || [];
        } catch (error) {
            console.error('✗ Error retrieving submissions:', error.message);
            throw error;
        }
    }
}

module.exports = new GoogleSheetsService();
