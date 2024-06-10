const customer = require("../models/customer");
const order = require("../models/order");
const audience = require("../models/audience");

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

exports.buildQuery = (criteria, logic) => {
    const query = criteria.map(criterion => {
        const { field, operator, value } = criterion;
        return { [field]: { [operator]: value } };
    });
    return logic === 'AND' ? { $and: query } : { $or: query };
};

exports.checkAudienceSize = async (req, res) => {
    try {
        const { criteria, logic } = req.body;
        const query = exports.buildQuery(criteria, logic); // Use exports to access buildQuery
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
        const audienceDetails = new audience({ criteria, logic });
        await audienceDetails.save();
        res.json({ message: 'Audience criteria saved successfully' });
    } catch (error) {
        console.error('Error saving audience criteria:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
