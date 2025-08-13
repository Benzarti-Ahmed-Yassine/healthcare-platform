const { Client, TopicCreateTransaction, AccountId, PrivateKey, Hbar } = require('@hashgraph/sdk');
require('dotenv').config();

async function createTopics() {
    let client;
    try {
        // Your account ID and private key from environment variables
        const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
        // Remove 0x prefix and use ED25519 format
        const privateKeyString = process.env.MY_PRIVATE_KEY.replace('0x', '');
        const MY_PRIVATE_KEY = PrivateKey.fromStringED25519(privateKeyString);

        // Pre-configured client for test network (testnet)
        client = Client.forTestnet();

        // Set the operator with the account ID and private key
        client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);
        
        // Set default max transaction fee
        client.setDefaultMaxTransactionFee(Hbar.from(1)); // 1 HBAR

        // Create the topic for medical records
        console.log('Creating Medical Record Topic...');
        const txCreateTopic1 = new TopicCreateTransaction()
            .setMaxTransactionFee(Hbar.from(1)); // 1 HBAR
        const txCreateTopicResponse1 = await txCreateTopic1.execute(client);
        const receiptCreateTopicTx1 = await txCreateTopicResponse1.getReceipt(client);
        const medicalRecordTopicId = receiptCreateTopicTx1.topicId.toString();
        console.log(`Medical Record Topic ID: ${medicalRecordTopicId}`);
        console.log(`Hashscan URL: https://hashscan.io/testnet/tx/${txCreateTopicResponse1.transactionId.toString()}`);

        // Create the topic for cold chain
        console.log('Creating Cold Chain Topic...');
        const txCreateTopic2 = new TopicCreateTransaction()
            .setMaxTransactionFee(Hbar.from(1)); // 1 HBAR
        const txCreateTopicResponse2 = await txCreateTopic2.execute(client);
        const receiptCreateTopicTx2 = await txCreateTopicResponse2.getReceipt(client);
        const coldChainTopicId = receiptCreateTopicTx2.topicId.toString();
        console.log(`Cold Chain Topic ID: ${coldChainTopicId}`);
        console.log(`Hashscan URL: https://hashscan.io/testnet/tx/${txCreateTopicResponse2.transactionId.toString()}`);

        // Create the topic for consent
        console.log('Creating Consent Topic...');
        const txCreateTopic3 = new TopicCreateTransaction()
            .setMaxTransactionFee(Hbar.from(1)); // 1 HBAR
        const txCreateTopicResponse3 = await txCreateTopic3.execute(client);
        const receiptCreateTopicTx3 = await txCreateTopicResponse3.getReceipt(client);
        const consentTopicId = receiptCreateTopicTx3.topicId.toString();
        console.log(`Consent Topic ID: ${consentTopicId}`);
        console.log(`Hashscan URL: https://hashscan.io/testnet/tx/${txCreateTopicResponse3.transactionId.toString()}`);

        // Display the results for easy copying
        console.log("\n====== UPDATE YOUR .ENV FILES WITH THESE VALUES ======");
        console.log(`MEDICAL_RECORD_TOPIC_ID=${medicalRecordTopicId}`);
        console.log(`COLD_CHAIN_TOPIC_ID=${coldChainTopicId}`);
        console.log(`CONSENT_TOPIC_ID=${consentTopicId}`);
        console.log("======================================================\n");

    } catch (error) {
        console.error('Error creating topics:', error);
    } finally {
        if (client) client.close();
    }
}

createTopics().catch((error) => console.error("Error:", error));
