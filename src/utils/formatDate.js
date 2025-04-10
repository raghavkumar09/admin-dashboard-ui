/**
 * Formats a date string or Date object into a more readable format.
 * @param {string | Date} dateInput The date to format.
 * @param {object} options Intl.DateTimeFormat options (optional).
 * @returns {string} The formatted date string, or 'Invalid Date' if input is invalid.
 */
export const formatDate = (dateInput, options = {}) => {
    if (!dateInput) return 'N/A'; // Handle null or undefined input

    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            // Check if the date object is valid
            return 'Invalid Date';
        }

        // Default options if none are provided
        const defaultOptions = {
            year: 'numeric',
            month: 'short', // e.g., 'Jan', 'Feb'
            day: 'numeric',
            hour: 'numeric', // e.g., '1', '10'
            minute: '2-digit', // e.g., '05', '30'
            // timeZoneName: 'short' // Optional: e.g., 'PST', 'EST'
        };

        const formatOptions = { ...defaultOptions, ...options };

        return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
    } catch (error) {
        console.error("Error formatting date:", dateInput, error);
        return 'Invalid Date';
    }
};

// Example Usage:
// formatDate(user.registrationDate); // -> "Jan 15, 2024, 10:30 AM" (example)
// formatDate(user.dateOfBirth, { year: 'numeric', month: 'long', day: 'numeric' }); // -> "January 15, 1990" (example)
// formatDate(null); // -> "N/A"
// formatDate("invalid-date-string"); // -> "Invalid Date"