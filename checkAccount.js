const { Client, AccountBalanceQuery, AccountId, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

async function checkAccount() {
    let client;
    try {
        // Your account ID and private key from environment variables
        const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
        const privateKeyString = process.env.MY_PRIVATE_KEY.replace('0x', '');
        const MY_PRIVATE_KEY = PrivateKey.fromStringED25519(privateKeyString);

        console.log(`Checking account: ${process.env.MY_ACCOUNT_ID}`);
        console.log(`Private key (first 10 chars): ${privateKeyString.substring(0, 10)}...`);

        // Pre-configured client for test network (testnet)
        client = Client.forTestnet();

        // Set the operator
        client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

        // Check account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(MY_ACCOUNT_ID)
            .execute(client);

        console.log(`\n====== ACCOUNT INFO ======`);
        console.log(`Account ID: ${MY_ACCOUNT_ID}`);
        console.log(`HBAR Balance: ${accountBalance.hbars.toTinybars()} tinybar (${accountBalance.hbars.toString()} HBAR)`);
        console.log(`==========================\n`);

        if (accountBalance.hbars.toTinybars() < 100000000) { // Less than 1 HBAR
            console.log('⚠️  WARNING: Low HBAR balance. You may need more HBAR to create topics.');
            console.log('💡 You can get free testnet HBAR from: https://portal.hedera.com/faucet');
        } else {
            console.log('✅ Account has sufficient HBAR balance for creating topics.');
        }

    } catch (error) {
        console.error('Error checking account:', error.message);
        if (error.message.includes('INVALID_ACCOUNT_ID')) {
            console.log('❌ The account ID appears to be invalid or does not exist.');
        }
        if (error.message.includes('key')) {
            console.log('❌ The private key may not match the account ID.');
        }
    } finally {
        if (client) client.close();
    }
}

checkAccount().catch((error) => console.error("Error:", error));
