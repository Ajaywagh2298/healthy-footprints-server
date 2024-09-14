const InventoryUseLogs = require('../models/InventoryUseLogs');
const { v4: uuidv4 } = require('uuid');
const Items = require('../models/Items');
const { isValidObjectId } = require('mongoose'); // Ensure isValidObjectId is imported

module.exports = {
    createInventoryUseLog: async (req, res) => {
 
        try {
            // req.body.uid = uid;
            const logBodies = req.body;
            if (logBodies.inventories && Array.isArray(logBodies.inventories)) {
                for(let logBody of logBodies.inventories) {
                    const uid = uuidv4();
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
            let { fromDate, toDate, itemUid } = req.query;
    
            // Ensure valid fromDate and toDate
            if (!fromDate || !toDate) {
                return res.status(400).json({ message: 'Both fromDate and toDate are required' });
            }
    
            // Convert fromDate and toDate to Date objects for MongoDB comparison
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999); // Set to the end of the day for toDate
    
            let filterData = {
                useDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
            if (itemUid) {
                filterData.itemUid = itemUid;
            }
    
            // Fetch logs filtered by useDate within the provided date range
            const logs = await InventoryUseLogs.find(filterData);
    
            // Initialize a date-wise log structure
            let calendarLogs = {};
    
            // Organize logs into the desired date-wise format
            logs.forEach(log => {
                const logDate = log.useDate.toISOString().split('T')[0]; // Format date (YYYY-MM-DD)
    
                // If date entry does not exist, initialize it
                if (!calendarLogs[logDate]) {
                    calendarLogs[logDate] = {
                        date: logDate,
                        useItems: []
                    };
                }
    
                // Check if the item already exists in useItems for the current date
                const existingItem = calendarLogs[logDate].useItems.find(item => item.itemUid === log.itemUid);
    
                if (existingItem) {
                    // If item exists, sum the quantity
                    existingItem.quantity += log.quantity;
                } else {
                    // Add the inventory item to the useItems array for the current date
                    calendarLogs[logDate].useItems.push({
                        itemUid: log.itemUid,
                        quantity: log.quantity
                    });
                }
            });
    
            // Convert the result object into an array sorted by date
            const sortedLogs = Object.values(calendarLogs).sort((a, b) => new Date(b.date) - new Date(a.date));
    
            // Return the response
            res.status(200).json(sortedLogs);
    
        } catch (error) {
            res.status(400).json({ message: 'Error fetching inventory use logs', error: error.message });
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
