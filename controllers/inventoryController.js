const InventoryUseLogs = require('../models/InventoryUseLogs');
const { v4: uuidv4 } = require('uuid');
const Items = require('../models/Items');
const { isValidObjectId } = require('mongoose'); // Ensure isValidObjectId is imported

module.exports = {
    createInventoryUseLog: async (req, res) => {
        const uid = uuidv4();
        try {
            req.body.uid = uid;
            const logBodies = req.body;
            if (logBodies.inventories && Array.isArray(logBodies.inventories)) {
                for(let logBody of logBodies.inventories) {
                    if (!logBody.itemUid) {
                        return res.status(400).json({
                            message: 'Error creating inventory use log',
                            error: 'itemUid is required.'
                        });
                    }
                    const inventoryUseLog = new InventoryUseLogs({
                        uid: uid,
                        itemUid: logBody.itemUid,
                        useDate: logBodies.useDate,
                        useTime: logBodies.useTime,
                        Note: logBody.Note,
                        quantity: Number(logBody.quantity), 
                        staffUid: logBodies.staffUid,
                        availableQuantity : Number(logBody.availableQuantity),
                        totalQuantity : Number(logBody.totalQuantity)
                    });
        
                    await inventoryUseLog.save();
        
                    const item = await Items.findOne({ uid: logBody.itemUid }); 
                    if (item) {
                        item.quantity = (item.quantity || 0) + Number(logBody.quantity); 
                        item.cost = (item.totalCost || 0) - (Number(logBody.quantity) * (item.cost || 0)); 
                        await item.save();
                    }
        

                }
            }
            res.status(201).json({ message: 'Inventory use log created successfully' }); 
        } catch (error) {
            res.status(400).json({ message: 'Error creating inventory use log', error: error.message }); 
        }
    },

    getInventoryUseLogs: async (req, res) => {
        try {
            const logs = await InventoryUseLogs.find();
            res.status(200).json(logs);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching inventory use logs', error: error.message }); // Provide error message
        }
    },

    updateInventoryUseLog: async (req, res) => {
        try {
            const log = await InventoryUseLogs.findByIdAndUpdate(req.params.uid, req.body, { new: true });
            if (!log) {
                return res.status(404).json({ message: 'Inventory use log not found' }); // Handle not found case
            }
            res.status(200).json(log);
        } catch (error) {
            res.status(400).json({ message: 'Error updating inventory use log', error: error.message }); // Provide error message
        }
    },

    deleteInventoryUseLog: async (req, res) => {
        try {
            const log = await InventoryUseLogs.findByIdAndDelete(req.params.uid);
            if (!log) {
                return res.status(404).json({ message: 'Inventory use log not found' }); // Handle not found case
            }
            res.status(200).json({ message: 'Inventory use log deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting inventory use log', error: error.message }); // Provide error message
        }
    },
};
