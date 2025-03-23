import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Twilio client with credentials from environment variables
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

/**
 * Format phone number to E.164 format
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} - E.164 formatted phone number
 */
const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Check if the number already has a country code (assuming +91 for India)
  if (digitsOnly.startsWith('91') && digitsOnly.length >= 12) {
    return '+' + digitsOnly;
  }

  // Otherwise, add +91 (India) country code if it's a 10-digit number
  if (digitsOnly.length === 10) {
    return '+91' + digitsOnly;
  }

  // If it's neither, just add a + at the beginning
  return '+' + digitsOnly;
};

/**
 * Send SMS using Twilio
 * @param {string} to - Recipient phone number (with or without country code)
 * @param {string} message - SMS message content
 * @returns {Promise} - Promise that resolves with message details or rejects with error
 */
export const sendSMS = async (to, message) => {
  // Format the phone number to E.164 format
  const formattedNumber = formatPhoneNumber(to);

  // Check if Twilio is configured
  if (!twilioClient || !twilioPhoneNumber) {
    console.log('Twilio not configured. Would have sent SMS to:', formattedNumber);
    console.log('Message:', message);

    // In development, we'll just log the message and pretend it was sent
    return {
      success: true,
      sid: 'DEV_MODE',
      to: formattedNumber,
      body: message
    };
  }

  try {
    // Send the SMS
    const result = await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedNumber
    });
    
    console.log(`SMS sent to ${to}, SID: ${result.sid}`);
    return {
      success: true,
      sid: result.sid,
      to: result.to,
      body: result.body
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

export default { sendSMS };