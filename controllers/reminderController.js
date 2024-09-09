const Reminder = require('../models/Reminder');
const { v4: uuidv4 } = require('uuid');

exports.createReminder = async (req, res) => {
    const { patientUid, reminderType, reminderFrequency, reminderTimeStart, reminderTimeEnd, reminderMessage, note, notificationPushType, userUid } = req.body;
    const uid = uuidv4();
    try {
        const newReminder = new Reminder({ uid, patientUid, reminderType, reminderFrequency, reminderTimeStart, reminderTimeEnd, reminderMessage, note, notificationPushType, userUid });
        await newReminder.save();
        res.status(201).json({ message: 'Reminder created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reminder', error });
    }
};

exports.getReminders = async (req, res) => {

    try {
        const reminders = await Reminder.find();
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reminders', error });
    }
};

exports.updateReminder = async (req, res) => {
    const { uid } = req.params;

    try {
        const reminder = await Reminder.findByIdAndUpdate(id, req.body, { new: true });
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
        res.status(200).json({ message: 'Reminder updated successfully', reminder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reminder', error });
    }
};

exports.deleteReminder = async (req, res) => {
    const { uid } = req.params;

    try {
        const reminder = await Reminder.findByIdAndDelete(uid); // Corrected to use uid directly
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
        res.status(200).json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reminder', error });
    }
};
