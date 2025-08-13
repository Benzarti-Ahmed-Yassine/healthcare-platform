const express = require('express');
const router = express.Router();
const client = require('../hederaClient');
const { TopicMessageSubmitTransaction, TopicMessageQuery } = require('@hashgraph/sdk');

router.post('/consent', async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({ 
        success: false, 
        error: 'Hedera client not initialized. Please configure valid Hedera credentials.' 
      });
    }
    
    const { consentId, patientAddress, providerAddress } = req.body;
    const topicId = process.env.CONSENT_TOPIC_ID;
    
    if (!topicId || topicId.includes('your_consent')) {
      return res.status(503).json({ 
        success: false, 
        error: 'Consent topic ID not configured.' 
      });
    }
    
    const message = {
      consentId,
      patientAddress,
      providerAddress,
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

router.get('/consent/:consentId', async (req, res) => {
  try {
    if (!client) {
      return res.status(503).json({ 
        success: false, 
        error: 'Hedera client not initialized. Please configure valid Hedera credentials.' 
      });
    }
    
    const { consentId } = req.params;
    const topicId = process.env.CONSENT_TOPIC_ID;
    
    if (!topicId || topicId.includes('your_consent')) {
      return res.status(503).json({ 
        success: false, 
        error: 'Consent topic ID not configured.' 
      });
    }
    
    let consents = [];
    new TopicMessageQuery()
      .setTopicId(topicId)
      .setStartTime(0)
      .subscribe(client, null, (message) => {
        const data = JSON.parse(message.contents.toString());
        if (data.consentId === consentId) consents.push(data);
      });
    setTimeout(() => res.json({ success: true, data: consents }), 1000);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;