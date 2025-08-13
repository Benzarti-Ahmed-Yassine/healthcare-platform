const { Client, AccountId, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

let client = null;

try {
  const hederaAccountId = process.env.HEDERA_ACCOUNT_ID || process.env.MY_ACCOUNT_ID;
  const hederaPrivateKey = process.env.HEDERA_PRIVATE_KEY || process.env.MY_PRIVATE_KEY;
  
  // Check if we have valid Hedera credentials (not placeholder values)
  if (hederaAccountId && hederaPrivateKey && 
      !hederaAccountId.includes('your_hedera') && 
      !hederaPrivateKey.includes('your_hedera')) {
    
    client = Client.forTestnet();
    client.setOperator(
      AccountId.fromString(hederaAccountId),
      PrivateKey.fromString(hederaPrivateKey)
    );
    
    console.log('Hedera client initialized in hederaClient.js');
  } else {
    console.warn('Hedera client not initialized - please provide valid credentials');
  }
} catch (error) {
  console.error('Failed to initialize Hedera client in hederaClient.js:', error.message);
}

module.exports = client;
