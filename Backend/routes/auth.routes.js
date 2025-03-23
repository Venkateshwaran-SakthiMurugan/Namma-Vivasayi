import express from 'express';
import Account from '../models/accounts.model.js';
import crypto from 'crypto';
import { sendSMS } from '../services/sms.service.js';

const router = express.Router();

// Test route to verify the API is working
router.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.status(200).json({ success: true, message: 'Auth API is working!' });
});

// In-memory storage for verification codes (in production, use a database or Redis)
const verificationCodes = new Map();

// Generate a random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate a session ID
const generateSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Step 1: Initiate phone verification
router.post('/phone/initiate', async (req, res) => {
  console.log('Received phone initiate request:', req.body);
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // Check if the phone number is already registered
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const existingUser = await Account.findOne({ mobilenumber: formattedPhoneNumber });

    // Generate verification code and session ID
    const verificationCode = generateVerificationCode();
    const sessionId = generateSessionId();

    // Store the verification data
    verificationCodes.set(sessionId, {
      phoneNumber: formattedPhoneNumber,
      code: verificationCode,
      createdAt: Date.now()
    });

    // Send the verification code via SMS
    try {
      const message = `Your Namma Vivasayi verification code is: ${verificationCode}`;
      await sendSMS(phoneNumber, message);
      console.log(`Verification code for ${phoneNumber}: ${verificationCode}`);

      res.status(200).json({
        success: true,
        message: 'Verification code sent to phone',
        sessionInfo: sessionId,
        isNewUser: !existingUser
      });
    } catch (smsError) {
      console.error('Error sending SMS:', smsError);

      // Log the verification code so it can be used for testing
      console.log(`IMPORTANT - Use this verification code for testing: ${verificationCode}`);

      // Even if SMS fails, we'll return success to allow testing
      // In production, you might want to handle this differently
      res.status(200).json({
        success: true,
        message: 'Verification process initiated. For testing, check server logs for the code.',
        sessionInfo: sessionId,
        isNewUser: !existingUser,
        devNote: 'SMS sending failed, but verification can continue with code from server logs'
      });
    }
  } catch (error) {
    console.error('Error initiating phone verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send verification code',
      error: error.message
    });
  }
});

// Step 2: Verify the code and sign in or register
router.post('/phone/verify', async (req, res) => {
  console.log('Received verification request:', req.body);
  try {
    const { verificationCode, sessionInfo, username, password } = req.body;

    if (!verificationCode || !sessionInfo) {
      return res.status(400).json({
        success: false,
        message: 'Verification code and session info are required'
      });
    }

    // Get the stored verification data
    const verificationData = verificationCodes.get(sessionInfo);

    if (!verificationData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired session'
      });
    }

    // Check if the code is correct
    if (verificationData.code !== verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    // Check if the code is expired (15 minutes)
    if (Date.now() - verificationData.createdAt > 15 * 60 * 1000) {
      verificationCodes.delete(sessionInfo);
      return res.status(400).json({
        success: false,
        message: 'Verification code expired'
      });
    }

    // Get the phone number from verification data
    const phoneNumber = verificationData.phoneNumber;

    // Check if user exists
    let user = await Account.findOne({ mobilenumber: phoneNumber });

    if (user) {
      // User exists, sign in
      // Clean up verification data
      verificationCodes.delete(sessionInfo);

      return res.status(200).json({
        success: true,
        message: 'Sign in successful',
        data: user
      });
    } else {
      // New user, register
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required for new users'
        });
      }

      // Create new account
      const newAccount = new Account({
        username,
        mobilenumber: phoneNumber,
        password // Note: In a real app, you should hash this password
      });

      await newAccount.save();

      // Clean up verification data
      verificationCodes.delete(sessionInfo);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: newAccount
      });
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify code',
      error: error.message
    });
  }
});

export default router;