// Configuration
const API_BASE_URL = 'https://she-can-foundation-full-stack.onrender.com';
const CONTACT_ENDPOINT = `${API_BASE_URL}/api/contact`;

// Get form elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

// Get toast elements
const successToastEl = document.getElementById('successToast');
const errorToastEl = document.getElementById('errorToast');
const errorTextEl = document.getElementById('errorText');

// Initialize Bootstrap toasts
const successToast = new bootstrap.Toast(successToastEl, { delay: 4000, autohide: true });
const errorToast = new bootstrap.Toast(errorToastEl, { delay: 5000, autohide: true });

// Validation regex patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[a-zA-Z\s'-]{2,}$/;

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous validation messages
    clearAllValidationMessages();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitSpinner.style.display = 'inline-block';

    try {
        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Send data to backend
        const response = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Handle response
        if (response.ok) {
            // Success
            showSuccessToast();
            contactForm.reset();
            clearAllValidationMessages();
            
            // Scroll to top to see toast
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Server error response
            const errorData = await response.json();
            showErrorToast(errorData.message || 'Failed to submit form. Please try again.');
        }
    } catch (error) {
        // Network or other error
        console.error('Error:', error);
        showErrorToast('Unable to send message. Please check your connection and try again.');
    } finally {
        // Re-enable submit button and hide loading state
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitSpinner.style.display = 'none';
    }
});

/**
 * Validate form inputs
 */
function validateForm() {
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
        showFieldError('name', 'Name is required');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    } else if (!namePattern.test(nameInput.value.trim())) {
        showFieldError('name', 'Name can only contain letters, spaces, hyphens, and apostrophes');
        isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

/**
 * Show field error message
 */
function showFieldError(fieldId, errorMsg) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    const validElement = document.getElementById(fieldId + 'Valid');
    
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    errorElement.textContent = errorMsg;
    errorElement.style.display = 'block';
    validElement.style.display = 'none';
}

/**
 * Show field valid message
 */
function showFieldValid(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    const validElement = document.getElementById(fieldId + 'Valid');
    
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    errorElement.style.display = 'none';
    validElement.style.display = 'block';
}

/**
 * Clear all validation messages
 */
function clearAllValidationMessages() {
    const fields = ['name', 'email', 'message'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        const validElement = document.getElementById(fieldId + 'Valid');
        
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        validElement.style.display = 'none';
    });
}

/**
 * Show success toast notification
 */
function showSuccessToast() {
    successToast.show();
}

/**
 * Show error toast notification
 */
function showErrorToast(msg) {
    errorTextEl.textContent = msg;
    errorToast.show();
}

// ===== REAL-TIME VALIDATION =====

nameInput.addEventListener('blur', () => {
    const value = nameInput.value.trim();
    
    if (!value) {
        showFieldError('name', 'Name is required');
    } else if (value.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
    } else if (!namePattern.test(value)) {
        showFieldError('name', 'Name can only contain letters, spaces, hyphens, and apostrophes');
    } else {
        showFieldValid('name');
    }
});

nameInput.addEventListener('input', () => {
    const value = nameInput.value.trim();
    
    if (value && !namePattern.test(value)) {
        showFieldError('name', 'Name can only contain letters, spaces, hyphens, and apostrophes');
    }
});

emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim();
    
    if (!value) {
        showFieldError('email', 'Email is required');
    } else if (!emailPattern.test(value)) {
        showFieldError('email', 'Please enter a valid email address');
    } else {
        showFieldValid('email');
    }
});

emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();
    
    if (value && !emailPattern.test(value)) {
        showFieldError('email', 'Please enter a valid email address');
    } else if (value && emailPattern.test(value)) {
        showFieldValid('email');
    }
});

messageInput.addEventListener('blur', () => {
    const value = messageInput.value.trim();
    
    if (!value) {
        showFieldError('message', 'Message is required');
    } else if (value.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
    } else {
        showFieldValid('message');
    }
});

messageInput.addEventListener('input', () => {
    const value = messageInput.value.trim();
    
    if (value && value.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
    } else if (value && value.length >= 10) {
        showFieldValid('message');
    }
});

// Initialize form with no errors
clearAllValidationMessages();
