const Stock = require('../models/Stock');
const { v4: uuidv4 } = require('uuid');
const Items = require('../models/Items');
const { isValidObjectId } = require('mongoose'); // Ensure isValidObjectId is imported

module.exports = {
    createStock: async (req, res) => {

        try {
            const stockBody = req.body;

            if (stockBody.stocks && Array.isArray(stockBody.stocks)) {
                for (const st of stockBody.stocks) {
                    const uid = uuidv4();
                    if (!st.itemUid) {
                        return res.status(400).json({
                            message: 'Error creating stock',
                            error: 'stocks validation failed: itemUid: Path `itemUid` is required.'
                        });
                    }
                    const stock = new Stock({
                        uid: uid,
                        batchName: stockBody.batchName,
                        batchDate: stockBody.batchDate,
                        itemUid: st.itemUid,
                        quantity: Number(st.quantity), // Use Number for conversion
                        costPerUnit: Number(st.costPerUnit), // Use Number for conversion
                        totalCost: Number(st.totalCost), // Use Number for conversion
                        type: 'use',
                        expiredDate: st.expiredDate,
                        stockEndDate: stockBody.stockEndDate,
                        staffUid: stockBody.staffUid,
                    });

                    if (!stock.itemUid ) {
                        return res.status(400).json({
                            message: 'Error creating stock',
                            error: `Cast to ObjectId failed for value "${stock.itemUid}" (type string) at path "_id" for model "Items"`
                        });
                    }
                    await stock.save();

                    const item = await Items.findOne({ uid: st.itemUid }); // Use findOne instead of find
                    if (item) {
                        item.totalQuantity = ((item.totalQuantity || 0) - (item.quantity || 0) ) + Number(st.quantity); 
                        item.totalCost = ((item.totalCost || 0) - (item.cost || 0)) + Number(st.totalCost); 
                        item.quantity = 0;
                        item.cost = 0;
                        await item.save();
                    }
                }
            }

            res.status(201).json({ message: 'Stock created successfully' }); // Updated message for clarity
        } catch (error) {
            res.status(400).json({ message: 'Error creating stock', error: error.message }); // Provide error message
        }
    },

    getStocks: async (req, res) => {
        try {
            const stocks = await Stock.find();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching stocks', error: error.message }); // Provide error message
        }
    },

    updateStock: async (req, res) => {
        try {
            const stock = await Stock.findByIdAndUpdate(req.params.uid, req.body, { new: true });
            if (!stock) {
                return res.status(404).json({ message: 'Stock not found' }); // Handle not found case
            }
            res.status(200).json(stock);
        } catch (error) {
            res.status(400).json({ message: 'Error updating stock', error: error.message }); // Provide error message
        }
    },

    deleteStock: async (req, res) => {
        try {
            const stock = await Stock.findByIdAndDelete(req.params.uid);
            if (!stock) {
                return res.status(404).json({ message: 'Stock not found' }); // Handle not found case
            }
            res.status(200).json({ message: 'Stock deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting stock', error: error.message }); // Provide error message
        }
    },
};
