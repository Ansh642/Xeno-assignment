const customer = require("../models/customer");
const order = require("../models/order");
const audience = require("../models/audience");
const CommunicationsLog = require("../models/communication");
const Message = require('../models/message');
const axios = require('axios');


exports.insertOrder = async (req, res) => {
    try {
        const { customerId, amount, date } = req.body;

        const customerDetails = await customer.findById(customerId);
        //console.log(customerDetails);

        if (!customerDetails) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Create a new order document
        const newOrder = new order({
            customerId,
            amount,
            date
        });

        // Save the order document to the database
        await newOrder.save();

        // Send a success response
        res.status(201).json({ message: 'Order data ingested successfully', order: newOrder });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to ingest order data', error: error.message });
    }
};

exports.addCustomer = async (req, res) => {
    try {
        const { name, email, totalSpends, visits, lastVisit } = req.body;

        // Create a new customer document
        const newCustomer = new customer({
            name,
            email,
            totalSpends,
            visits,
            lastVisit
        });

        // Save the customer document to the database
        await newCustomer.save();

        // Send a success response
        res.status(201).json({ message: 'Customer data ingested successfully', customer: newCustomer });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Failed to ingest customer data', error: error.message });
    }
};


const buildQuery = (criteria, logic) => {
    const query = criteria.map(criterion => {
      const { field, operator, value } = criterion;
      const condition = {};
      condition[field] = { [`$${operator}`]: value };
      return condition;
    });
    return logic === 'AND' ? { $and: query } : { $or: query };
};
  
exports.checkAudienceSize = async (req, res) => {
    try {
      const { criteria, logic } = req.body;
      const query = buildQuery(criteria, logic);
      const audienceSize = await customer.countDocuments(query);
      res.json({ size: audienceSize });
    } catch (error) {
      console.error('Error checking audience size:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
exports.saveAudienceCriteria = async (req, res) => {
    try {
      const { criteria, logic } = req.body;
      const newLog = new CommunicationsLog({ criteria, logic });
      await newLog.save();
      res.json({ message: 'Audience criteria saved successfully' });
    } catch (error) {
      console.error('Error saving audience criteria:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
exports.getPastCampaigns = async (req, res) => {
try {
    const campaigns = await CommunicationsLog.find().sort({ createdAt: -1 });
    res.json(campaigns);
} catch (error) {
    console.error('Error fetching past campaigns:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};



exports.sendCampaign = async (req, res) => {
    try {
      const { criteria, logic, messageTemplate } = req.body;
      const query = buildQuery(criteria, logic);
      const customers = await customer.find(query);
  
      const messages = customers.map(customer => {
        const content = messageTemplate.replace('[Name]', customer.name);
        return { customerId: customer._id, content };
      });
  
      const createdMessages = await Message.insertMany(messages);
      res.json({ message: 'Campaign sent', data: createdMessages });
    } catch (error) {
      console.error('Error sending campaign:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updateMessageStatus = async (req, res) => {
    try {
      const messages = await Message.find();
      const updatedMessages = await Promise.all(messages.map(async (message) => {
        const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
        message.status = status;
        return message.save();
      }));
  
      res.json({ message: 'Messages status updated', data: updatedMessages });
    } catch (error) {
      console.error('Error updating message status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  