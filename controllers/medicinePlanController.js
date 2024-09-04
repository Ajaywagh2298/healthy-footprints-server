const MedicinePlan = require('../models/MedicinePlan');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createMedicinePlan: async (req, res) => {
        try {
            const uid = uuidv4();
            req.body.uid = uid;
            const medicinePlan = new MedicinePlan(req.body);
            await medicinePlan.save();
            res.status(201).json(medicinePlan);
        } catch (error) {
            res.status(400).json({ message: 'Error creating medicine plan', error });
        }
    },

    getMedicinePlans: async (req, res) => {
        try {
            const medicinePlans = await MedicinePlan.find({ patientUid: req.query.patientUid });
            res.status(200).json(medicinePlans);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching medicine plans', error });
        }
    },

    updateMedicinePlan: async (req, res) => {
        try {
            const medicinePlan = await MedicinePlan.findByIdAndUpdate(req.params.uid, req.body, { new: true });
            res.status(200).json(medicinePlan);
        } catch (error) {
            res.status(400).json({ message: 'Error updating medicine plan', error });
        }
    },

    deleteMedicinePlan: async (req, res) => {
        try {
            await MedicinePlan.findByIdAndDelete(req.params.uid);
            res.status(200).json({ message: 'Medicine plan deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error deleting medicine plan', error });
        }
    },
};
