const express = require('express');
const router = express.Router();
const client = require('../hederaClient');
const { TopicMessageQuery } = require('@hashgraph/sdk');

router.get('/record/:recordId', async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({ 
        success: false, 
        error: 'Hedera client not initialized. Please configure valid Hedera credentials.' 
      });
    }
    
    const { recordId } = req.params;
    const topicId = process.env.MEDICAL_RECORD_TOPIC_ID;
    
    if (!topicId || topicId.includes('your_medical')) {
      return res.status(503).json({ 
        success: false, 
        error: 'Medical record topic ID not configured.' 
      });
    }
    
    let records = [];
    new TopicMessageQuery()
      .setTopicId(topicId)
      .setStartTime(0)
      .subscribe(client, null, (message) => {
        const data = JSON.parse(message.contents.toString());
        if (data.recordId === recordId) records.push(data);
      });
    setTimeout(() => res.json({ success: true, data: records }), 1000);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;