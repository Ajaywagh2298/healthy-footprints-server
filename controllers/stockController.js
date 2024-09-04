const Stock = require('../models/Stock');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createStock: async (req, res) => {
        const uid = uuidv4();
        try {
            req.body.uid = uid;
            const stock = new Stock(req.body);
            await stock.save();
            res.status(201).json(stock);
        } catch (error) {
            res.status(400).json({ message: 'Error creating stock', error });
        }
    },

    getStocks: async (req, res) => {
        try {
            const stocks = await Stock.find();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching stocks', error });
        }
    },

    updateStock: async (req, res) => {
        try {
            const stock = await Stock.findByIdAndUpdate(req.params.uid, req.body, { new: true });
            res.status(200).json(stock);
        } catch (error) {
            res.status(400).json({ message: 'Error updating stock', error });
        }
    },

    deleteStock: async (req, res) => {
        try {
            await Stock.findByIdAndDelete(req.params.uid);
            res.status(200).json({ message: 'Stock deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting stock', error });
        }
    },
};
