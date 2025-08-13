const express = require('express');
const router = express.Router();
const client = require('../hederaClient');
const { TopicMessageSubmitTransaction, TopicMessageQuery } = require('@hashgraph/sdk');

router.post('/batch', async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({ 
        success: false, 
        error: 'Hedera client not initialized. Please configure valid Hedera credentials.' 
      });
    }
    
    const { batchId, temperature, humidity } = req.body;
    const topicId = process.env.COLD_CHAIN_TOPIC_ID;
    
    if (!topicId || topicId.includes('your_cold')) {
      return res.status(503).json({ 
        success: false, 
        error: 'Cold chain topic ID not configured.' 
      });
    }
    
    const message = {
      batchId,
      temperature,
      humidity,
      timestamp: new Date().toISOString(),
    };
    const tx = await new TopicMessageSubmitTransaction({
      topicId,
      message: JSON.stringify(message),
    }).execute(client);
    const receipt = await tx.getReceipt(client);
    res.json({ success: true, status: receipt.status.toString() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/batch/:batchId', async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({ 
        success: false, 
        error: 'Hedera client not initialized. Please configure valid Hedera credentials.' 
      });
    }
    
    const { batchId } = req.params;
    const topicId = process.env.COLD_CHAIN_TOPIC_ID;
    
    if (!topicId || topicId.includes('your_cold')) {
      return res.status(503).json({ 
        success: false, 
        error: 'Cold chain topic ID not configured.' 
      });
    }
    
    let batchData = [];
    new TopicMessageQuery()
      .setTopicId(topicId)
      .setStartTime(0)
      .subscribe(client, null, (message) => {
        const data = JSON.parse(message.contents.toString());
        if (data.batchId === batchId) batchData.push(data);
      });
    setTimeout(() => res.json({ success: true, data: batchData }), 1000);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;