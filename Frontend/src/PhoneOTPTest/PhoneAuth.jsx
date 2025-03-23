import { useState } from 'react';
import axios from 'axios';
import './PhoneAuth.css';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter phone, 2: Enter code, 3: Enter user details (if new)
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      console.log('Sending request to /api/auth/phone/initiate with phone number:', phoneNumber);

      // First, test if the API is reachable
      try {
        const testResponse = await axios.get('/api/auth/test');
        console.log('API test response:', testResponse.data);
      } catch (testErr) {
        console.error('API test failed:', testErr);
      }

      // Send verification code
      const response = await axios.post('/api/auth/phone/initiate', {
        phoneNumber
      });

      console.log('Verification code sent, response:', response.data);
      setSessionInfo(response.data.sessionInfo);
      setIsNewUser(response.data.isNewUser);

      // Check if there's a development note (indicates SMS failed but we can continue)
      if (response.data.devNote) {
        setMessage(`${response.data.message} Please check with the developer for the verification code.`);
      } else {
        setMessage(`Verification code sent to ${phoneNumber}. Please enter the code you received.`);
      }

      setStep(2);
    } catch (err) {
      console.error('Error sending verification code:', err);
      setError(err.response?.data?.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      // If new user and we're at the verification step, we need to collect username and password
      if (isNewUser && !username && !password) {
        setStep(3);
        setIsLoading(false);
        return;
      }

      const payload = {
        verificationCode,
        sessionInfo,
        ...(isNewUser && { username, password })
      };

      const response = await axios.post('/api/auth/phone/verify', payload);
      setMessage(response.data.message);

      // Handle successful authentication (e.g., redirect or store user data)
      console.log('Authentication successful:', response.data);

      // Reset form
      setPhoneNumber('');
      setVerificationCode('');
      setUsername('');
      setPassword('');
      setSessionInfo(null);
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  // Test API connection
  const testApiConnection = async () => {
    setError('');
    setMessage('');
    try {
      const response = await axios.get('/api/test');
      setMessage(`API Test Successful: ${response.data.message}`);
      console.log('API test response:', response.data);
    } catch (err) {
      setError('API Test Failed: ' + (err.message || 'Unknown error'));
      console.error('API test error:', err);
    }
  };

  return (
    <div className="phone-auth-container">
      <h2>Phone Authentication</h2>

      <button
        type="button"
        onClick={testApiConnection}
        className="test-api-btn"
      >
        Test API Connection
      </button>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 1234567890"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <div className="form-group">
            <label htmlFor="verificationCode">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verifying...' : (isNewUser ? 'Continue' : 'Verify & Sign In')}
          </button>
        </form>
      )}

      {step === 3 && isNewUser && (
        <form onSubmit={handleVerifyCode}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneAuth;