const DailyRecord = require('../models/DailyRecord');
const User = require('../models/User');
const Patient = require('../models/Patient')
const { v4: uuidv4 } = require('uuid');

exports.createDailyRecord = async (req, res) => {
    let uid = uuidv4();
    const { patientUid, bp, rp, temperature, oxygen, urine, motion, meal, medicine, recordDate ,staffUid} = req.body;

    try {
        const newDailyRecord = new DailyRecord({ uid, patientUid, bp, rp, temperature, oxygen, urine, motion, meal, medicine, recordDate, staffUid });
        await newDailyRecord.save();
        res.status(201).json({ message: 'Daily record created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating daily record', error });
    }
};

exports.getDailyRecords = async (req, res) => {
    const { patientUid } = req.params;

    try {
        // Fetch all daily records for the patient and populate staffUid and patientUid
        let dailyRecords = await DailyRecord.find({ patientUid }).sort({ createdAt: -1 });

        if (dailyRecords && dailyRecords.length > 0) {
            // Extract all unique staffUids and patientUids from the daily records
            const staffUids = [...new Set(dailyRecords.map(record => record.staffUid))];
            const patientUids = [...new Set(dailyRecords.map(record => record.patientUid))];

            // Fetch all users and patients in a single query
            const users = await User.find({ uid: { $in: staffUids } });
            const patients = await Patient.find({ uid: { $in: patientUids } });

            // Create a lookup object for users and patients
            let userMap = users.reduce((map, user) => {
                map[user.uid] = user.name;
                return map;
            }, {});

            let patientMap = patients.reduce((map, patient) => {
                map[patient.uid] = patient.name;
                return map;
            }, {});

            // Attach userName and patientName to each daily record
            dailyRecords = dailyRecords.map(daily => {
                let dailyObj = daily.toObject();  // Convert Mongoose document to plain object
                dailyObj.userName = userMap[daily.staffUid] || 'Unknown Staff';
                dailyObj.patientName = patientMap[daily.patientUid] || 'Unknown Patient';
                return dailyObj;
            });
        }

        res.status(200).json(dailyRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching daily records', error });
    }
};

exports.updateDailyRecord = async (req, res) => {
    const { uid } = req.params;

    try {
        const dailyRecord = await DailyRecord.findByIdAndUpdate(uid, req.body, { new: true });
        if (!dailyRecord) return res.status(404).json({ message: 'Daily record not found' });
        res.status(200).json({ message: 'Daily record updated successfully', dailyRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error updating daily record', error });
    }
};

exports.deleteDailyRecord = async (req, res) => {
    const { uid } = req.params;

    try {
        const dailyRecord = await DailyRecord.findByIdAndDelete(uid);
        if (!dailyRecord) return res.status(404).json({ message: 'Daily record not found' });
        res.status(200).json({ message: 'Daily record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting daily record', error });
    }
};
