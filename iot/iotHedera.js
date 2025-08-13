const { Client, TopicCreateTransaction, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
  const client = Client.forTestnet();
  client.setOperator(
    process.env.MY_ACCOUNT_ID,
    process.env.MY_PRIVATE_KEY
  );

  let txResponse = await new TopicCreateTransaction().execute(client);
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  console.log(`Topic ID: ${topicId}`);

  const iotData = {
    batchId: "VACCINE_001",
    temperature: 2.5,
    humidity: 60,
    timestamp: new Date().toISOString(),
  };

  let message = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: JSON.stringify(iotData),
  }).execute(client);

  let messageReceipt = await message.getReceipt(client);
  console.log(`Message submitted: ${messageReceipt.status}`);
}

main().catch((error) => console.error("Error:", error));