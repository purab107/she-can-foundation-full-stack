const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));
app.use(express.json());

// Google Sheets setup
const googleSheetsService = require('./services/googleSheetsService');

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'She Can Foundation Backend API',
        version: '1.0.0',
        status: 'running'
    });
});

// Contact form submission endpoint
app.post('/api/contact', [
    // Validation rules
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
        .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),
    
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
], async (req, res) => {
    try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { name, email, message } = req.body;
        const timestamp = new Date().toISOString();

        // Save to Google Sheets
        try {
            await googleSheetsService.appendRow({
                name,
                email,
                message,
                timestamp
            });
        } catch (error) {
            console.error('Google Sheets error:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Failed to save submission. Please try again later.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Form submitted successfully',
            data: {
                name,
                email,
                timestamp
            }
        });

    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Initialize Google Sheets
    try {
        await googleSheetsService.initializeSheet();
        console.log('✓ Google Sheets initialized');
    } catch (error) {
        console.error('✗ Failed to initialize Google Sheets:', error.message);
    }
});
