const DietPlan = require('../models/DietPlan');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createDietPlan: async (req, res) => {
        const uid = uuidv4();
        try {
            req.body.uid = uid;
            const dietPlan = new DietPlan(req.body);
            await dietPlan.save();
            res.status(201).json(dietPlan);
        } catch (error) {
            res.status(400).json({ message: 'Error creating diet plan', error });
        }
    },

    getDietPlans: async (req, res) => {
        try {
            const dietPlans = await DietPlan.find();
            res.status(200).json(dietPlans);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching diet plans', error });
        }
    },

    updateDietPlan: async (req, res) => {
        try {
            const dietPlan = await DietPlan.findByIdAndUpdate(req.params.uid, req.body, { new: true });
            res.status(200).json(dietPlan);
        } catch (error) {
            res.status(400).json({ message: 'Error updating diet plan', error });
        }
    },

    deleteDietPlan: async (req, res) => {
        try {
            await DietPlan.findByIdAndDelete(req.params.uid);
            res.status(200).json({ message: 'Diet plan deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting diet plan', error });
        }
    },
};
