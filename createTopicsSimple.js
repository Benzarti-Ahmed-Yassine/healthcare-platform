const {
    AccountId,
    PrivateKey,
    Client,
    TopicCreateTransaction
} = require("@hashgraph/sdk");

async function main() {
    let client;
    try {
        // Your account ID and private key from .env
        require('dotenv').config();
        const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
        const MY_PRIVATE_KEY = PrivateKey.fromStringED25519(process.env.MY_PRIVATE_KEY.replace('0x', ''));

        // Pre-configured client for test network (testnet)
        client = Client.forTestnet();

        //Set the operator with the account ID and private key
        client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

        console.log('Creating Medical Record Topic...');
        
        //Create the transaction
        const txCreateTopic1 = new TopicCreateTransaction();

        //Sign with the client operator private key and submit the transaction to a Hedera network
        const txCreateTopicResponse1 = await txCreateTopic1.execute(client);

        //Request the receipt of the transaction
        const receiptCreateTopicTx1 = await txCreateTopicResponse1.getReceipt(client);

        //Get the transaction consensus status
        const statusCreateTopicTx1 = receiptCreateTopicTx1.status;

        //Get the Transaction ID
        const txCreateTopicId1 = txCreateTopicResponse1.transactionId.toString();

        //Get the topic ID
        const topicId1 = receiptCreateTopicTx1.topicId.toString();

        console.log("------------------------------ Create Medical Record Topic ------------------------------ ");
        console.log("Receipt status           :", statusCreateTopicTx1.toString());
        console.log("Transaction ID           :", txCreateTopicId1);
        console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txCreateTopicId1);
        console.log("Topic ID                 :", topicId1);

        // Wait a moment before creating the next topic
        console.log('\\nWaiting 3 seconds before creating next topic...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Creating Cold Chain Topic...');
        
        //Create the transaction
        const txCreateTopic2 = new TopicCreateTransaction();

        //Sign with the client operator private key and submit the transaction to a Hedera network
        const txCreateTopicResponse2 = await txCreateTopic2.execute(client);

        //Request the receipt of the transaction
        const receiptCreateTopicTx2 = await txCreateTopicResponse2.getReceipt(client);

        //Get the transaction consensus status
        const statusCreateTopicTx2 = receiptCreateTopicTx2.status;

        //Get the Transaction ID
        const txCreateTopicId2 = txCreateTopicResponse2.transactionId.toString();

        //Get the topic ID
        const topicId2 = receiptCreateTopicTx2.topicId.toString();

        console.log("------------------------------ Create Cold Chain Topic ------------------------------ ");
        console.log("Receipt status           :", statusCreateTopicTx2.toString());
        console.log("Transaction ID           :", txCreateTopicId2);
        console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txCreateTopicId2);
        console.log("Topic ID                 :", topicId2);

        // Wait a moment before creating the last topic
        console.log('\\nWaiting 3 seconds before creating next topic...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Creating Consent Topic...');
        
        //Create the transaction
        const txCreateTopic3 = new TopicCreateTransaction();

        //Sign with the client operator private key and submit the transaction to a Hedera network
        const txCreateTopicResponse3 = await txCreateTopic3.execute(client);

        //Request the receipt of the transaction
        const receiptCreateTopicTx3 = await txCreateTopicResponse3.getReceipt(client);

        //Get the transaction consensus status
        const statusCreateTopicTx3 = receiptCreateTopicTx3.status;

        //Get the Transaction ID
        const txCreateTopicId3 = txCreateTopicResponse3.transactionId.toString();

        //Get the topic ID
        const topicId3 = receiptCreateTopicTx3.topicId.toString();

        console.log("------------------------------ Create Consent Topic ------------------------------ ");
        console.log("Receipt status           :", statusCreateTopicTx3.toString());
        console.log("Transaction ID           :", txCreateTopicId3);
        console.log("Hashscan URL             :", "https://hashscan.io/testnet/tx/" + txCreateTopicId3);
        console.log("Topic ID                 :", topicId3);

        console.log("\\n\\n====== UPDATE YOUR .ENV FILES WITH THESE VALUES ======");
        console.log(`MEDICAL_RECORD_TOPIC_ID=${topicId1}`);
        console.log(`COLD_CHAIN_TOPIC_ID=${topicId2}`);
        console.log(`CONSENT_TOPIC_ID=${topicId3}`);
        console.log("======================================================\\n");

    } catch (error) {
        console.error(error);
    } finally {
        if (client) client.close();
    }
}

main();
