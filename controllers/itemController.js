const Items = require('../models/Items');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createItems: async (req, res) => {
        try {
            const uid = uuidv4();
            req.body.uid = uid;
            const items = new Items(req.body);
            await items.save();
            res.status(201).json(items);
        } catch (error) {
            res.status(400).json({ message: 'Error creating Items', error });
        }
    },

    getItems: async (req, res) => {
        try {
            const items = await Items.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching Items', error });
        }
    },

    updateItems: async (req, res) => {
        try {
            const items = await Items.findByIdAndUpdate(req.params.uid, req.body, { new: true });
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ message: 'Error updating Items', error });
        }
    },

    deleteItem: async (req, res) => {
        try {
            await Items.findByIdAndDelete(req.params.uid);
            res.status(200).json({ message: 'Items deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting Items', error });
        }
    },
};
